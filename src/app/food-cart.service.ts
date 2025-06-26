import { Injectable } from '@angular/core';
import { Food } from './food-list/Food';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodCartService {

  private _returnedFood: Food = {} as Food;
  returnedFood: BehaviorSubject<Food> = new BehaviorSubject(this._returnedFood);
  private _cartList: Food[] = [];
  cartList: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);

  constructor() { }


  addToCart(food: Food) {
    let item = this._cartList.find((v1) => v1.name == food.name)
    if(!item){
      this._cartList.push({ ... food });
    } else {
      item.quantity += food.quantity;
    }
    this.cartList.next(this._cartList); //emite evento
  }

  returnToStock(food: Food){
    this.returnedFood.next(food);
  }

}
