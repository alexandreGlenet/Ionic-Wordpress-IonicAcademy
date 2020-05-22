import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController, PopoverController } from '@ionic/angular';
import { CategoryFilterPage } from '../category-filter/category-filter.page';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss']
})
export class PostsPage implements OnInit {
  page = 1;
  posts = [];
  totalPages = 0;
  totalPosts = 0;

  categoryFilter = null;
  searchTerm = '';

  constructor(
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts(infiniteScroll = null) {
    let loading = null;
    if (!infiniteScroll) {
      loading = await this.loadingCtrl.create({
        message: 'Loading Data...'
      });
      await loading.present();
    }

    this.api.getPosts(this.page, this.categoryFilter).subscribe(
      res => {
        console.log('res: ', res);
        if (infiniteScroll) {
          infiniteScroll.target.complete();
          this.posts = [...this.posts, ...res.posts];
          if (this.page == this.totalPages) {
            infiniteScroll.target.disabled = true;
          }
        } else {
          this.posts = res.posts;
        }

        this.totalPages = res.pages;
        this.totalPosts = res.totalPosts;
      },
      err => {
        console.log('error: ', err);
      },
      () => {
        if (!infiniteScroll) {
          loading.dismiss();
        }
      }
    );
  }

  loadMore(event) {
    this.page++;
    this.loadPosts(event);
  }

  async openFilter(ev) {
    const popover = await this.popoverCtrl.create({
      component: CategoryFilterPage,
      event: ev,
      translucent: true,
      componentProps: {
        selected: this.categoryFilter
      }
    });

    popover.onDidDismiss().then(res => {
      console.log('after popover: ', res);
      if (res && res.data) {
        this.categoryFilter = res.data.id;
        this.loadPosts();
      }
    })

    await popover.present();
  }

  searchChanged() {
    this.page = 0;
    this.loadPosts();
  }


}
