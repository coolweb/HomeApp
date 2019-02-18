import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  {
    path: '.', component: SettingsComponent
  },
  {
    path: 'settings', loadChildren: '../settings/settings.module#SettingsModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
