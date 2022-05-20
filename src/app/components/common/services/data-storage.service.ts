import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TodoService} from "./todo.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/user.model";
import {Todo} from "../models/todo.model";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private todoService: TodoService,
    private fbs: AngularFirestore,
    private authService: AuthService
  ) {
  }

  storeTodos() {
    let todos = this.todoService.getTodos();
    let todosObject = todos.map((todo) => Object.assign({}, todo));
    // this.fbs.collection(`${this.authService.user.localId}`).doc('todos').set((todosObject));
    for (let todo of todosObject) {
      // this.fbs.collection('Users').doc(`${this.authService.user.getValue()?.id}`).collection('todosList').add(todo);
      // this.fbs.doc(`${this.authService.user.localId}/todos/${todo.id}/`).set(todo);
      this.fbs.collection('Users').doc(`${this.authService.user.getValue()?.id}`).collection<Todo>('todosList').doc(`${todo.id}`).set(Object.assign({}, todo));
    }
  }

  fetchTodos() {
    return this.fbs.collection('Users')
      .doc(`${this.authService.user.getValue()?.id}`).collection<Todo>('todosList', ref => ref.orderBy('state').orderBy('date', 'desc')).valueChanges();
  }

  addTodo(todo: Todo) {
    return this.fbs.collection('Users').doc(`${this.authService.user.getValue()?.id}`).collection<Todo>('todosList').doc(`${todo.id}`).set(Object.assign({}, todo));
  }

  updateTodo(todo: Todo) {
    return this.fbs.collection('Users').doc(`${this.authService.user.getValue()?.id}`).collection<Todo>('todosList').doc(`${todo.id}`).update(Object.assign({}, todo))

  }

  deleteTodo(todo:Todo){
    return this.fbs.collection('Users').doc(`${this.authService.user.getValue()?.id}`).collection<Todo>('todosList').doc(`${todo.id}`).delete()
  }


}
