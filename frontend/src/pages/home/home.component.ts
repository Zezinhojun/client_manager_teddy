import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../app/core/stores/AuthStore';
import { first, interval, switchMap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SnackbarService } from '../../app/core/services/Snackbar-service/snackbar.service';
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';
import { ClientMessages } from '../../app/shared/utils/messages';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
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

  public defineCache(): void {
    if (this.form.valid) {
      this.authStore.setCache(this.form.get('username')?.value);
      interval(100).pipe(
        switchMap(async () => this.authStore.loading()),
        first(loading => !loading),
        switchMap(async () => {
          if (this.authStore.isLoggedIn()) {
            this.snackbar.show(ClientMessages.SUCCESS.LOGIN)
            return this.router.navigate(['/dashboard'])
          } else {
            this.snackbar.show(ClientMessages.ERROR.LOGIN)
            return this.router.navigate(['/home']);
          }
        })
      ).subscribe();
    } else {
      this.form.markAllAsTouched()
    }
  }

}
