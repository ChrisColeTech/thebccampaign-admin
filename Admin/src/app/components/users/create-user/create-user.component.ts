import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  createUser(): void {
    if (this.createUserForm.invalid) {
      return;
    }

    const username = this.createUserForm.value.username;
    const email = this.createUserForm.value.email;
    const password = this.createUserForm.value.password;

    this.userService.createUser({ username, email, password }).subscribe(response => {
      console.log('Create User Response:', response);
      // Handle success response
    }, error => {
      console.log('Create User Error:', error);
      // Handle error response
    });
  }
}
