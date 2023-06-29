import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  userId: string;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUser(this.userId);

    this.updateUserForm = this.formBuilder.group({
      id: [this.user?.ref['@ref'].id, Validators.required],
      username: [this.user?.username, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: [this.user?.password, Validators.required],
      approved: [this.user?.approved, Validators.required]
    });
  }

  updateUser(): void {
    if (this.updateUserForm.invalid) {
      return;
    }

    const id = this.updateUserForm.value.id;
    const username = this.updateUserForm.value.username;
    const email = this.updateUserForm.value.email;
    const password = this.updateUserForm.value.password;
    const approved = this.updateUserForm.value.approved;
    const ref = this.updateUserForm.value.ref;

    this.userService.updateUser({ approved, username, email, password, ref }).subscribe(
      response => {
        console.log('Update User Response:', response);
        // Handle success response
      },
      error => {
        console.log('Update User Error:', error);
        // Handle error response
      }
    );
  }
}
