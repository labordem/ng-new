import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutNavComponent } from './layout-nav.component';

describe('LayoutNavComponent', () => {
  let component: LayoutNavComponent;
  let fixture: ComponentFixture<LayoutNavComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LayoutNavComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
