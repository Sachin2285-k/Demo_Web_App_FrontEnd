import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUser: User = new User();

  constructor(private loginSerice: LoginService, private router: Router) {}

  register() {
    this.loginSerice.register(this.newUser).subscribe(
      (data: User) => {
        console.log(data);
        alert("User registered successfully!!")
        this.router.navigateByUrl('/login');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
