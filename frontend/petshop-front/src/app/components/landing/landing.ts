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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ProductoComponent, MenuComponent, MensajeComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent implements OnInit {
  categoriaSeleccionada: string = 'todos';
  terminoBusqueda: string = '';
  ordenSeleccionado: string = 'defecto'; 
  contactoForm: FormGroup;
  formularioEnviadoExitosamente: boolean = false;
  productos: Producto[] = [];

  // ==========================================
  // VARIABLES PARA REQ11 (Manejo de estado del Backend)
  // ==========================================
  mensajeErrorBackend: string | null = null;
  cargando: boolean = true;

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

  // Se conecta al backend de Spring Boot y mapea la respuesta
  // formateando los precios y protegiendo los datos nulos de stock
  cargarProductos(): void {
    this.mensajeErrorBackend = null;
    this.cargando = true;

    this.apiService.obtenerProductos().subscribe({
      next: (data) => {
        // ÉXITO: El backend respondió correctamente
        this.productos = data.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          categoria: item.categoria ? item.categoria.nombreCategoria.toLowerCase() : 'otros',
          precio: item.precio,
          precioFormateated: '$' + item.precio.toLocaleString('es-CL'),
          imagen: item.imagen || 'https://via.placeholder.com/150',
          stock: item.stock || 0
        }));
        this.cargando = false;
      },
      error: (err) => {
        // FRACASO: Backend detenido o error de red
        console.error('Error al conectar con el backend:', err);
        this.mensajeErrorBackend = err.message || 'Error de conexión: El servidor backend no está respondiendo.';
        this.productos = []; // Limpiamos la lista por seguridad
        this.cargando = false;
      }
    });
  }

  get productosFiltrados(): Producto[] {
    let filtrados = this.productos;

    if (this.categoriaSeleccionada !== 'todos') {
      filtrados = filtrados.filter(p => p.categoria === this.categoriaSeleccionada);
    }

    if (this.terminoBusqueda.trim() !== '') {
      const termino = this.terminoBusqueda.toLowerCase();
      filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(termino));
    }

    // 3. NUEVO: Ordenamos según el precio
    if (this.ordenSeleccionado === 'menor') {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (this.ordenSeleccionado === 'mayor') {
      filtrados.sort((a, b) => b.precio - a.precio);
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

  // REQ9: Función modificada para conectar con la base de datos MySQL de Spring Boot
  enviarFormulario(): void {
    if (this.contactoForm.valid) {
      const urlBackend = 'http://localhost:8080/api/contacto/enviar';
      const datosFormulario = this.contactoForm.value;

      // Disparamos el POST directo al puente del Backend
      this.http.post(urlBackend, datosFormulario).subscribe({
        next: (response) => {
          // Si el backend responde bien, activamos el mensaje de éxito en la web
          this.formularioEnviadoExitosamente = true;
          this.contactoForm.reset();
          setTimeout(() => { this.formularioEnviadoExitosamente = false; }, 5000);
        },
        error: (err) => {
          console.error('Error al persistir el contacto en la BD:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo conectar con el servidor para guardar el mensaje.',
          });
        }
      });
    } else {
      this.contactoForm.markAllAsTouched();
    }
  }
}