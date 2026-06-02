import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html'
})
export class MenuComponent implements OnInit {
  nombreUsuario: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('usuarioLogeado');
  }

  irAAgendar() {
    this.router.navigate(['/agendar-cita']);
  }

  irAMisCitas() {
    this.router.navigate(['/mis-citas']);
  }

  irAConfiguracion() {
    this.router.navigate(['/configuracion']);
  }
}