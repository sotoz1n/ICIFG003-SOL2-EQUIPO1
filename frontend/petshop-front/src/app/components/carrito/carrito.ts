import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CarritoService } from '../../services/carrito';
import { MenuComponent } from '../menu/menu'; 

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

  // Calcula cuánto cuesta el envío
  get costoDespacho(): number {
    if (this.carritoService.cantidadTotal === 0) return 0;
    return this.carritoService.precioTotal >= 15000 ? 0 : 3000;
  }

  // Calcula el total definitivo a cobrar en la tarjeta
  get totalFinal(): number {
    return this.carritoService.precioTotal + this.costoDespacho;
  }

  // NUEVO: Calcula cuánto dinero falta para llegar a la meta de los 15.000
  get faltaParaEnvioGratis(): number {
    const diferencia = 15000 - this.carritoService.precioTotal;
    return diferencia > 0 ? diferencia : 0;
  }

  incrementar(producto: any) {
    const itemEnCarrito = this.carritoService.getCarritoAgrupado().find((item: any) => item.producto.id === producto.id);
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    if (cantidadActual >= producto.stock) {
      Swal.fire({
        icon: 'warning',
        title: '¡Límite de stock!',
        text: `Solo nos quedan ${producto.stock} unidades de ${producto.nombre}.`,
        confirmButtonColor: '#f39c12'
      });
      return; 
    }

    this.carritoService.agregar(producto);
  }

  decrementar(id: number) {
    this.carritoService.decrementar(id);
  }

  actualizarCantidad(producto: any, event: any) {
    const inputElement = event.target as HTMLInputElement;
    let valor = parseInt(inputElement.value.replace(/[^0-9]/g, ''), 10);
    
    if (valor > producto.stock) {
      Swal.fire({
        icon: 'warning',
        title: 'Stock insuficiente',
        text: `Solo puedes llevar hasta ${producto.stock} unidades.`,
        confirmButtonColor: '#f39c12'
      });
      valor = producto.stock; 
      inputElement.value = valor.toString(); 
    }

    if (!isNaN(valor) && valor > 0) {
      this.carritoService.actualizarCantidadExacta(producto, valor);
    } else {
      inputElement.value = '1';
      this.carritoService.actualizarCantidadExacta(producto, 1);
    }
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "El producto será eliminado de tu carrito de compras.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c', 
      cancelButtonColor: '#95a5a6',  
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.eliminarGrupo(id);
        
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Producto eliminado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  seguirComprando() {
    this.router.navigate(['/']);
  }

  finalizarCompra() {
    if (this.carritoService.cantidadTotal === 0) return;

    const totalFormateado = '$' + this.totalFinal.toLocaleString('es-CL');
    
    let mensajeEnvio = this.costoDespacho === 0 
      ? '¡Felicidades! Tienes envío GRATIS. 🎉' 
      : `Se ha sumado un costo de envío de $${this.costoDespacho.toLocaleString('es-CL')}.`;

    Swal.fire({
      title: '¿Confirmar compra?',
      text: `${mensajeEnvio} Estás a punto de pagar un total definitivo de ${totalFormateado}. ¿Deseas proceder?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2ecc71',
      cancelButtonColor: '#e74c3c',
      confirmButtonText: 'Sí, pagar ahora',
      cancelButtonText: 'Revisar carrito'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire({
          title: 'Procesando pago...',
          text: 'Por favor, no cierres esta ventana.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const payloadPedido = {
          total: this.totalFinal, 
          items: this.carritoService.getCarritoAgrupado().map(item => ({
            productoId: item.producto.id,
            nombre: item.producto.nombre,
            cantidad: item.cantidad,
            subtotal: item.subtotal
          }))
        };

        this.http.post('http://localhost:8080/api/carrito', payloadPedido).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Compra Exitosa!',
              text: 'Tu pedido ha sido registrado correctamente.',
              icon: 'success',
              confirmButtonColor: '#2ecc71',
              confirmButtonText: 'Genial'
            }).then(() => {
              this.carritoService.vaciarCarrito();
              this.router.navigate(['/']);
            });
          },
          error: (err) => {
            console.error('Error de comunicación:', err);
            Swal.fire('Error de Conexión', 'No se pudo contactar al servidor. Inténtalo más tarde.', 'error');
          }
        });
      }
    });
  }
}