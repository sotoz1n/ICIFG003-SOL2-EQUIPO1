import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
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

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

  actualizarCantidadDirecta(producto: Producto, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const valorLimpio = inputElement.value.replace(/[^0-9]/g, '');
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

  finalizarCompraReal(): void {
    const payloadPedido = {
      total: this.totalPrecio,
      items: this.carritoAgrupado.map(item => ({
        productoId: item.producto.id,
        nombre: item.producto.nombre,
        cantidad: item.cantidad,
        subtotal: item.subtotal
      }))
    };

    const urlBackend = 'http://localhost:8080/api/carrito';

    this.http.post(urlBackend, payloadPedido).subscribe({
      next: (response: any) => {
        // CORREGIDO: Reemplazo por un modal estético y profesional de SweetAlert2
        Swal.fire({
          title: '¡Compra Procesada!',
          text: 'Tu orden de compra ha sido registrada con éxito.',
          icon: 'success',
          confirmButtonColor: '#2ecc71',
          confirmButtonText: 'Entendido'
        });
        
        this.carritoProductos = [];
        this.mostrarDetalleCarrito = false;
      },
      error: (err) => {
        console.error('Error de comunicación con el backend:', err);
        Swal.fire({
          title: 'Error de Conexión',
          text: 'No se pudo establecer comunicación con el servidor de Spring Boot.',
          icon: 'error',
          confirmButtonColor: '#e74c3c',
          confirmButtonText: 'Reintentar'
        });
      }
    });
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