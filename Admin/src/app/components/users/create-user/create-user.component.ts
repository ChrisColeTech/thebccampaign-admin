import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts-service/alerts.service';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(private alertsService: AlertsService, private formBuilder: FormBuilder, private userService: UserService,
    private router: Router) { }

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
      this.alertsService.showMessage('User created, Approval Pending', response);
      // Handle success response
      this.router.navigate(['/users']);
    }, error => {
      this.alertsService.showError('Create User Error:', error);
      // Handle error response
    });
  }
}
