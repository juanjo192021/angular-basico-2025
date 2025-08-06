import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Los servicios son preservados en Angular, por lo que no es necesario usar el decorador @Injectable en este caso
// pero es una buena práctica para mantener la consistencia y permitir la inyección de dependencias
export class ScrollStateService {
  private trendingScrollState = signal<number>(0);

  // Método para guardar la posición del scroll
  saveScrollPosition(position: number): void {
    this.trendingScrollState.set(position);
  }

  // Método para obtener la posición del scroll guardada
  getScrollPosition(): number {
    return this.trendingScrollState();
  }

  // Método para resetear la posición del scroll
  resetScrollPosition(): void {
    this.trendingScrollState.set(0);
  }

}
