import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductoComponent {
  // @Input() permite recibir los datos del producto desde el componente padre (landing)
  @Input() data: any;

  // @Output() permite enviar una señal hacia arriba cuando se hace clic en el botón
  @Output() agregar = new EventEmitter<any>();

  onAgregarClick() {
    this.agregar.emit(this.data);
  }
}