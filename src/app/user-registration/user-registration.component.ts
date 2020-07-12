import { Component, OnInit } from '@angular/core';

import { User } from "../user";
import { UserService } from '../user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: User
  
  ngOnInit(): void {
  }

  onSubmit() {this.userService.addUser(this.user)}

  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value;
  }

}