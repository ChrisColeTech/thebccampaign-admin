import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    constructor(private snackBar: MatSnackBar) { }

    showMessage(message: string, object: any) {
        console.log(message, object);
        this.show(message)
    }


    showError(message: string, object: any) {
        console.error(message, object);
        this.show(message)

    }

    showWarning(message: string, object: any) {
        console.warn(message, object);
        this.show(message)

    }

    show(message) {
        this.snackBar.open(message, 'Dismiss', {
            duration: 5000, // Snackbar duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

}
