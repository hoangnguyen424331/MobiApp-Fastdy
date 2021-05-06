import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})

export class OrderPage implements OnInit {

data:any;
text:any;

  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController,public alertController: AlertController){

    this.text = JSON.parse(localStorage.getItem('app_text'));
  
  }

  ngOnInit()
  {
  }

  ionViewWillEnter()
  {
    if(!localStorage.getItem('user_id') || localStorage.getItem('user_id') == 'null')
    {
      this.nav.navigateRoot('/login');

      this.presentToast("Vui lòng đăng nhập để truy cập hồ sơ của bạn");
    }
    else
    {
      this.loadData();
    }
  }

  async loadData()
  {
    const loading = await this.loadingController.create({
      message: 'Vui lòng đợi...',
    });
    await loading.present();

    var lid = localStorage.getItem('lid') ? localStorage.getItem('lid') : 0;

    this.server.myOrder(localStorage.getItem('user_id')+"?lid="+lid).subscribe((response:any) => {
  
    this.data = response.data;

    loading.dismiss();

    });
  }

  rate()
  {
    this.nav.navigateForward('/login');
  }

  async cancelOrder(id) {
    const alert = await this.alertController.create({
      header: 'Huỷ đơn hàng!',
      message: 'Bạn có chắc không? Bạn muốn hủy đơn đặt hàng này?',
      mode:'ios',
      buttons: [
        {
          text: 'Không',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {


          }
        }, {
          text: 'Có',
          handler: () => {
           
            this.cnc(id);

          }
        }
      ]
    });

    await alert.present();
  }

  async cnc(id)
  {
    const loading = await this.loadingController.create({
      message: 'Vui lòng đợi...',
    });
    await loading.present();

    this.server.cancelOrder(id,localStorage.getItem('user_id')+"?lid="+localStorage.getItem('lid')).subscribe((response:any) => {
  
    this.data = response.data;

    this.presentToast("Huỷ đơn hàng thành công.");

    loading.dismiss();

    });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }
}
