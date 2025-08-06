import { Component, computed, signal } from "@angular/core";
import { UpperCasePipe } from "@angular/common";

@Component({
  templateUrl: './hero-page.html',
  imports: [ UpperCasePipe],
})
export class HeroPage {

  // Las señales son una forma de manejar el estado reactivo en Angular
  // Se pueden usar para almacenar valores que cambian con el tiempo
  name= signal('Ironman');
  age = signal(45);

  // La señal computed permite crear una señal que depende de otras señales
  // Se actualiza automáticamente cuando las señales de las que depende cambian
  // Computed solo es de lectura, no se puede modificar directamente
  // Se usa para crear valores derivados de otras señales
  heroDescription = computed(() =>{
    const description = `${this.name()} - ${this.age()}`;
    return description;
  })

  capitalizedName = computed(() => this.name().toUpperCase())

  changeHero = ():void => {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm = ():void => {
    this.name.set('Ironman');
    this.age.set(45);
  }

  changeAge = ():void => {
    this.age.set(60);
  }
}
