import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDirectMessageComponent } from './create-direct-message.component';

describe('CreateDirectMessageComponent', () => {
  let component: CreateDirectMessageComponent;
  let fixture: ComponentFixture<CreateDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDirectMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
