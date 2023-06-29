import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  deleteUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.deleteUserForm = this.formBuilder.group({
      id: ['', Validators.required]
    });
  }

  deleteUser(): void {
    if (this.deleteUserForm.invalid) {
      return;
    }

    const id = this.deleteUserForm.value.id;

    this.userService.deleteUser(id).subscribe(response => {
      console.log('Delete User Response:', response);
      // Handle success response
    }, error => {
      console.log('Delete User Error:', error);
      // Handle error response
    });
  }
}
