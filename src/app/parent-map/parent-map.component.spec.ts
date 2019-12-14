import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMapComponent } from './parent-map.component';

describe('ParentMapComponent', () => {
  let component: ParentMapComponent;
  let fixture: ComponentFixture<ParentMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
