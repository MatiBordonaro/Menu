import { Component } from '@angular/core';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-menu-about',
  standalone: false,
  templateUrl: './menu-about.component.html',
  styleUrl: './menu-about.component.scss'
})
export class MenuAboutComponent {

  constructor(private filter: FilterService){}

  //para evitar bug de cuando se navega entre info y menú, que se carguen todas nuevamente por el filtro del nav
  setAllFilter(){
    this.filter.setFilter('Todas')
  }
}
