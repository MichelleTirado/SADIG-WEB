import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordrecoveryFormComponent } from './passwordrecovery-form.component';

describe('PasswordrecoveryFormComponent', () => {
  let component: PasswordrecoveryFormComponent;
  let fixture: ComponentFixture<PasswordrecoveryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordrecoveryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordrecoveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
