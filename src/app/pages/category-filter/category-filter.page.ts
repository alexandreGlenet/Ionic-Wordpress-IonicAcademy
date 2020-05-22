import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.page.html',
  styleUrls: ['./category-filter.page.scss'],
})
export class CategoryFilterPage implements OnInit {

  categories = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCategories().subscribe(res => {
      console.log('cat :', res);
      this.categories = res;
    });
  }

}
