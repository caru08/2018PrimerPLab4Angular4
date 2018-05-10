import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackMessage {

    constructor(private snackBar: MatSnackBar){
    }

    ShowErrorSnack(message){
        this.snackBar.open(message, '', {
            duration: 4000, extraClasses: ['error-snackbar']
        });
    }

    ShowSuccesSnack(message){
        this.snackBar.open(message, '', {
            duration: 4000000, extraClasses: ['success-snackbar']
        });
    }

}