import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.page.html',
  styleUrls: ['./category-filter.page.scss'],
})
export class CategoryFilterPage implements OnInit {

  categories = [];
  selected = null;

  constructor(private api: ApiService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.api.getCategories().subscribe(res => {
      console.log('cat :', res);
      this.categories = res;
      this.categories.unshift({ name: 'All', id: null });
    });
  }

  selectCat(cat) {
    this.popoverCtrl.dismiss(cat);
  }

}
