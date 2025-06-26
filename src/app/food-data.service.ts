import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Food } from './food-list/Food';

const URL = 'https://685c504d769de2bf085c62a6.mockapi.io/menu/foods';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Food[]>{
    return this.http.get<Food[]>(URL)
            .pipe(tap( (foods: Food[]) => foods.forEach(food => food.quantity = 0) )
            )
  }
}
