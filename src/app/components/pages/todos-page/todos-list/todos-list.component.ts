import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../../../common/models/todo.model";
import {TodoService} from "../../../common/services/todo.service";
import {DataStorageService} from "../../../common/services/data-storage.service";
import {ActivatedRoute,  Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit,OnDestroy {
  todos:Todo[]=[];
  loading:boolean = false;
  subscription!:Subscription;
  constructor(
    private todoService:TodoService,
    private dataStorageService:DataStorageService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    // this.dataStorageService.storeTodos();
    this.loading = true;
   this.subscription= this.dataStorageService.fetchTodos().subscribe((resData) => {
      this.todos = resData;
      this.todoService.setTodos(resData);
      this.loading = false;
    });
  }

  newTodo() {
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
