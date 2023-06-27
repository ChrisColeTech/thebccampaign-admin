import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsService } from 'src/app/services/alerts-service/alerts.service';

@Component({
  selector: 'app-approve-comments',
  templateUrl: './approve-comments.component.html',
  styleUrls: ['./approve-comments.component.scss']
})
export class ApproveCommentsComponent implements OnInit {
  comments: any[];
  displayedColumns: string[] = ['name', 'email', 'comment', 'actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private http: HttpClient, private alertsService: AlertsService) { }
  ngOnInit() {
    this.fetchUnapprovedComments();
  }

  fetchUnapprovedComments() {
    this.http
      .get<any[]>(`${environment.apiUrl}/.netlify/functions/get-unapproved-comments`)
      .subscribe(
        (data) => {
          this.comments = data;
          this.dataSource = new MatTableDataSource(this.comments);
        },
        (error) => {
          this.alertsService.showError('Error fetching comments:', error);
        }
      );
  }

  approveComment(commentId: string) {
    const data = { ref: commentId };
    this.http
      .post(`${environment.apiUrl}/.netlify/functions/approve-comment`, data)
      .subscribe(
        (response) => {
          this.alertsService.showMessage('Comment approved', response);
          this.fetchUnapprovedComments();
        },
        (error) => {
          this.alertsService.showError('Error approving comment', error);
        }
      );
  }

  denyComment(commentId: string) {
    const data = { ref: commentId };
    this.http
      .post(`${environment.apiUrl}/.netlify/functions/delete-comment`, data)
      .subscribe(
        (response) => {
          this.alertsService.showMessage('Comment deleted successfully:', response);
          this.fetchUnapprovedComments();
        },
        (error) => {
          this.alertsService.showError('Error denying comment', error);
        }
      );
  }
}
