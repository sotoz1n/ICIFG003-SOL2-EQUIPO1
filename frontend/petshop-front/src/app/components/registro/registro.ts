import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  usuario = { username: '', password: '' };
  esLogin = true;

  constructor(private apiService: ApiService, private router: Router) {}

  cambiarModo() {
    this.esLogin = !this.esLogin;
  }

  onEnviar() {
    if (this.esLogin) {
      this.apiService.loginUsuario(this.usuario).subscribe({
        next: (res) => {
          localStorage.setItem('usuarioLogeado', res.username);
          
          if (res.rol) {
            localStorage.setItem('rol', res.rol); 
          }

          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Hola, ' + res.username,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/menu']).then(() => {
              window.location.reload(); 
            });
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Reintentar'
          });
        }
      });
    } else {
      this.apiService.registrarUsuario(this.usuario).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Usuario registrado con éxito. Ahora puedes logearte.',
            icon: 'success',
            confirmButtonText: 'Ir al Login'
          }).then(() => {
            this.esLogin = true;
            this.usuario.password = '';
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            title: 'Error de Conexión',
            text: 'No se pudo conectar con el servidor. Revisa si Spring Boot está corriendo.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }
}