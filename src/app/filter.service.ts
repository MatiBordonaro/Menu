import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _type = new BehaviorSubject<string>('Todas');
  public type$: Observable<string> = this._type.asObservable();

  setFilter(t: string){
    this._type.next(t);
  }
}
