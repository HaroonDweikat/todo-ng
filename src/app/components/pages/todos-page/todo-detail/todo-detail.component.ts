import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../../common/services/todo.service";
import {Todo} from "../../../common/models/todo.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {DataStorageService} from "../../../common/services/data-storage.service";
import {CanComponentDeactivate} from "../../../common/guards/can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit,CanComponentDeactivate {
  todo!:Todo;
  editMode = false;
  loading = false;
  editForm!: FormGroup;
  id!:number;
  constructor(
    private dataStorageService:DataStorageService,
    private todoService:TodoService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.todo = this.todoService.getTodo(this.id);
      console.log(this.router);
      this.editForm = new FormGroup({
        content: new FormControl(this.todo.content,Validators.required),
        state:new FormControl(this.todo.state?'completed':'unCompleted',Validators.required)
      });
      this.editForm.disable();
      console.log(this.todo)
    })
  }

  onDeleteTodo() {
    if (  confirm('Do You want to Delete the Todo!')){
      this.dataStorageService.deleteTodo(this.todo);
      this.editForm.disable();
      this.router.navigate(['../'],{relativeTo:this.route});
    }

  }

  onEditTodo() {
    this.editMode=true;
    this.editForm.enable();
  }


  saveChanges() {
    console.log(this.editForm.value);
    let content = this.editForm.value.content;
    let state = this.editForm.value.state ==='completed'?true:false
    console.log(content);
    console.log(state);
    if(this.todo.state == state && this.todo.content == content){
      return;
    }
    this.todo.state =state;
    this.todo.content = content;
    this.loading = true;
    this.dataStorageService.updateTodo(this.todo).then( resData => {
      this.todoService.updateTodo(this.todo);
      this.editForm.disable();
      this.editMode=false;
      this.loading = false;
    });

    // console.log(editForm.value)

  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let content = this.editForm.value.content;
    let state = this.editForm.value.state ==='completed'?true:false

    if(this.todo.state == state && this.todo.content == content){
      return true;
    }
    return confirm('Do You want to discard the changes! ');
  }
}
