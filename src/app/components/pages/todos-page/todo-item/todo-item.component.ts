import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../../common/models/todo.model";
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!:Todo;
  faIcon = faSquareCheck;
  date:Date = new Date();
  constructor() { }

  ngOnInit(): void {
    this.faIcon = this.todo.state?faSquareCheck:faSquare;
    // this.date.setSeconds(this.todo.date.getSeconds());
    // this.date.setMilliseconds(this.todo.date.getMilliseconds());
  }

}
