import { Component, inject } from '@angular/core';
import { Modal } from '../../components/modal/modal';
import { AppContext } from '../../services/app-context';
import { LoginForm } from '../../components/login-form/login-form';
import { SignupForm } from '../../components/signup-form/signup-form';

@Component({
  selector: 'app-default',
  imports: [Modal],
  templateUrl: './default.html',
  styleUrl: './default.css',
})
export class Default {
  context = inject(AppContext);

  openLogin() {
    this.context.openModal(LoginForm);
  }

  openSignup() {
    this.context.openModal(SignupForm);
  }
}
