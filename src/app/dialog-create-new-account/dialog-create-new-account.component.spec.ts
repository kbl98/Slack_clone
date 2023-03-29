import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateNewAccountComponent } from './dialog-create-new-account.component';

describe('DialogCreateNewAccountComponent', () => {
  let component: DialogCreateNewAccountComponent;
  let fixture: ComponentFixture<DialogCreateNewAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateNewAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
