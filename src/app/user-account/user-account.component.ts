import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { KeycloakService } from 'keycloak-angular';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  user$:Observable<User>;
  httpHeaderWithToken: HttpHeaders;
  isAuthenticated: boolean;

  
  constructor(private userService: UserService, private authService: KeycloakService) { }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isLoggedIn();
    console.log("Inicializando user account");
    await this.getAccessToken2Header();
    this.getUser();
  }

  getAccessToken2Header(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.authService.addTokenToHeader()
        .toPromise().then(
          httpHeaders => {
            console.log(httpHeaders);
            this.httpHeaderWithToken = httpHeaders;
            resolve();
          }, msg => {
            reject(msg);
          }
      );
    });
    return promise;
  }

  
  getUser() : void {
     this.user$ = this.userService.getUser(this.httpHeaderWithToken);
  }
  

}
