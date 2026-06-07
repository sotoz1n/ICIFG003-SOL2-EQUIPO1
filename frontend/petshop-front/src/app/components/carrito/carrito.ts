import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CarritoService } from '../../services/carrito';
import { MenuComponent } from '../menu/menu'; // Reutilizamos el menú

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MenuComponent],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent {

  constructor(
    public carritoService: CarritoService,
    private http: HttpClient,
    private router: Router
  ) {}

  incrementar(producto: any) {
    this.carritoService.agregar(producto);
  }

  decrementar(id: number) {
    this.carritoService.decrementar(id);
  }

  actualizarCantidad(producto: any, event: any) {
    const inputElement = event.target as HTMLInputElement;
    const valor = parseInt(inputElement.value.replace(/[^0-9]/g, ''), 10);
    
    if (!isNaN(valor) && valor > 0) {
      this.carritoService.actualizarCantidadExacta(producto, valor);
    } else {
      inputElement.value = '1';
      this.carritoService.actualizarCantidadExacta(producto, 1);
    }
  }

  eliminar(id: number) {
    this.carritoService.eliminarGrupo(id);
  }

  seguirComprando() {
    this.router.navigate(['/']);
  }

  finalizarCompra() {
    if (this.carritoService.cantidadTotal === 0) return;

    const payloadPedido = {
      total: this.carritoService.precioTotal,
      items: this.carritoService.getCarritoAgrupado().map(item => ({
        productoId: item.producto.id,
        nombre: item.producto.nombre,
        cantidad: item.cantidad,
        subtotal: item.subtotal
      }))
    };

    // Petición al backend
    this.http.post('http://localhost:8080/api/carrito', payloadPedido).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Compra Exitosa!',
          text: 'Tu pedido ha sido registrado correctamente en la base de datos.',
          icon: 'success',
          confirmButtonColor: '#2ecc71',
          confirmButtonText: 'Genial'
        }).then(() => {
          this.carritoService.vaciarCarrito();
          this.router.navigate(['/']); // Devuelve al usuario a la tienda
        });
      },
      error: (err) => {
        console.error('Error de comunicación:', err);
        Swal.fire('Error de Conexión', 'No se pudo contactar al servidor Spring Boot.', 'error');
      }
    });
  }
}