import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball.html',
})
export class DragonballPage {

  name = signal<string>('');
  power = signal<number>(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9100 },
    /* { id: 2, name: 'Vegeta', power: 8500 },
    { id: 3, name: 'Piccolo', power: 8000 },
    { id: 4, name: 'Gohan', power: 7000 },
    { id: 5, name: 'Frieza', power: 10000 },
    { id: 6, name: 'Yamcha', power: 500 } */
  ]);

  // powerClasses = computed(() =>{
  //   return {
  //     'text-danger': true
  //   };
  // })

  addCharacter(): void {

    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    };

    this.characters.update((list) => [...list, newCharacter]);
    this.resetFields();
  }

  resetFields(): void {
    this.name.set('');
    this.power.set(0);
  }
}
