import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WpPagePage } from './wp-page.page';

describe('WpPagePage', () => {
  let component: WpPagePage;
  let fixture: ComponentFixture<WpPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WpPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
