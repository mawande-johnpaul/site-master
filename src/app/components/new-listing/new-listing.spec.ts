import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListing } from './new-listing';

describe('NewListing', () => {
  let component: NewListing;
  let fixture: ComponentFixture<NewListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListing],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
