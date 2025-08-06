import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { isArrayLike } from 'rxjs/internal/util/isArrayLike';

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');

  if( characters ){
    const localStorageObject = JSON.parse(characters);

    // Validar que el objeto tenga la estructura correcta
    if (isArrayLike(localStorageObject)) {

      const newCharacters = Array.from(localStorageObject).filter((item: any) =>
        item &&
        typeof item.id === 'number' &&
        typeof item.name === 'string' &&
        typeof item.power === 'number'
      ) as Character[];

      return newCharacters;
    }
  };

  return [];
};

@Injectable({
  providedIn: 'root'
})
export class DragonballService {
  characters = signal<Character[]>(loadFromLocalStorage());

  /*
   Un efecto es una operación que se ejecuta al menos una vez(similiar al ngOninit)
   pero si usa alguna señal, y esa señal cambia en efecto se vuelve a ejecutar.
   Generalmente se usa para efectos secundarios como guardar en localStorage, hacer peticiones HTTP, etc.
  */
  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  addCharacter(newCharacter: Character): void {
    this.characters.update((list) => [...list, newCharacter]);
  }
}
