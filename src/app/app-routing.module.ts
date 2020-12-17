import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { EditarEmpleadosComponent } from './components/editar-empleados/editar-empleados.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-Empleados', pathMatch: 'full' },
  { path: 'list-Empleados', component: ListEmpleadosComponent },
  { path: 'create-Empleado', component: CreateEmpleadosComponent },
  { path: 'editEmpleado/:id', component: EditarEmpleadosComponent },
  { path: '**', redirectTo: 'list-Empleados', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }