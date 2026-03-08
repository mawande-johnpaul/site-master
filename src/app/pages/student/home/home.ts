import { Component, computed, inject, signal } from '@angular/core';
import { AppContext, ApplicationStatus } from '../../../services/app-context';
import { Sidebar } from '../../../components/sidebar/sidebar';

@Component({
  selector: 'app-home',
  imports: [Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  context = inject(AppContext);

  readonly statusLabels: Record<ApplicationStatus, string> = {
    offered: 'Offered',
    interview: 'Interview',
    pending: 'Pending',
    rejected: 'Rejected',
  };

  readonly pageSize = 5;
  page = signal(0);
  pagedApplications = computed(() =>
    this.context.applications().slice(this.page() * this.pageSize, (this.page() + 1) * this.pageSize)
  );
  totalPages = computed(() => Math.ceil(this.context.applications().length / this.pageSize));

  prevPage() { this.page.update(p => p - 1); }
  nextPage() { this.page.update(p => p + 1); }
}
