import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userForm: FormGroup;
  user = this.api.getCurrentUser();

  posts = [];

  constructor(private api: ApiService, private fb: FormBuilder, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.user.subscribe(user => {
      console.log('user changed: ', user);
      if (user) {
        this.loadPrivatePosts();
      } else {
        this.posts = [];
      }
    })
  }

  login() {
    this.api.signIn(this.userForm.value.username, this.userForm.value.password).subscribe(
      res => {
        console.log('login finished');
      },
      async err => {
        const alert = await this.alertCtrl.create({
          header: err.error.code,
          subHeader: err.error.data.status,
          message: err.error.message,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  loadPrivatePosts() {
    this.api.getPrivatePosts().subscribe(res => {
      console.log('my private posts: ', res);
      this.posts = res;
    });
  }

  logout() {
    this.api.logout();
  }
}
