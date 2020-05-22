import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
const { Share } = Plugins;

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  post= null;

  comments= [];
  newComment = '';

  constructor(private route: ActivatedRoute, private api: ApiService, private alertCtrl: AlertController) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.api.getPostContent(id).subscribe(res => {
      console.log('post: ', res);
      this.post = res;
    });

    this.api.getComments(id).subscribe(res => {
      console.log('comments: ', res);
      this.comments = res;
    });
  }

  async sharePost() {
    Share.share({
      title: this.post.title.rendered,
      text: 'Check out this post!',
      url: this.post.link,
      dialogTitle: 'Share now'
    });
  }


  addComment() {
    this.api.addComment(this.post.id, this.newComment).subscribe(res => {
      this.newComment = '';
    }, async err => {
      const alert = await this.alertCtrl.create({
        header: err.error.code,
        subHeader: err.error.data.status,
        message: err.error.message,
        buttons: ['OK']
      });
      await alert.present();
    })
  }

}
