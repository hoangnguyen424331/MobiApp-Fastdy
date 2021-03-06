import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})

export class AboutPage implements OnInit {

  data:any;
  text:any;
  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController){

    this.text = JSON.parse(localStorage.getItem('app_text'));


  }

  ngOnInit()
  {
  	this.loadData();
  }

  async loadData()
  {
  	const loading = await this.loadingController.create({
      message: 'Vui lòng đợi...',
      duration: 3000
    });
    await loading.present();

  	this.server.pages().subscribe((response:any) => {
	
	  this.data = response.data;

    console.log(this.data);

  	loading.dismiss();

  	});
  }
}
