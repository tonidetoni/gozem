import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gozem-app';

  constructor(public loginService: LoginService) {}
  ngOnInit(): void {
    this.loginService.getAuthUser().subscribe(user => this.loginService.authenticatedUser = user)
    // console.log(environment.production);
  }

  logout(): void {
    this.loginService.logout().subscribe(() => {
      console.log('logout')
    })
  }
}
