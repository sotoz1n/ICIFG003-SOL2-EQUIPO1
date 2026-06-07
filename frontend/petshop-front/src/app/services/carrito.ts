import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  precioFormateated: string;
  imagen: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoProductos: Producto[] = [];

  constructor() { }

  get cantidadTotal(): number {
    return this.carritoProductos.length;
  }

  get precioTotal(): number {
    return this.carritoProductos.reduce((acumulado, p) => acumulado + p.precio, 0);
  }

  agregar(producto: Producto): void {
    this.carritoProductos.push(producto);
  }

  decrementar(productoId: number): void {
    const index = this.carritoProductos.findIndex(p => p.id === productoId);
    if (index !== -1) {
      this.carritoProductos.splice(index, 1);
    }
  }

  actualizarCantidadExacta(producto: Producto, cantidad: number): void {
    this.carritoProductos = this.carritoProductos.filter(p => p.id !== producto.id);
    for (let i = 0; i < cantidad; i++) {
      this.carritoProductos.push(producto);
    }
  }

  eliminarGrupo(productoId: number): void {
    this.carritoProductos = this.carritoProductos.filter(p => p.id !== productoId);
  }

  vaciarCarrito(): void {
    this.carritoProductos = [];
  }

  getCarritoAgrupado(): ItemCarrito[] {
    const grupos: { [key: number]: ItemCarrito } = {};

    this.carritoProductos.forEach(producto => {
      if (grupos[producto.id]) {
        grupos[producto.id].cantidad++;
        grupos[producto.id].subtotal += producto.precio;
      } else {
        grupos[producto.id] = {
          producto: producto,
          cantidad: 1,
          subtotal: producto.precio
        };
      }
    });

    return Object.values(grupos);
  }
}