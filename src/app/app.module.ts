
import {SignInPageComponent} from './components/pages/sign-in-page/sign-in-page.component';
import {SignUpPageComponent} from './components/pages/sign-up-page/sign-up-page.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {TodosListComponent} from './components/pages/todos-page/todos-list/todos-list.component';
import {TodoItemComponent} from './components/pages/todos-page/todo-item/todo-item.component';
import {TodoDetailComponent} from './components/pages/todos-page/todo-detail/todo-detail.component';
import {AuthService} from "./components/common/services/auth.service";
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';
import {TodoNewComponent} from './components/pages/todos-page/todo-new/todo-new.component';
import {TodoResolverService} from "./components/common/services/todo-resolver.service";
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { TodoStartComponent } from './components/pages/todos-page/todo-start/todo-start.component';
import {TodoService} from "./components/common/services/todo.service";


import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataStorageService} from "./components/common/services/data-storage.service";
import {AuthGuard} from "./components/common/guards/auth-guard.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CanDeactivateGuard} from "./components/common/guards/can-deactivate-guard.service";




@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    SignUpPageComponent,
    HomePageComponent,
    TodosListComponent,
    TodoItemComponent,
    TodoDetailComponent,
    PageNotFoundComponent,
    TodoNewComponent,
    NavbarComponent,
    TodoStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgbModule,

  ],
  providers: [
    AuthService,
    TodoResolverService,
    TodoService,
    DataStorageService,
    AuthGuard,
    CanDeactivateGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
