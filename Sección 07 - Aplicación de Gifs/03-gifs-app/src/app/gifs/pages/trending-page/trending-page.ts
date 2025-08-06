import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifService } from '../../services/gif.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state';

const imageUrls: string[] = [
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
];

@Component({
  selector: 'gifs-trending-page',
  //imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {
  //gifs = signal<string[]>(imageUrls);
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  //gifs = computed(() => this.GifsService.trendingGifs());
  //gifsLoading = computed(() => this.GifsService.trendingGifsLoading());

  // Referencia local al div de scroll del HTML
  // para detectar el scroll y cargar más GIFs
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  // Ciclo de vida del componente
  // Se ejecuta después de que el contenido del componente ha sido inicializado
  // Aquí se puede usar para inicializar el scroll o cargar datos
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.getScrollPosition();
    //scrollDiv.addEventListener('scroll', this.onScroll.bind(this));
  }

  // Método para hacer scroll infinito
  // Se usa para cargar más GIFs cuando se está por llegar al final del scroll
  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    // Cuanto scroll se ha hecho
    const scrollTop = scrollDiv.scrollTop;

    // Altura del div y altura total del contenido
    const clientHeight = scrollDiv.clientHeight;

    // Altura total del contenido del div
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.saveScrollPosition(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
