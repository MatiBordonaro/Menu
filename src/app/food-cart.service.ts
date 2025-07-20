import { Injectable } from '@angular/core';
import { Food } from './food-list/Food';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodCartService {

  private _returnedFood: Food = {} as Food;
  returnedFood: BehaviorSubject<Food> = new BehaviorSubject(this._returnedFood);
  private _cartList: Food[] = [];
  cartList$: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);

  constructor() { }


  addToCart(food: Food) {
    let item = this._cartList.find((v1) => v1.name == food.name)
    if(!item){
      this._cartList.push({ ... food });
    } else {
      item.quantity += food.quantity;
    }
    this.cartList$.next(this._cartList); //emite evento
  }

  returnToStock(food: Food){
    this.returnedFood.next(food)
    if(food.quantity == 0){ //si la cantidad del producto a devolver llegó a 0
      //filtro y lleno el carrito nuevamente con los que NO SEAN la comida a devolver, es decir la borro del carrito
      this._cartList = this._cartList.filter(f => f.name !== food.name);
      this.cartList$.next(this._cartList);
    };
  }

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

  getCurrentCart(): Food[]{
    //lo devuelvo pero como arreglo
    return [ ... this._cartList];
  }

  clearCart(){
    this._cartList = [];
    this.cartList$.next([]);
  }
}
