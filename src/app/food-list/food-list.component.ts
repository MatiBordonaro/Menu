import { Component } from '@angular/core';
import { Food } from './Food';
import { FoodCartService } from '../food-cart.service';

@Component({
  selector: 'app-food-list',
  standalone: false,
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss'
})
export class FoodListComponent {
  foods: Food[] = [ 
    {
      name: "Hamburguesa",
      type: "Plato principal",
      price: 12,
      stock: 0,
      image: "img/hambur.jpg",
      quantity: 0
    },
    {
      name: "Pancho",
      type: "Plato principal",
      price: 8,
      stock: 10,
      image: "img/pancho.jpg",
      quantity: 0
    },
    {
      name: "Papas fritas",
      type: "Entrada",
      price: 6,
      stock: 50,
      image: "img/papas.jpeg",
      quantity: 0
    },
    {
      name: "Helado de chocolate",
      type: "Postre",
      price: 5,
      stock: 40,
      image: "img/helado.jpeg",
      quantity: 0
    },
    {
      name: "Coca-Cola",
      type: "Bebida",
      price: 3,
      stock: 120,
      image: "img/coca.webp",
      quantity: 0
    }
  ];


  constructor(private foodCart: FoodCartService){}
  
  maxReached(m: string){
    alert(m);
  }

  addToCart(food: Food): void{
    this.foodCart.addToCart(food);
    food.stock -= food.quantity
    food.quantity = 0;
  }
}
