import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsComponent } from './persons/persons.component';
import { EditPersonComponent } from './edit-person/edit-person.component';

const routes: Routes = [
  {
    path: '', component: PersonsComponent
  },
  {
    path: 'editPerson', component: EditPersonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
