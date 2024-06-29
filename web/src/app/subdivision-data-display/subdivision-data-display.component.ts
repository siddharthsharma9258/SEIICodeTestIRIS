// src/app/subdivision-data-display/subdivision-data-display.component.ts
import { Component, OnInit } from '@angular/core';
import { SubdivisionService } from './subdivision-data-display.service';

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit {
  subdivisions: any[] = [];
  filter: string = '';
  sort: string = 'name';
  currentPage = 1;
  itemsPerPage = 10;
  errorMessage: string | undefined;

  constructor(private subdivisionService: SubdivisionService) {}

  ngOnInit(): void {
    this.loadSubdivisions();
  }

  loadSubdivisions(): void {
    const observer = {
      next: (data: any) => {
        this.subdivisions = Array.isArray(data) ? data : data.subdivisions;
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching subdivisions';
      }
    };

    this.subdivisionService.getSubdivisions().subscribe(observer);
  }

  filteredAndSortedSubdivisions(): any[] {
    let filtered = this.subdivisions;

    if (this.filter) {
      filtered = filtered.filter(subdivision => subdivision.subdivisionStatusCode === this.filter);
    }

    filtered = filtered.filter(subdivision => subdivision.subdivisionStatusCode && subdivision.subdivisionStatusCode !== 'NA');
     
    return filtered.sort((a, b) => {
      if (this.sort === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sort === 'nearMapImageDate') {
        return new Date(a.nearMapImageDate).getTime() - new Date(b.nearMapImageDate).getTime();
      }
      return 0;
    });
  }
}
