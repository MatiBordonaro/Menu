import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuFoodsComponent } from './menu-foods/menu-foods.component';
import { MenuAboutComponent } from './menu-about/menu-about.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'menu',
    component: MenuFoodsComponent
  }, 
  {
    path: 'about',
    component: MenuAboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
