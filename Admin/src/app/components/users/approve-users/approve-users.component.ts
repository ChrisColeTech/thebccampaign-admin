import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsService } from 'src/app/services/alerts-service/alerts.service';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss']
})
export class ApproveUsersComponent implements OnInit {
  users: any[];
  displayedColumns: string[] = ['name', 'email', 'user', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private alertsService: AlertsService, private userService: UserService) { }

  ngOnInit() {
    this.fetchUnapprovedUsers();
  }

  fetchUnapprovedUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
      },
      (error) => {
        this.alertsService.showError('Error fetching users:', error);
      }
    );
  }

  approveUser(userId: string) {
    const data = { ref: userId };
    this.userService.approveUser(data).subscribe(
      (response) => {
        this.alertsService.showMessage('User approved', response);
        this.fetchUnapprovedUsers();
      },
      (error) => {
        this.alertsService.showError('Error approving user', error);
      }
    );
  }

  denyUser(userId: string) {
    const data = { ref: userId };
    this.userService.deleteUser(data).subscribe(
      (response) => {
        this.alertsService.showMessage('User deleted successfully:', response);
        this.fetchUnapprovedUsers();
      },
      (error) => {
        this.alertsService.showError('Error denying user', error);
      }
    );
  }
}
