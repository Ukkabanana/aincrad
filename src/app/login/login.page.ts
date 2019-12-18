import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { ToastController } from '@ionic/angular' 
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string =""
  password: string =""
  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  async login(){
    const { username, password } = this
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(username,password)
      if(result.user){
        this.user.setUser({
          username,
          uid: result.user.uid
        })
      }
      this.showToast("Welcome back to the realm !")
      this.router.navigate(['tabs'])
      
    } catch(error){
      console.dir(error)
      if(error.code == "auth/user-not-found"){
        console.log("User not found")
        this.showAlert("Error", "User not found")
      }
      if(error.code == "auth/invalid-email"){
        console.log("Invalid email")
        this.showAlert("Error", "Invalid email")
      }
    }
  }

  async showToast(header: string){
    const toast = await this.toastCtrl.create({
      header,
      // message,
      position: 'bottom',
      duration: 2000,
      cssClass: "toast-pink",
    })
    await toast.present()
  }

  async showAlert(header: string, message: string){
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Ok']
    })
    await alert.present()
  }

}
