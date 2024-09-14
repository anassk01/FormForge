import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAnalysisComponent } from './code-analysis.component';

describe('CodeAnalysisComponent', () => {
  let component: CodeAnalysisComponent;
  let fixture: ComponentFixture<CodeAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
