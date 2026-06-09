import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  precioFormateated: string;
  imagen: string;
  stock: number; // <-- ¡No olvides esta línea para que coincida con tu componente!
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

  constructor() { 
    // 1. EL RESUCITADOR: Apenas arranca Angular, busca en la memoria del navegador
    const carritoGuardado = localStorage.getItem('carritoPetShop');
    if (carritoGuardado) {
      this.carritoProductos = JSON.parse(carritoGuardado);
    }
  }

  // 2. EL MOTOR DE GUARDADO: Convierte el carrito a texto y lo guarda silenciosamente
  private sincronizarStorage(): void {
    localStorage.setItem('carritoPetShop', JSON.stringify(this.carritoProductos));
  }

  get cantidadTotal(): number {
    return this.carritoProductos.length;
  }

  get precioTotal(): number {
    return this.carritoProductos.reduce((acumulado, p) => acumulado + p.precio, 0);
  }

  // 3. ACTIVAR EL GUARDADO EN CADA ACCIÓN
  agregar(producto: Producto): void {
    this.carritoProductos.push(producto);
    this.sincronizarStorage(); // <-- ¡Guardado!
  }

  decrementar(productoId: number): void {
    const index = this.carritoProductos.findIndex(p => p.id === productoId);
    if (index !== -1) {
      this.carritoProductos.splice(index, 1);
      this.sincronizarStorage(); // <-- ¡Guardado!
    }
  }

  actualizarCantidadExacta(producto: Producto, cantidad: number): void {
    this.carritoProductos = this.carritoProductos.filter(p => p.id !== producto.id);
    for (let i = 0; i < cantidad; i++) {
      this.carritoProductos.push(producto);
    }
    this.sincronizarStorage(); // <-- ¡Guardado!
  }

  eliminarGrupo(productoId: number): void {
    this.carritoProductos = this.carritoProductos.filter(p => p.id !== productoId);
    this.sincronizarStorage(); // <-- ¡Guardado!
  }

  vaciarCarrito(): void {
    this.carritoProductos = [];
    this.sincronizarStorage(); // <-- ¡Guardado (borra lo que había)!
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