import { Component } from '@angular/core';
import { UserService } from './user.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Distributed Shopping';
  isAuthenticated: boolean;
  isCollapsed = true;


  constructor(public authService: KeycloakService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isLoggedIn();
  }

}
