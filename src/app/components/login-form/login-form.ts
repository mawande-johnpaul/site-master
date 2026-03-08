import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppContext } from '../../services/app-context';
import { SignupForm } from '../signup-form/signup-form';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  context = inject(AppContext);
  router = inject(Router);

  email = '';
  password = '';

  openSignup() {
    this.context.openModal(SignupForm);
  }

  submit() {
    this.context.closeModal();
    this.router.navigate(['/0/dashboard']);
  }
}
