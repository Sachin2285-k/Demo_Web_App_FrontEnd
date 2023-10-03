import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();
  loginErrorMsg: string = "";

  constructor(private loginServive: LoginService, private router: Router) {}

  login() {
    this.loginServive.login(this.user).subscribe(
      (data) => {
        this.router.navigateByUrl('/employee');
      },
      (error) => {
        console.log(error);
        this.loginErrorMsg= error.errors[0].message;
      }
    );
  }
}
