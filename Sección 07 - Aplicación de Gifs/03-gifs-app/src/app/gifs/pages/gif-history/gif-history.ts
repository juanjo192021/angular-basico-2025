import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gif.service';
import { GifList } from "../../components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
})
export default class GifHistory {
  //query = inject(ActivatedRoute).snapshot.paramMap.get('query');
  /* query = inject(ActivatedRoute).params.subscribe((params) => {
    console.log('Query parameter:', params['query']);
  }); */

  gifService = inject(GifService);

  // SE injecta el servicio de ActivatedRoute
  // y se usa toSignal para convertir el observable en una señal
  // SE usa map para extraer el parámetro 'query'
  // el params es un observable que emite un objeto con los parámetros de la ruta
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
