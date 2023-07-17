import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorTestComponent } from './ckeditor-test.component';

describe('CkeditorTestComponent', () => {
  let component: CkeditorTestComponent;
  let fixture: ComponentFixture<CkeditorTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkeditorTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CkeditorTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
