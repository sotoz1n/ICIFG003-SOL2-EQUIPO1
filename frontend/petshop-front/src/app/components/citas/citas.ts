import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html'
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
  nuevaCita: any = {
    id: null,
    nombrePaciente: '',
    correo: '',
    tratamiento: '',
    fecha: '',
    hora: '',
    usuario: { id: 1 }
  };

  soloLectura: boolean = false;
  editando: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/mis-citas') {
      this.soloLectura = true;
    }
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.apiService.obtenerCitas().subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error al cargar', err)
    });
  }

  validarCorreo(correo: string): boolean {
    // Expresión regular para obligar a que termine en @gmail.com
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(correo);
  }

  guardar(): void {
    // 1. Validación de correo estricta
    if (!this.validarCorreo(this.nuevaCita.correo)) {
      Swal.fire('Correo Inválido', 'Solo se permiten correos @gmail.com', 'error');
      return;
    }

    // 2. Validación de Fecha y Hora
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaCita = new Date(this.nuevaCita.fecha + 'T00:00:00');
    const horaSeleccionada = parseInt(this.nuevaCita.hora.split(':')[0]);

    if (fechaCita < hoy) {
      Swal.fire('Fecha inválida', 'No puedes agendar en días pasados.', 'error');
      return;
    }
    if (horaSeleccionada < 9 || horaSeleccionada >= 18) {
      Swal.fire('Horario no permitido', 'Atención de 09:00 a 18:00.', 'warning');
      return;
    }

    if (this.editando) {
      // Proceso de Actualización
      this.apiService.actualizarCita(this.nuevaCita.id, this.nuevaCita).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'La cita se modificó correctamente', 'success');
          this.resetearFormulario();
        },
        error: (err) => Swal.fire('Error', 'No se pudo actualizar la cita', 'error')
      });
    } else {
      // Proceso de Creación
      this.apiService.agendarCita(this.nuevaCita).subscribe({
        next: () => {
          Swal.fire('Agendado', 'Cita creada con éxito', 'success');
          this.resetearFormulario();
        },
        error: (err) => {
          const mensaje = typeof err.error === 'string' ? err.error : 'Error al agendar';
          Swal.fire('Atención', mensaje, 'error');
        }
      });
    }
  }

  editar(cita: any): void {
    this.editando = true;
    this.soloLectura = false; 
    this.nuevaCita = { ...cita }; // Clonamos el objeto para el formulario
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Eliminar cita?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
   }).then((result: any) => { 
      if (result.isConfirmed) {
        this.apiService.eliminarCita(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La cita ha sido borrada', 'success');
            this.cargarCitas();
          }
        });
      }
    });
  }

  resetearFormulario(): void {
    this.editando = false;
    this.nuevaCita = { id: null, nombrePaciente: '', correo: '', tratamiento: '', fecha: '', hora: '', usuario: { id: 1 } };
    this.cargarCitas();
  }

  irAMenu(): void {
    this.router.navigate(['/menu']);
  }
}