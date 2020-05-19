import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  page = 1;
  posts = [];
  totalPages = 0;
  totalPosts = 0;

  constructor(private api: ApiService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts(){

    let loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await loading.present();

    this.api.getPosts(this.page).subscribe(res => {
      console.log('res: ', res);
      this.posts = res.posts;
      this.totalPages = res.totalPages;
      this.totalPosts = res.totalPosts;
    }, err => {
      console.log('errors: ', err);
    }, () => {
      loading.dismiss();
    })

  }

}
