import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api';
import { ProductoComponent } from '../producto/producto';
import { MenuComponent } from '../menu/menu';
import { CarritoService } from '../../services/carrito'; 
import { MensajeComponent } from '../mensaje/mensaje'; 

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  precioFormateated: string;
  imagen: string;
  stock: number;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  // AQUÍ AGREGAMOS MensajeComponent AL FINAL DE LA LISTA
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ProductoComponent, MenuComponent, MensajeComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent implements OnInit {
  categoriaSeleccionada: string = 'todos';
  terminoBusqueda: string = '';
  contactoForm: FormGroup;
  formularioEnviadoExitosamente: boolean = false;
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private apiService: ApiService,
    private carritoService: CarritoService
  ) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.apiService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          categoria: item.categoria ? item.categoria.nombreCategoria.toLowerCase() : 'otros',
          precio: item.precio,
          precioFormateated: '$' + item.precio.toLocaleString('es-CL'),
          imagen: item.imagen || 'https://via.placeholder.com/150',
          stock: item.stock || 0
        }));
      },
      error: (err) => {
        console.error('Error al conectar con el backend:', err);
      }
    });
  }

  get productosFiltrados(): Producto[] {
    let filtrados = this.productos;

    // 1. Primero filtramos por la categoría elegida
    if (this.categoriaSeleccionada !== 'todos') {
      filtrados = filtrados.filter(p => p.categoria === this.categoriaSeleccionada);
    }

    // 2. Luego filtramos por lo que el usuario está escribiendo
    if (this.terminoBusqueda.trim() !== '') {
      const termino = this.terminoBusqueda.toLowerCase();
      filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(termino));
    }

    return filtrados;
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto);
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: '¡Agregado al carrito!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  enviarFormulario(): void {
    if (this.contactoForm.valid) {
      this.formularioEnviadoExitosamente = true;
      this.contactoForm.reset();
      setTimeout(() => { this.formularioEnviadoExitosamente = false; }, 5000);
    } else {
      this.contactoForm.markAllAsTouched();
    }
  }
}