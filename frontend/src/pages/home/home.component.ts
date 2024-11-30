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
  public authStore = inject(AuthStore)
  public router = inject(Router)
  private readonly fb = inject(FormBuilder)
  form!: FormGroup

  ngOnInit(): void {
    this.initialForm()
  }

  private initialForm() {
    this.form = this.fb.group({
      username: ['', Validators.required]
    })
  }

  defineCache() {
    if (this.form.valid) {
      this.authStore.setCache(this.form.get('username')?.value);
      interval(100).pipe(
        switchMap(async () => this.authStore.loading()),
        first(loading => !loading),
        switchMap(() => {
          return this.authStore.isLoggedIn()
            ? this.router.navigate(['/dashboard'])
            : this.router.navigate(['/home']);
        })
      ).subscribe();
    } else {
      this.form.markAllAsTouched()
    }
  }

}
