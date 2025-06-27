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
    this.returnedFood.next(food)
    if(food.quantity == 0){
      this._cartList = this._cartList.filter(f => f.name !== food.name);
      this.cartList.next(this._cartList);
    };
  }

  //para cuando se navega hacia otro componente, el valor viejo de returnedFood 
  // queda guardado y se devuelve al stock cada vez que
  clearReturnedFood(){
    this.returnedFood.next({} as Food);
  }

  calculateTotal(): number {
    let total = 0;
    for(let i=0; i < this._cartList.length; i++){
      let f = this._cartList[i];
      total += f.price * f.quantity;
    }
    return total;
  }
}
