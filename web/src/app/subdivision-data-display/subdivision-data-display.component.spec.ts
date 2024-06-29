// src/app/subdivision-data-display/subdivision-data-display.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { SubdivisionService } from './subdivision-data-display.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;
  let mockSubdivisionService;

  beforeEach(async () => {
    mockSubdivisionService = jasmine.createSpyObj(['getSubdivisions']);

    await TestBed.configureTestingModule({
      declarations: [SubdivisionDataDisplayComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: SubdivisionService, useValue: mockSubdivisionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should filter and sort subdivisions correctly', () => {
    const subdivisions = [
      { name: 'Subdivision A', subdivisionDataCode: 'Active', nearMapImageDate: '2023-06-17T18:02:42.000Z' },
      { name: 'Subdivision B', subdivisionDataCode: 'NA', nearMapImageDate: '2023-06-17T18:02:42.000Z' },
      { name: 'Subdivision C', subdivisionDataCode: '', nearMapImageDate: '2023-06-17T18:02:42.000Z' },
      { name: 'Subdivision D', subdivisionDataCode: 'Builtout', nearMapImageDate: '2023-06-17T18:02:42.000Z' },
      { name: 'Subdivision E', subdivisionDataCode: 'Active', nearMapImageDate: '2023-06-17T18:02:42.000Z' }
    ];

    component.subdivisions = subdivisions;
    component.filter = 'Active';
    component.sort = 'name';

    const result = component.filteredAndSortedSubdivisions();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Subdivision A');
    expect(result[1].name).toBe('Subdivision E');
  });
});
