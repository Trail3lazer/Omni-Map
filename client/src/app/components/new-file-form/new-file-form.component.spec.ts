import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileFormComponent } from './new-file-form.component';

describe('NewFileFormComponent', () => {
  let component: NewFileFormComponent;
  let fixture: ComponentFixture<NewFileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
