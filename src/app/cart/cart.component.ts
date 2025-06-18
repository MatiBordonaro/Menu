import { Component } from '@angular/core';
import { FoodCartService } from '../food-cart.service';
import { Food } from '../food-list/Food';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartList$: Observable<Food[]>;

  constructor(private foodCart: FoodCartService){
    this.cartList$ = foodCart.cartList.asObservable();
  }

}
