import { Component, computed, inject, signal } from '@angular/core';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { AppContext } from '../../../services/app-context';

@Component({
  selector: 'app-internships',
  imports: [Sidebar],
  templateUrl: './internships.html',
  styleUrl: './internships.css',
})
export class Internships {
  context = inject(AppContext);

  readonly pageSize = 4;
  page = signal(0);
  pagedListings = computed(() =>
    this.context.listings().slice(this.page() * this.pageSize, (this.page() + 1) * this.pageSize)
  );
  totalPages = computed(() => Math.ceil(this.context.listings().length / this.pageSize));

  prevPage() { this.page.update(p => p - 1); }
  nextPage() { this.page.update(p => p + 1); }
}
