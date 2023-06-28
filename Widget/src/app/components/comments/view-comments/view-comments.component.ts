import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertsService } from 'src/app/services/alerts-service/alerts.service';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {
  commentForm: FormGroup;
  comments: any[] = [];
  currentIndex: number = 0;
  displayComment: any = null;
  timerInterval: any = null;
  constructor(private alertsService: AlertsService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchComments();
    this.startTimer();
  }

  handleFormSubmit() {
    if (this.commentForm.invalid) {
      return;
    }

    const formData = {
      name: this.commentForm.value.name.trim(),
      email: this.commentForm.value.email.trim(),
      comment: this.commentForm.value.comment.trim()
    };

    this.http.post<any>(`${environment.apiUrl}/.netlify/functions/add-comment`, formData)
      .subscribe(result => {
        this.alertsService.showMessage('Comment added', result);
        this.commentForm.reset();
      }, error => {
        this.alertsService.showError('Error adding comment', error);

      });
  }


  fetchComments() {
    this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-approved-comments`)
      .subscribe(data => {
        this.comments = data;
        const randomIndex = Math.floor(Math.random() * this.comments.length); // Gener
        this.displayComment = this.comments[randomIndex];
      }, error => {
        this.alertsService.showError('Error fetching comments', error);

      });
  }

  goForward() {
    const randomIndex = Math.floor(Math.random() * this.comments.length); // Gener
    this.displayComment = this.comments[randomIndex];
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.goForward();
    }, 5000); // Adjust the interval duration (in milliseconds) as needed
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }
}
