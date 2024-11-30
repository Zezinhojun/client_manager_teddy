import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  snackbar = inject(MatSnackBar)

  show(message: string, action: string = '', duration: number = 3000): void {
    this.snackbar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

}
