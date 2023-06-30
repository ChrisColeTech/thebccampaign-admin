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
  users: any[] = [];
  selectedUsers: any[] = [];
  displayedColumns: string[] = ['select', 'username', 'email', 'approved', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private alertsService: AlertsService, private userService: UserService) { }

  ngOnInit() {
    this.fetchUnapprovedUsers();
  }

  fetchUnapprovedUsers() {
    this.userService.getUnapprovedUsers().subscribe(
      (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
      },
      (error) => {
        this.alertsService.showError('Error fetching users:', error);
      }
    );
  }

  toggleAllSelection() {
    if (this.selectedUsers.length === this.users.length) {
      this.selectedUsers = [];
    } else {
      this.selectedUsers = this.users.slice();
    }
  }

  toggleUserSelection(user: any) {
    const index = this.selectedUsers.indexOf(user);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }
  }

  isAllSelected() {
    return this.selectedUsers.length === this.users.length;
  }

  isSomeSelected() {
    return (
      this.selectedUsers.length > 0 &&
      this.selectedUsers.length < this.users.length
    );
  }

  bulkApprove() {
    const userIds = this.selectedUsers.map(user => user.ref['@ref'].id);
    const data = { userIds: userIds };
    this.userService.approveUsers(data).subscribe(
      (response) => {
        this.alertsService.showMessage('Users approved', response);
        this.fetchUnapprovedUsers();
        this.selectedUsers = [];
      },
      (error) => {
        this.alertsService.showError('Error approving users', error);
      }
    );
  }

  bulkDeny() {
    const userIds = this.selectedUsers.map(user => user.ref['@ref'].id);
    const data = { userIds: userIds };
    this.userService.deleteUsers(data).subscribe(
      (response) => {
        this.alertsService.showMessage('Users deleted', response);
        this.fetchUnapprovedUsers();
        this.selectedUsers = [];
      },
      (error) => {
        this.alertsService.showError('Error deleting users', error);
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
        this.alertsService.showMessage('User deleted', response);
        this.fetchUnapprovedUsers();
      },
      (error) => {
        this.alertsService.showError('Error denying user', error);
      }
    );
  }
}
