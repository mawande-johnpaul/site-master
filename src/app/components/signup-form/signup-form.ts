import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from '../login-form/login-form';
import { AppContext } from '../../services/app-context';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm {
  context = inject(AppContext);
  router = inject(Router);

  firstName = '';
  lastName = '';
  email = '';
  company = '';
  password = '';

  openLogin() {
    this.context.openModal(LoginForm);
  }

  submit() {
    this.context.closeModal();
    this.router.navigate(['/0/dashboard']);
  }
}
