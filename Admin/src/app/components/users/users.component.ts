import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['username', 'email', 'actions'];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: any): void {
    this.router.navigate([`update-user/${user.id}`]);
  }

  deleteUser(user: any): void {
    // Call the deleteUser method on the user service
    this.userService.deleteUser(user).subscribe(response => {
      console.log('Delete User Response:', response);
      // Handle success response
    }, error => {
      console.log('Delete User Error:', error);
      // Handle error response
    });
  }
}
