import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts-service/alerts.service';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  userId: string;
  user: any;

  constructor(
    private alertsService: AlertsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      approved: [false]
    });
    this.userId = this.route.snapshot.paramMap.get('id');
    const data = { ref: this.userId };
    this.userService.getUser(data).subscribe(user => {
      this.user = user.data;
      this.updateUserForm = this.formBuilder.group({
        id: [user.ref['@ref'].id],
        username: [this.user?.username || '', Validators.required],
        email: [this.user?.email || '', [Validators.required, Validators.email]],
        password: [this.user?.password || '', Validators.required],
        approved: [this.user?.approved]
      });
    });
  }

  updateUser(): void {
    if (this.updateUserForm.invalid) {
      return;
    }
    const username = this.updateUserForm.value.username;
    const email = this.updateUserForm.value.email;
    const password = this.updateUserForm.value.password;
    const approved = this.updateUserForm.value.approved;
    const ref = this.updateUserForm.value.id;

    this.userService.updateUser({ approved, username, email, password, ref }).subscribe(
      response => {
        this.alertsService.showMessage('User updated', response);
        // Handle success response
        this.router.navigate(['/users']);
      },
      error => {
        this.alertsService.showError('Update User Error:', error);
        // Handle error response
      }
    );
  }
}
