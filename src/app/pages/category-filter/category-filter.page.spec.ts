import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryFilterPage } from './category-filter.page';

describe('CategoryFilterPage', () => {
  let component: CategoryFilterPage;
  let fixture: ComponentFixture<CategoryFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryFilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
