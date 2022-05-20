import { Component, OnInit } from '@angular/core';
import {DataStorageService} from "../../../common/services/data-storage.service";
import {TodoService} from "../../../common/services/todo.service";
import {Todo} from "../../../common/models/todo.model";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CanComponentDeactivate} from "../../../common/guards/can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.css']
})
export class TodoNewComponent implements OnInit,CanComponentDeactivate {
  waiting:boolean=false;
  content:string = '';
  constructor(
    private dataStorageService:DataStorageService,
    private todoService:TodoService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }



  onSubmit(form:NgForm) {
    const content = form.value.content;
    if (content == '') return;
    this.waiting =true;
    const todo = new Todo(this.todoService.getTodos().length,content,false,new Date());
    this.dataStorageService.addTodo(todo).then(resData=>{
      console.log(resData);
      this.todoService.addTodo(todo);
      this.waiting = false;
      form.reset();
      this.content = '';
    });

  }

  cancel() {
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.content == '') return true;
    return confirm('Do You want to discard the changes! ');
  }

  updateContent(value: string) {
    this.content = value;
  }
}
