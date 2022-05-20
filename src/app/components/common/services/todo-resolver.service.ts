import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Todo} from "../models/todo.model";
import {TodoService} from "./todo.service";
import {DataStorageService} from "./data-storage.service";
import {Observable} from "rxjs";

@Injectable()
export class TodoResolverService implements Resolve<Todo[]> {
  constructor(private todoService: TodoService, private dataStorageService: DataStorageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Todo[]> | Promise<Todo[]> | Todo[] {
    const todos = this.todoService.getTodos();
    if (todos.length > 0) {
      return todos;
    }
    return this.dataStorageService.fetchTodos();

  }
}
