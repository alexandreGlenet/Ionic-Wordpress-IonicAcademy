import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  post= null;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.api.getPostContent(id).subscribe(res => {
      console.log('res: ', res);
      this.post = res;
    });
  }

  sharePost() {

  }

}
