import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Horario {
  usuario: string;
  entrada: string;
  salida: string;
}

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
  standalone: true,
  imports: [FormsModule] // Importa FormsModule
})
export class HorarioComponent {
  horarios: Horario[] = []; // Define el tipo de datos

  agregarHorarioForm(horarioForm: any) {
    const horario: Horario = {
      usuario: horarioForm.value.usuario,
      entrada: horarioForm.value.entrada,
      salida: horarioForm.value.salida,
    };
    
    this.agregarHorario(horario);
    horarioForm.reset(); // Opcional: reiniciar el formulario
  }

  agregarHorario(horario: Horario) {
    this.horarios.push(horario);
  }
}
