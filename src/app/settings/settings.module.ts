import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { PersonsComponent } from './persons/persons.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexModule} from '@angular/flex-layout';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { ReactiveFormsModule, } from '@angular/forms';

@NgModule({
  declarations: [PersonsComponent, EditPersonComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule
  ]
})
export class SettingsModule { }
