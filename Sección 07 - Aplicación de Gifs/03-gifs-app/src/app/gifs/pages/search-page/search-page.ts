import { Component, computed, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  gifService = inject(GifService);

  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    if (query.trim().length === 0) {
      this.gifs.set([]);
      return;
    }

    this.gifService.searchGifs(query).subscribe({
      next: (response) => {
        this.gifs.set(response);
      },
      error: (error) => {
        console.error('Error searching GIFs:', error);
        this.gifs.set([]);
      }
    });
  }
}
