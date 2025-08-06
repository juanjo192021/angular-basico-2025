import { Component, computed, inject, signal } from '@angular/core';
import { CharacterList } from "../../components/dragonball/character-list/character-list";
import { Character } from '../../interfaces/character.interface';
import { CharacterAdd } from "../../components/dragonball/character-add/character-add";
import { DragonballService } from '../../services/dragonball.service';

@Component({
  templateUrl: './dragonball-super.html',
  imports: [CharacterList, CharacterAdd],
})
export class DragonballSuperPage {

  // De la manera tradicional
  //constructor(private dragonballService: DragonballService) {}

  public dragonballService = inject(DragonballService);

  characters = computed(() => this.dragonballService.characters());

  addCharacter(newCharacter: Character): void {
    if (!newCharacter.name || !newCharacter.power || newCharacter.power <= 0) {
      return;
    }

    this.dragonballService.addCharacter(newCharacter);
  }
}
