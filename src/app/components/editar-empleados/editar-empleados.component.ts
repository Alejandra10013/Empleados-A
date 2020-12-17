import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-editar-empleados',
  templateUrl: './editar-empleados.component.html',
  styleUrls: ['./editar-empleados.component.css']
})

export class EditarEmpleadosComponent implements OnInit {

  editarEmpleados: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Editar empleado';

  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.editarEmpleados = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.eEditar()
  }
  agregarEditarEmpleado() {
    this.submitted = true;

    if (this.editarEmpleados.invalid) {
      return;
    }
    if (this.id === null) {
      this.editarEmpleados
    } else {
      this.editarEmpleado(this.id);
    }
  }

  editarEmpleado(id: string) {
    const empleado: any = {
      nombre: this.editarEmpleados.value.nombre,
      apellido: this.editarEmpleados.value.apellido,
      documento: this.editarEmpleados.value.documento,
      salario: this.editarEmpleados.value.salario,
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('Empleado modificado con exito', '', { 
        positionClass: 'toast-bottom-right' 
      })
      this.router.navigate(['/list-empleados']);
    })
  }

  eEditar() {
    this.titulo = 'Editar empleado'
    if (this.id !== null) {
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.editarEmpleados.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario']
        })
      })
    }
  }
}