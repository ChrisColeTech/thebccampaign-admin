import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { AlertsService } from 'src/app/services/alerts-service/alerts.service';

@Component({
  selector: 'app-export-comments',
  templateUrl: './export-comments.component.html',
  styleUrls: ['./export-comments.component.scss']
})
export class ExportCommentsComponent {
  constructor(private http: HttpClient, private alertsService: AlertsService) { }

  exportToExcel() {
    this.http.get<any[]>('/.netlify/functions/get-comments')
      .subscribe(data => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Comments');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'comments');
      }, error => {
        this.alertsService.showError('Error retrieving comments', error);
      });
  }

  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(data);
    downloadLink.href = url;
    downloadLink.download = fileName + '.xlsx';
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    downloadLink.remove();
  }
}
