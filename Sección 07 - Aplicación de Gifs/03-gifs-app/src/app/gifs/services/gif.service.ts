import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '[]';

  if (!gifsFromLocalStorage) return {};

  return JSON.parse(gifsFromLocalStorage);
};

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  private trendingGifsPage = signal<number>(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups: Gif[][] = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      // Agrupa los GIFs en grupos de 3
      // Esto permite que se muestren en filas de 3 elementos
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  })

  // Historial de búsqueda
  // Se usa un objeto para almacenar los resultados de búsqueda por consulta
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  // LLaves del historial de búsqueda
  // Se usa computed para obtener las llaves del objeto de historial
  // Esto permite que se actualice automáticamente cuando el historial cambia
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    // Estamos guardando un objeto
    localStorage.setItem('gifs', historyString);
  });

  // Método para cargar los GIFs populares al iniciar el servicio
  loadTrendingGifs(): void {

    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    // Logic to load trending GIFs
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: '20',
          offset: (this.trendingGifsPage() * 20).toString(),
        },
      })
      .subscribe({
        next: (response) => {
          const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
          // Añadimos los nuevos GIFs a la lista existente
          this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
          // Incrementamos la página para la próxima carga
          this.trendingGifsPage.update(page => page + 1);
          this.trendingGifsLoading.set(false);
        },
        error: (error) => {
          this.trendingGifs.set([]);
          this.trendingGifsLoading.set(false);
          console.error('Error loading trending GIFs:', error);
        },
      });
  }

  // Método para buscar GIFs por consulta
  searchGifs(query: string): Observable<Gif[]> {
    this.trendingGifsLoading.set(true);
    return (
      this.http
        .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
          params: {
            api_key: environment.giphyApiKey,
            q: query,
            limit: '20',
          },
        })
        // Permite encadenar más operadores RxJS si es necesario
        .pipe(
          // El map permite transformar la respuesta antes de que se emita
          map(({ data }) => data),
          map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
          tap((items) => {
            this.searchHistory.update((history) => ({
              ...history,
              [query.toLowerCase()]: items,
            }));
          })
          //TODO: Historial de búsquedas
        )
    );
  }

  // Método para obtener los GIFs del historial de búsqueda por consulta
  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLowerCase()] || [];
  }
}
