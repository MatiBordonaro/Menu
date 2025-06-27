import { Component, OnInit } from '@angular/core';
import { Food } from './Food';
import { FoodCartService } from '../food-cart.service';
import { FilterService } from '../filter.service';
import { FoodDataService } from '../food-data.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-food-list',
  standalone: false,
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss'
})


export class FoodListComponent {
  foods: Food[] = [];
  filteredFoods: Food[] = [];

  //subscripciones
  private foodsSub!: Subscription;
  private filterSub!: Subscription;
  private returnedFoodSub!: Subscription;



  constructor(
    private foodCart: FoodCartService, 
    private filter: FilterService,
    private foodData: FoodDataService  
  ){}

  ngOnInit(){
    //TRAER COMIDAS
    this.foodsSub = 
      this.foodData.getFoods().subscribe(f => {
        this.foods = f;
        this.applyFilter('Todas')
      //inicializo el filtro en todas, para que se muestren todas por defecto
    });
    //se suscribe al getAll() que trae un observable 
    // y carga f que son las foods de la API en el foods local

    //ESCUCHA SI SE INDICA UN NUEVO FILTRA
    this.filterSub =
      this.filter.type$.subscribe(newFilter => this.applyFilter(newFilter));

    //ESCUCHA SI HAY PARA DEVOLVER UNA FOOD DESDE EL CARRITO
    this.returnedFoodSub = 
      this.foodCart.returnedFood.subscribe(returned => this.updateStock(returned));
  }

  ngOnDestroy(){
    this.foodsSub.unsubscribe();
    this.filterSub.unsubscribe();
    this.returnedFoodSub.unsubscribe();
  }
  
  maxReached(m: string){
    alert(m);
  }

  addToCart(food: Food): void{
    if(food.quantity > 0){
      this.foodCart.addToCart(food);
      food.stock -= food.quantity
      food.quantity = 0;
    } else {
      alert('para pedir debe seleccionar al menos 1');
    }
  }

  applyFilter(type: string){
    if(type === 'Todas'){
      this.filteredFoods = this.foods;
    } else {
      this.filteredFoods =  this.foods.filter(food => food.type === type);
    }
      //filter en amarillo es una función propia de js, crea un array con los 
      //elementos que cumplan la condicion. Cada food dentro de filter es un elemento de foods
  }

  updateStock(returnedFood: Food){
    const matchFood = this.filteredFoods.find(f => f.name === returnedFood.name);
    if(matchFood){ //&& returnedFood.quantity no lo hago porque ya se maneja en inputInteger
      matchFood.stock++;
      this.foodCart.clearReturnedFood();
      // returnedFood.quantity--;
      //no resto de quantity porque ya lo hace el botón
    }
  }



}

    // {
    //   name: "Hamburguesa",
    //   type: "Comida",
    //   price: 12,
    //   stock: 3,
    //   image: "img/hambur.jpg",
    //   quantity: 0
    // },
    // {
    //   name: "Pancho",
    //   type: "Comida",
    //   price: 8,
    //   stock: 10,
    //   image: "img/pancho.jpg",
    //   quantity: 0
    // },
    // {
    //   name: "Papas fritas",
    //   type: "Comida",
    //   price: 6,
    //   stock: 50,
    //   image: "img/papas.jpeg",
    //   quantity: 0
    // },
    // {
    //   name: "Helado de chocolate",
    //   type: "Postre",
    //   price: 5,
    //   stock: 0,
    //   image: "img/helado.jpeg",
    //   quantity: 0
    // },
    // {
    //   name: "Coca-Cola",
    //   type: "Bebida",
    //   price: 3,
    //   stock: 120,
    //   image: "img/coca.webp",
    //   quantity: 0
    // }
