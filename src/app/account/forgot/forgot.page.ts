import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  user_id:any;
  newPassword = false;
  email:any;
  text:any;
  constructor(public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController) { 

   this.text = JSON.parse(localStorage.getItem('app_text'));

  }

  ngOnInit() {
  }

  async forgot(data,type = "new")
  {
  	if(type == "new" && data.email.length == 0)
  	{
  		this.presentToast('Vui lòng nhập email');
  	}
  	else
  	{
		const loading = await this.loadingController.create({
		message: 'Vui lòng đợi...',
		mode:'ios'
		});
		await loading.present();

		this.server.forgot(data).subscribe((response:any) => {

		if(response.msg == "error")
		{
			this.presentToast(response.error);
		}
		else
		{
			this.presentToast("Mã OTP đã được gởi đến email của bạn");
			this.user_id = response.user_id;
			this.email   = data.email;
		}

		loading.dismiss();

		});
  	}
  }

  async verify(data)
  {
  	if(data.otp.length == 0)
  	{
  		this.presentToast('Nhập mã OTP');
  	}
  	else
  	{
		const loading = await this.loadingController.create({
		message: 'Vui lòng đợi...',
		duration: 3000,
		mode:'ios'
		});
		await loading.present();

		var allData = {otp : data.otp,user_id : this.user_id}

		this.server.verify(allData).subscribe((response:any) => {

		if(response.msg == "error")
		{
			this.presentToast(response.error);
		}
		else
		{
			this.user_id 	   = response.user_id;
			this.newPassword   = true;

			this.presentToast("Email đã được xác minh thành công.");
		}

		loading.dismiss();

		});
  	}
  }

  async new_password(data)
  {
  	if(data.password.length == 0)
  	{
  		this.presentToast('Vui lòng nhập mật khẩu mới của bạn');
  	}
  	else if(data.password != data.new_password)
  	{
  		this.presentToast('Xác nhận mật khẩu không khớp.');
  	}
  	else
  	{
		const loading = await this.loadingController.create({
		message: 'Vui lòng đợi...',
		duration: 3000,
		mode:'ios'
		});
		await loading.present();

		var allData = {password : data.password,user_id : this.user_id}

		this.server.updatePassword(allData).subscribe((response:any) => {

		if(response.msg == "error")
		{
			this.presentToast(response.error);
		}
		else
		{
			this.nav.navigateForward('/login');
			this.presentToast("Đã cập nhật mật khẩu mới thành công.");
			
		}

		loading.dismiss();

		});
  	}
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

  resend()
  {
  	this.forgot({email : this.email});
  }
}
