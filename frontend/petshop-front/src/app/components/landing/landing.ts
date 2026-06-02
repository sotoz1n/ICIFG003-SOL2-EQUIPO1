import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  precioFormateado: string;
  imagen: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {
  categoriaSeleccionada: string = 'todos';
  cantidadCarrito: number = 0;
  totalPrecio: number = 0;

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Alimento Premium',
      categoria: 'perros',
      precio: 18990,
      precioFormateado: '$18.990',
      imagen: 'https://purina.cl/sites/default/files/2026-03/6619b101707389517644bc146067c0206f8883e0.webp'
    },
    {
      id: 2,
      nombre: 'Correa Retráctil',
      categoria: 'accesorios',
      precio: 12990,
      precioFormateado: '$12.990',
      imagen: 'https://www.clubdeperrosygatos.cl/wp-content/uploads/2024/08/neon.webp'
    },
    {
      id: 3,
      nombre: 'Rascador para Gatos',
      categoria: 'gatos',
      precio: 24990,
      precioFormateado: '$24.990',
      imagen: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500'
    }
  ];

  get productosFiltrados(): Producto[] {
    if (this.categoriaSeleccionada === 'todos') {
      return this.productos;
    }
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  agregarAlCarrito(precio: number): void {
    this.cantidadCarrito++;
    this.totalPrecio += precio;
  }
}