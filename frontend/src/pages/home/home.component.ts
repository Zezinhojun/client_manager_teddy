import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../app/core/store';
import { first, interval, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SnackbarService } from '../../app/core/services/Snackbar-service/snackbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)
  private readonly snackbar = inject(SnackbarService)
  public authStore = inject(AuthStore)
  public form!: FormGroup

  ngOnInit(): void {
    this.initialForm()
  }

  private initialForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required]
    })
  }

  defineCache(): void {
    if (this.form.valid) {
      this.authStore.setCache(this.form.get('username')?.value);
      interval(100).pipe(
        switchMap(async () => this.authStore.loading()),
        first(loading => !loading),
        switchMap(async () => {
          if (this.authStore.isLoggedIn()) {
            this.snackbar.show('Login bem sucedido!', 'Fechar')
            return this.router.navigate(['/dashboard'])
          } else {
            this.snackbar.show('Falha no login, tente novamente.', 'Fechar')
            return this.router.navigate(['/home']);
          }
        })
      ).subscribe();
    } else {
      this.form.markAllAsTouched()
    }
  }

}
