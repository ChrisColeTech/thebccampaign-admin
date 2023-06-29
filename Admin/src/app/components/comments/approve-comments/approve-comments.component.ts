import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsService } from 'src/app/services/alerts-service/alerts.service';
import { CommentService } from 'src/app/services/comments/comments-service';

@Component({
  selector: 'app-approve-comments',
  templateUrl: './approve-comments.component.html',
  styleUrls: ['./approve-comments.component.scss']
})
export class ApproveCommentsComponent implements OnInit {
  comments: any[];
  displayedColumns: string[] = ['name', 'email', 'comment', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private alertsService: AlertsService, private commentService: CommentService) { }

  ngOnInit() {
    this.fetchUnapprovedComments();
  }

  fetchUnapprovedComments() {
    this.commentService.getUnapprovedComments().subscribe(
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
    this.commentService.approveComment(data).subscribe(
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
    this.commentService.deleteComment(data).subscribe(
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
