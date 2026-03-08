import { Component, inject, EnvironmentInjector } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { AppContext } from '../../services/app-context';

@Component({
  selector: 'app-modal',
  imports: [NgComponentOutlet,],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  context = inject(AppContext);
  environmentInjector = inject(EnvironmentInjector);
  isOpen = this.context.isOpen;
  activeModal = this.context.activeModal;

  close() {
    this.context.closeModal();
  }
}
