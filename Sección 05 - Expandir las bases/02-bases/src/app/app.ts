import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/shared/navbar/navbar";

@Component({
  selector: 'app-root',
  //Aquí se importan los componentes que se van a usar en la plantilla
  //En este caso, el RouterOutlet y el Navbar
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
})
export class App {
  protected title = 'bases';
}
