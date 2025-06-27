import { Component } from '@angular/core';
import { FoodCartService } from '../food-cart.service';
import { Food } from '../food-list/Food';
import { Observable, take } from 'rxjs';
import { FoodDataService } from '../food-data.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartList$: Observable<Food[]> = new Observable<Food[]>;
  hasFoods: boolean = false;
  purchaseTotal: number = 0;

  constructor(private foodCart: FoodCartService, private foodData: FoodDataService){
    this.cartList$ = foodCart.cartList.asObservable()
  }

  ngOnInit(){
    this.cartList$.subscribe(list => this.hasFoods = list.length > 0);
  }

  returnToStock(food: Food){
    this.foodCart.returnToStock(food);
  }

  calculateTotal(): number {
    return this.foodCart.calculateTotal();
  }

}
