import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  responseStatus: number;
  isAuthenticated: boolean;

  constructor(
    private userService: UserService,
    private authService: KeycloakService,
    private router: Router) { }

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  
  ngOnInit(): void {
  }

  onSubmit() { 
    this.userService.addUser(this.userForm.value).subscribe(
      response => {
        this.responseStatus = response.status;
      },
      (error: Response) => this.responseStatus = error.status
   )
  }

}