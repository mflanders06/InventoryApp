import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PartsComponent } from './pages/parts/parts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'parts', component: PartsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
