import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userPost: any;
  userPlayed: any;

  constructor(
    private afs: AngularFirestore,
    private user: UserService,
  ) {
    const account = afs.collection("users").doc(this.user.getUID())
    this.userPost = account.valueChanges()
    this.userPlayed = account.valueChanges()
   }

  ngOnInit() {
  }

}
