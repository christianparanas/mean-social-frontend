import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcontainerComponent } from './postcontainer.component';

describe('PostcontainerComponent', () => {
  let component: PostcontainerComponent;
  let fixture: ComponentFixture<PostcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
