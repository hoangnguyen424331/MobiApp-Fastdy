import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../service/server.service';
import { ToastController,Platform,LoadingController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})

export class CityPage implements OnInit {

  text:any;
  data:any;
  cityID:any;
  cityName:any;
  heading:string = 'Vui lòng chọn thành phố của bạn để tiếp tục.';
  constructor(public server : ServerService,public toastController: ToastController,public loadingController: LoadingController,private nav: NavController)
  {
    if(localStorage.getItem('city_id'))
    {
      this.cityID = localStorage.getItem('city_id');
      this.cityName = localStorage.getItem('city_name');
      this.heading = "Bạn muốn thay đổi thành phố của mình? Chọn và tiếp tục.";
    }

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
      mode: 'ios'
    });
    await loading.present();

    this.server.city().subscribe((response:any) => {
  
   this.data = response.data;
   this.text = response.text;

    loading.dismiss();

    });
  }

 
 async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position : 'bottom'
    });
    toast.present();
  }

  search(ev) {
   
    // set val to the value of the ev target
    var val = ev.target.value;

    if(val && val.length > 0)
    {
        if (val && val.trim() != '') {
        this.data = this.data.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    else
    {
        return this.loadData();
    }
   
  
  }

  setCity(id,name)
  {
    this.cityID   = id;
    this.cityName = name;
  }

  async city()
  {
    if(this.cityID)
    {
      if(localStorage.getItem('user_id') && localStorage.getItem('user_id') != 'null')
      {
          localStorage.setItem('city_id',this.cityID);
          localStorage.setItem('city_name',this.cityName);
          
          const loading = await this.loadingController.create({
          message: 'Vui lòng đợi...',
          duration: 3000
          });
          await loading.present();

          this.server.updateCity(this.cityID).subscribe((response:any) => {

          this.presentToast('Đã cập nhật thành phố thành công.');

          this.nav.navigateRoot('/home');

          loading.dismiss();

          });
      } 
      else
      {
          localStorage.setItem('city_id',this.cityID);
          localStorage.setItem('city_name',this.cityName);

          this.presentToast('Đã cập nhật thành phố thành công.');

          this.nav.navigateRoot('/home');
      }
    }
    else
    {
    this.presentToast('Vui lòng chọn thành phố để tiếp tục.');
    }
  }
}
