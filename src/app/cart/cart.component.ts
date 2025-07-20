import { Component } from '@angular/core';
import { FoodCartService } from '../food-cart.service';
import { Food } from '../food-list/Food';
import { firstValueFrom, Observable, take } from 'rxjs';
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
  loading = false;

  constructor(private foodCart: FoodCartService, private foodData: FoodDataService){
    this.cartList$ = foodCart.cartList$.asObservable() 
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

  // makePurchase(){
  //   this.cartList$.pipe(take(1)).subscribe(cartFoods => {
  //     let completed = 0; //peticiones completadas
  //     let total = cartFoods.length; //total de peticiones

  //     cartFoods.forEach(item => {
  //       let newStock = item.stock - item.quantity;
  //       this.foodData.updateStock(item.id, newStock).pipe(take(1)).subscribe({
  //         next: updated => { //si la petición es exitosa
  //           console.log('stock de ' + updated.name + ' actualizado de: ' + item.stock + ' a ' + updated.stock);
  //         },
  //         error: err => { //si la petición da error
  //           console.error(err);
  //         },
  //         complete: () => { //si la petición se completa
  //           completed++;
  //           if(completed === total){
  //             //terminaron las peticiones y se puede limpiar el carrito
  //             this.foodCart.clearCart();
  //           }
  //         }
  //       })
  //     })
  //   })
  // }

  //LO REFORMULÉ A ESTA MANERA PORQUE LA DE ARRIBA TENÍA PROBLEMAS DE SINCRONIZACIÓN
  async makePurchase() {
  //obtengo el carrito una sola vez
  //firstValueFrom me transforma el observable a promesa, para así poder tener sincronizado los datos
  const cartFoods = await firstValueFrom(this.cartList$);

  //por cada ítem, espero a que la petición termine (o falle) y se aborte al primer error
  for (const item of cartFoods) {
    const newStock = item.stock - item.quantity;
    try {
      const updated = await firstValueFrom(this.foodData.updateStock(item.id, newStock));
      console.log(`Stock de ${updated.name} actualizado de ${item.stock} a ${updated.stock}`);
    } 
    catch (err) {
      console.error(`Error actualizando stock de ${item.name}:`, err);
      // si hay error, aborto la operación y no vacío el carrito
      return;
    }
  }
  //si todas las peticiones fueron OK, vacío el carrito
  this.foodCart.clearCart();
}

}
