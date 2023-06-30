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
  comments: any[] = [];
  selectedComments: any[] = [];
  displayedColumns: string[] = ['select', 'name', 'email', 'comment', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(private alertsService: AlertsService, private commentService: CommentService) { }

  ngOnInit() {
    this.fetchUnapprovedComments();
  }

  fetchUnapprovedComments() {
    this.commentService.getUnapprovedComments().subscribe(
      (data) => {
        this.comments = data;
        this.dataSource = new MatTableDataSource<any>(this.comments);
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
        this.deselectAllComments();
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
        this.deselectAllComments();
      },
      (error) => {
        this.alertsService.showError('Error denying comment', error);
      }
    );
  }

  deselectAllComments() {
    this.selectedComments = [];
  }

  toggleAllSelection() {
    if (this.isAllSelected()) {
      this.deselectAllComments();
    } else {
      this.selectAllComments();
    }
  }

  isAllSelected() {
    return this.comments.length > 0 && this.selectedComments.length === this.comments.length;
  }

  isSomeSelected() {
    return this.selectedComments.length > 0 && !this.isAllSelected();
  }

  selectAllComments() {
    this.selectedComments = [...this.comments];
  }

  toggleCommentSelection(comment: any) {
    const index = this.selectedComments.indexOf(comment);
    if (index > -1) {
      this.selectedComments.splice(index, 1);
    } else {
      this.selectedComments.push(comment);
    }
  }

  bulkApprove() {
    const commentIds = this.selectedComments.map((comment) => comment.ref['@ref'].id);
    // Perform bulk approval logic here using the commentIds array
  }

  bulkDeny() {
    const commentIds = this.selectedComments.map((comment) => comment.ref['@ref'].id);
    // Perform bulk denial logic here using the commentIds array
  }
}
