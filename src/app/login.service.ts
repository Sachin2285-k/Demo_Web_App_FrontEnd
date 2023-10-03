import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import EmployeeQueries from './graphql/graphql.queries';
import { User } from './user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserName: any = '';
  isLogged: boolean = sessionStorage.getItem('currentUser') !== null;

  constructor(private apollo: Apollo, private router: Router, private employeeService: EmployeeService, private jwtHelper: JwtHelperService) {}

  login(userInput: User): Observable<any> {

    return this.apollo
      .query({
        query: EmployeeQueries.getAuthenticated,
        variables: {
          input: userInput,
        },
      })
      .pipe(
        map((result: any) => {
          if (result) {
            const token = result.data.authenticated.token;
            console.log('token', token);
            sessionStorage.setItem('currentUser', token);
            this.isLogged = true;
          }
        })
      );
  }

  logout(){
    sessionStorage.removeItem("currentUser");
    this.router.navigateByUrl("/login") 
    this.isLogged = false;
  }

  isAuthenticated(): boolean {
    try {
      const token = sessionStorage.getItem("currentUser");
  
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false; 
    }
  }  
}
