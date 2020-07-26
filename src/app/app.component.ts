import { Component } from '@angular/core';
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


  constructor(private keycloakService: KeycloakService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.keycloakService.getKeycloakInstance().authenticated;
  }

  public login() {
    this.keycloakService.login();
  }
  public logout() {
    this.keycloakService.logout();
  }

}
