import { Component } from '@angular/core';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-menu-foods',
  standalone: false,
  templateUrl: './menu-foods.component.html',
  styleUrl: './menu-foods.component.scss'
})
export class MenuFoodsComponent {
  //estos dos son para detalles de los botones del nav, no para lógica para filtrar
  typeSelected = 'Todas'; 
  navSelected = false;
  constructor(private filter: FilterService){}

  setFilter(type: string){
    if(type === this.typeSelected){
      this.typeSelected = 'Todas' //si tocó el mismo, que se muestren todas otra vez
    } else {
      this.typeSelected = type; //si no es el mismo, tocó uno diferente y se debe guardar
    }
    this.filter.setFilter(this.typeSelected); //filtra por el tipo guardado
  }
}
