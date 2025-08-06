import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter-page.html',
  styles: `
    button {
      padding: 5px;
      margin: 5px 10px;
      width: 75px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPage {
  counter:number = 10;
  //Signal para el contador
  counterSignal = signal(10);

  increaseBy(value: number) {
    this.counter += value;
    //Para actualizar el valor de la señal .update()
    this.counterSignal.update(current => current + value);
  }

  resetCounter = (): void => {
    this.counter = 0;
    //Para establecer el valor inicial de la señal .set()
    this.counterSignal.set(0);
  }
}
