# ssm_app
Supers_app

Ban dau chua co ji het ban can cai node cho may tinh de chay cac lenh

Cai dat Ionic dau tien 1 lan thoi a
npm install -g @ionic/cli

Cai dat cac thu vien can thiet cho Ionic
npm install

Chay app test tren nen web gia lap
ionic serve (hoac ionic serve --lab)

Chay thu ok roi thi minh build ung dung nhe
ionic cordova platform add android
ionic cordova platform add ios


Để build (xuat ban ung dung ra file cai dat) thành ứng dụng cho android
- Cai Android Stodio
- Java 8
download tu link https://drive.google.com/file/d/1F3o8QUg4NHPqHsU0-W-rizuiSdL79999/view?usp=sharing
- Gradle
brew install gradle

export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_261.jdk/Contents/Home"

echo "export PATH=\$PATH:~/Library/Android/sdk/build-tools/30.0.3/" >> ~/.bash_profile && . ~/.bash_profile
//
- Build ung dung Android
ionic cordova build android --prod --release

- Build ung dung iOS:
ionic cordova build ios

OK Thanh cong roi, sau nay ko chay linh tinh may cai nay nua, chay lenh la dc

Tao key keytool (minh da tao voi password laf 123456)
keytool -genkey -v -keystore my-release-key.keystore -alias supers_app -keyalg RSA -keysize 2048 -validity 10000

For signing app with keystore
Copy file build da xuat thanh cong o: /Users/nguyenthanhphuong/Documents/SuperS/app/supers_app/platforms/android/app/build/outputs/apk/release/
Dan vao thu muc goc di cho de go cau lenh

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk supers_app

Sau do nhap Password: 123456 (luc tao file key)

Nen file va phat hanh bang lenh sau:
zipalign -v 4 app-release-unsigned.apk supers_app.apk


OK xong
cai dat file supers_app.apk trong thu muc goc ung dung de test thu

Tham khao them:
https://ionicframework.com/docs/v3/intro/deploying/
Cai them cai nay: To install Android SDK on macOS:
Mo ung dung Android Studio.
Vao muc: Tools > SDK Manager.
Under Appearance & Behavior > System Settings > Android SDK, you will see a list of SDK Platforms to choose from. ...
Android Studio will confirm your selection. ...
Once the requested components have been installed, click Finish button
//
For build
ionic cordova build android --prod --release
//
For create signing key keytool
keytool -genkey -v -keystore my-release-key.keystore -alias supers_app -keyalg RSA -keysize 2048 -validity 10000
//
For signing app with keystore
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk supers_app

For signing app for publishing in playstore

zipalign -v 4 app-release-unsigned.apk supers_app.apk

export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_261.jdk/Contents/Home"

echo "export PATH=\$PATH:~/Library/Android/sdk/build-tools/30.0.3/" >> ~/.bash_profile && . ~/.bash_profile