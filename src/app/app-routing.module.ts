import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CounterComponent } from './counter/counter.component';

const routes: Routes = [
  {
    path:'test',
    component:TestComponent
  },
  {
    path:'counter',
    component:CounterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
