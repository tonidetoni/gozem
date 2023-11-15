import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {LoginService} from "./login.service";
import {NgxSpinnerModule} from "ngx-spinner";
import {Router, RouterOutlet} from "@angular/router";
import {Login} from "./login";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginModel: Login = {
    email: '',
    password: ''
  }

  constructor(private loginService: LoginService, private router: Router) {}
  onSubmit() {
    this.loginService.login(this.loginModel).subscribe(response => {
      this.loginService.getAuthUser().subscribe(user => {
        if (user.role === 'admin') {
          this.router.navigate(['admin/home'])
        }else if (user.role === 'driver') {
          this.router.navigate([''])
        }else this.router.navigate([])
      })
    })
  }


}
