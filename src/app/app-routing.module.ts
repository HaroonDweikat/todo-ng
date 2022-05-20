import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInPageComponent} from "./components/pages/sign-in-page/sign-in-page.component";
import {SignUpPageComponent} from "./components/pages/sign-up-page/sign-up-page.component";
import {PageNotFoundComponent} from "./components/pages/page-not-found/page-not-found.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {TodosListComponent} from "./components/pages/todos-page/todos-list/todos-list.component";
import {TodoDetailComponent} from "./components/pages/todos-page/todo-detail/todo-detail.component";
import {TodoNewComponent} from "./components/pages/todos-page/todo-new/todo-new.component";
import {TodoResolverService} from "./components/common/services/todo-resolver.service";
import {TodoStartComponent} from "./components/pages/todos-page/todo-start/todo-start.component";
import {AuthGuard} from "./components/common/guards/auth-guard.service";
import {CanDeactivateGuard} from "./components/common/guards/can-deactivate-guard.service";


const routes: Routes = [
  {path:'',redirectTo:'/sign-in',pathMatch:'full'},
  {path:'sign-in',component:SignInPageComponent},
  {path:'sign-up',component:SignUpPageComponent},
  {
    path:'home',
    component:HomePageComponent,
    canActivateChild:[AuthGuard]
    ,children:[
      {path:'',component:TodoStartComponent},
      {path:'new',component:TodoNewComponent,canDeactivate:[CanDeactivateGuard]},
      {path:':id',component:TodoDetailComponent,resolve:[TodoResolverService],canDeactivate:[CanDeactivateGuard]},

    ]},
  {path:'**',component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
