import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-integer',
  standalone: false,
  templateUrl: './input-integer.component.html',
  styleUrl: './input-integer.component.scss'
})
export class InputIntegerComponent {
  constructor() {}

  @Input()
  quantity: number = 0;

  @Output()
  quantityChange: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  max: number = 0;

  @Output()
  maxReached: EventEmitter<string> = new EventEmitter<string>();



  downQuantity(): void {
    if(this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit(this.quantity)
    }

  }

  upQuantity(): void {
    if(this.quantity < this.max) {
        this.quantity++;
        this.quantityChange.emit(this.quantity)
    } else {
        this.maxReached.emit('Se alcanzó el max');
    }
  }

  onChangeQuantity(event: Event): void {
    console.log(event)
    this.quantityChange.emit(this.quantity);
  }
  
}
