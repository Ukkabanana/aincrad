import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { ToastController } from '@ionic/angular' 
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string =""
  password: string =""
  cpassword: string =""

  constructor(
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async register(){
    const { username, password, cpassword } = this
    if(password != cpassword){
      this.showAlert("Error", "Password doesn't match")
      return console.error("Password doesn't match")
    }  

    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(username,password)
      console.log(result)
      this.showToast("Success!", "Welcome to the realm!")
      this.router.navigate(['home'])
    } catch(error){
      console.dir(error)
      if(error.code=="auth/weak-password"){
        console.log("Your password is too weak. It should be at least 67 characters")
        this.showAlert("Error", error.message)
      }
    }


    
  }

  async showToast(header: string, message: string){
     const toast = await this.toastCtrl.create({
       header,
       message,
       position: 'bottom',
       duration: 2000
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
