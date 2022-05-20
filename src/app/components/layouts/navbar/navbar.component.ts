import { Component, OnInit } from '@angular/core';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../common/services/auth.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  squareCheck = faSquareCheck;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
