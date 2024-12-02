import { Component, input, output, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';

@Component({
  selector: 'app-center-dashboard',
  standalone: true,
  imports: [
    AngularMaterialModule,
  ],
  templateUrl: './center-dashboard.component.html',
  styleUrl: './center-dashboard.component.css'
})
export class CenterDashboardComponent {
  totalClients = input<number>()
  openDialog = output<"create" | "edit" | "remove">()
  isFavoriteRoute = input<boolean>()
  pageSizeChange = output<number>()
  pageSizeFilter = signal<number>(20)

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const pageSize = Number(selectElement.value)
    this.pageSizeFilter.set(pageSize)

  }

  pageSize = this.pageSizeFilter()
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
