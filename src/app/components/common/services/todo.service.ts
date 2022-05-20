import {Injectable} from "@angular/core";
import {Todo} from "../models/todo.model";
import {Subject} from "rxjs";

@Injectable()
export class TodoService {
  todosChanged = new Subject<Todo[]>();
  private todos: Todo[] = [
  ];


  setTodos(todos: Todo[]) {
    this.todos = todos;
    this.notifySubscriptions()
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: number) {
    const todo = this.todos.filter(todo=>todo.id == id)[0];
    const index = this.todos.indexOf(todo);
    return this.todos[index];
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.notifySubscriptions()
  }

  updateTodo(todo: Todo) {
    this.todos[todo.id] = todo;
    this.notifySubscriptions()
  }

  deleteTodo(id: number) {
    this.todos.splice(id, 1);
    this.notifySubscriptions()
  }

  notifySubscriptions() {
    this.todosChanged.next(this.todos)
  }
}
