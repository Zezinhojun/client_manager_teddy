import { Component, Inject } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TwoFirstNamesPipe } from '../../pipes/two-first-names.pipe';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [AngularMaterialModule, TwoFirstNamesPipe],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  clientUsername: string;
  dialogTitle: string;
  buttonTitle: string
  constructor(
    public dialogRef: MatDialogRef<MatDialogModule>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clientUsername = data.clientUsername || "Cliente name";
    this.dialogTitle = data.title || 'Excluir Cliente';
    this.buttonTitle = data.buttonTitle || 'Excluir'
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
