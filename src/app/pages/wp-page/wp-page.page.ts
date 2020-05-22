import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wp-page',
  templateUrl: './wp-page.page.html',
  styleUrls: ['./wp-page.page.scss'],
})
export class WpPagePage implements OnInit {

  page = null;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    this.api.getPageContent(id).subscribe(res => {
      console.log('res: ', res);
      this.page = res;
    });

  }

}
