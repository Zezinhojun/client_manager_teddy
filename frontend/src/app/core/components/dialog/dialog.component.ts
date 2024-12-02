import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective],
  providers: [
    provideNgxMask()
  ], templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  clientForm: FormGroup;
  dialogTitle: string;
  buttonTitle: string

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<MatDialogModule>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data?.title || 'Adicionar Cliente';
    this.buttonTitle = data.buttonTitle || 'Salvar'

    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      companyValue: ['', [Validators.required, Validators.min(0)]]
    });

    if (data?.client) {
      this.clientForm.patchValue(data.client);
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
