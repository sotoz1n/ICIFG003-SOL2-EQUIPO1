import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  constructor(public carritoService: CarritoService, private router: Router) {}

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  // Función para hacer scroll suave a cualquier sección
  navegarA(seccion: string) {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        if (seccion === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const elemento = document.getElementById(seccion);
          if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    });
  }
}