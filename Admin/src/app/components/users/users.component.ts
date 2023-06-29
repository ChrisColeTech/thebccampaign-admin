import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      console.log('Get Users Response:', response);
      this.users = response;
    }, error => {
      console.log('Get Users Error:', error);
      // Handle error response
    });
  }
}
