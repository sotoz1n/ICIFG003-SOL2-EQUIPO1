import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alerta" [ngClass]="tipo">
      <span class="icono">{{ tipo === 'success' ? '✅' : '❌' }}</span>
      {{ texto }}
    </div>
  `,
  styles: [`
    .alerta {
      padding: 15px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
      animation: fadeIn 0.5s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .icono { font-size: 1.2rem; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class MensajeComponent {
  // @Input permite recibir estos datos desde afuera (ej: desde el landing)
  @Input() tipo: 'success' | 'error' = 'success';
  @Input() texto: string = '';
}