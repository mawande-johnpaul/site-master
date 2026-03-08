import { Component, inject } from '@angular/core';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { AppContext } from '../../../services/app-context';

@Component({
  selector: 'app-documents',
  imports: [Sidebar],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class Documents {
  context = inject(AppContext);
}
