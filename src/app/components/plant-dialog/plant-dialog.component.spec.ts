import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDialogComponent } from './plant-dialog.component';

describe('DialogComponent', () => {
  let component: PlantDialogComponent;
  let fixture: ComponentFixture<PlantDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantDialogComponent]
    });
    fixture = TestBed.createComponent(PlantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
