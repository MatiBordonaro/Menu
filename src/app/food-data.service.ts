import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Food } from './food-list/Food';

const URL = 'https://685c504d769de2bf085c62a6.mockapi.io/menu/foods';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {

  private _foods: Food[] = [];
  private foods$ = new BehaviorSubject<Food[]>([]);

  constructor(private http: HttpClient) { }

  public loadAll(): void {
    if(this._foods.length === 0){
      this.http.get<Food[]>(URL)
          .pipe(
            tap(foods => foods.forEach(food => food.quantity = 0))
          ).subscribe(f => {
            this._foods = f;
            this.foods$.next(this._foods);
          })
    }
  }

  public getFoods(): Observable<Food[]>{
    this.loadAll();
    return this.foods$.asObservable();
  }
}
