import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  precioFormateated: string;
  imagen: string;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {
  categoriaSeleccionada: string = 'todos';
  
  carritoProductos: Producto[] = [];
  mostrarDetalleCarrito: boolean = false;
  
  contactoForm: FormGroup;
  formularioEnviadoExitosamente: boolean = false;

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Alimento Premium',
      categoria: 'perros',
      precio: 18990,
      precioFormateated: '$18.990',
      imagen: 'https://purina.cl/sites/default/files/2026-03/6619b101707389517644bc146067c0206f8883e0.webp'
    },
    {
      id: 2,
      nombre: 'Correa Retráctil',
      categoria: 'accesorios',
      precio: 12990,
      precioFormateated: '$12.990',
      imagen: 'https://www.clubdeperrosygatos.cl/wp-content/uploads/2024/08/neon.webp'
    },
    {
      id: 3,
      nombre: 'Rascador Interactivo',
      categoria: 'gatos',
      precio: 24990,
      precioFormateated: '$24.990',
      imagen: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  get cantidadCarrito(): number {
    return this.carritoProductos.length;
  }

  get totalPrecio(): number {
    return this.carritoProductos.reduce((acumulado, p) => acumulado + p.precio, 0);
  }

  get productosFiltrados(): Producto[] {
    if (this.categoriaSeleccionada === 'todos') {
      return this.productos;
    }
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  get carritoAgrupado(): ItemCarrito[] {
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

  trackByProductoId(index: number, item: ItemCarrito): number {
    return item.producto.id;
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoProductos.push(producto);
  }

  incrementarCantidad(producto: Producto): void {
    this.carritoProductos.push(producto);
  }

  decrementarCantidad(productoId: number): void {
    const index = this.carritoProductos.findIndex(p => p.id === productoId);
    if (index !== -1) {
      this.carritoProductos.splice(index, 1);
    }
    if (this.carritoProductos.length === 0) {
      this.mostrarDetalleCarrito = false;
    }
  }

  // RF04 Sanitizado: Elimina cualquier letra o carácter no numérico de forma inmediata
  actualizarCantidadDirecta(producto: Producto, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    
    // Aplicamos una expresión regular para remover todo lo que NO sea un número del 0 al 9
    const valorLimpio = inputElement.value.replace(/[^0-9]/g, '');
    
    // Seteamos el valor limpio directamente en el elemento visual
    inputElement.value = valorLimpio;

    if (valorLimpio === '') {
      return;
    }

    let nuevaCantidad = parseInt(valorLimpio, 10);

    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
      nuevaCantidad = 1;
      inputElement.value = '1';
    }

    this.carritoProductos = this.carritoProductos.filter(p => p.id !== producto.id);

    for (let i = 0; i < nuevaCantidad; i++) {
      this.carritoProductos.push(producto);
    }
  }

  eliminarGrupoDelCarrito(productoId: number): void {
    this.carritoProductos = this.carritoProductos.filter(p => p.id !== productoId);
    if (this.carritoProductos.length === 0) {
      this.mostrarDetalleCarrito = false;
    }
  }

  toggleCarrito(): void {
    if (this.carritoProductos.length > 0) {
      this.mostrarDetalleCarrito = !this.mostrarDetalleCarrito;
    }
  }

  simularCompra(): void {
    alert('¡Compra realizada con éxito! Su pedido está siendo procesado en el Frontend.');
    this.carritoProductos = [];
    this.mostrarDetalleCarrito = false;
  }

  enviarFormulario(): void {
    if (this.contactoForm.valid) {
      console.log('Formulario válido. Datos enviados:', this.contactoForm.value);
      this.formularioEnviadoExitosamente = true;
      this.contactoForm.reset();
      
      setTimeout(() => {
        this.formularioEnviadoExitosamente = false;
      }, 5000);
    } else {
      this.contactoForm.markAllAsTouched();
    }
  }
}