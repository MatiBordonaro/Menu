import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodListComponent } from './food-list/food-list.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { MenuAboutComponent } from './menu-about/menu-about.component';
import { MenuFoodsComponent } from './menu-foods/menu-foods.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    CartComponent,
    MenuAboutComponent,
    MenuFoodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
