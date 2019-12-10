import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string =""
  password: string =""
  cpassword: string =""

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register(){
    const { username, password, cpassword } = this
    if(password != cpassword){
      return console.error("Password doesn't match")
    }  

    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(username,password)
      console.log(result)
    } catch(error){
      console.dir(error)
      if(error.code=="auth/weak-password"){
        console.log("Your password is too weak. It should be at least 67 characters")
      }
    }


    
  }

}
