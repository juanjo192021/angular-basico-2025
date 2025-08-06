import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "../../components/side-menu/side-menu";

// Los componentes standalone: true nuestros componentes son modulos por si mismos, no necesitan de un modulo para ser importados
// Por lo tanto, no necesitamos importar el modulo de RouterModule
@Component({
  selector: 'gifs-dashboard-page',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage {

}
