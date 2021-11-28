import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaudienceComponent } from './postaudience.component';

describe('PostaudienceComponent', () => {
  let component: PostaudienceComponent;
  let fixture: ComponentFixture<PostaudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostaudienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostaudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
