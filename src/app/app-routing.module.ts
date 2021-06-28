import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';
import { MainmenuComponent } from './navigation/mainmenu/mainmenu.component';
import { UserlistComponent } from './navigation/userlist/userlist.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: MainmenuComponent, children: [
    { path: 'users', component: UserlistComponent},
    { path: 'apphome', component: HomeComponent}
  ]},
  
  {path: 'loginserv/:type', loadChildren: () => import('../app/login/login.module').then(mod => mod.LoginModule)}


 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
