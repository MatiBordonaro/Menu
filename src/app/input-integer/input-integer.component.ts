import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-integer',
  standalone: false,
  templateUrl: './input-integer.component.html',
  styleUrl: './input-integer.component.scss'
})
export class InputIntegerComponent {
  constructor() {}

  //para mostrar o no mostrar los botones o el input de la botonera
  //por defecto se muestran todos
  @Input()
  showInput: boolean = true;
  @Input()
  showBtnAdd: boolean = true;
  @Input()
  showBtnSubtract: boolean = true;

  @Output()
  decreased: EventEmitter<number> = new EventEmitter<number>();

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
      this.decreased.emit(); //especificamente para eliminar del carrito
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
    // console.log((event.target as HTMLInputElement).value)
    const value = (event.target as HTMLInputElement).value
    if(Number(value) > this.max){
      this.quantity = 0;
      alert('el máximo de este producto es de ' + this.max);
    } else if (Number(value) < 0) {
      this.quantity = 0;
      alert('no puede comprar comida negativa!!');
    } else {
      this.quantityChange.emit(this.quantity);
    }
  }
  
}
