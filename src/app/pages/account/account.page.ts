import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userForm: FormGroup;

  constructor(
    private api: ApiService, 
    private fb: FormBuilder,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

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

  

}
