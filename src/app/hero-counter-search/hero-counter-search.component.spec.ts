import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCounterSearchComponent } from './hero-counter-search.component';

describe('HeroCounterSearchComponent', () => {
  let component: HeroCounterSearchComponent;
  let fixture: ComponentFixture<HeroCounterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroCounterSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCounterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
