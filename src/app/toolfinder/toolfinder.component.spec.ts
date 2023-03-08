import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolfinderComponent } from './toolfinder.component';

describe('ToolfinderComponent', () => {
  let component: ToolfinderComponent;
  let fixture: ComponentFixture<ToolfinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolfinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
