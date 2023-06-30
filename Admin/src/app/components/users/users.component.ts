import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts-service/alerts.service';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['username', 'email', 'approved', 'actions'];

  constructor(private alertsService: AlertsService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(id: any): void {
    this.router.navigate(['users/update-user', id]);
  }

  deleteUser(id: any): void {
    // Call the deleteUser method on the user service
    this.userService.deleteUser({ ref: id }).subscribe(response => {
      this.alertsService.showMessage('Successfully deleted user', response);
      this.getUsers();
      // Handle success response
    }, error => {
      this.alertsService.showError('Delete User Error:', error);
      // Handle error response
    });
  }
}
