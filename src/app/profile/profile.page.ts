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
  userEmail: any;
  constructor(
    private afs: AngularFirestore,
    private user: UserService,
  ) {
    const account = afs.collection("users").doc(this.user.getUID())
    this.userPost = account.valueChanges()
    this.userPlayed = account.valueChanges()
    
    // console.log("SEE:",account.valueChanges())
   }

  ngOnInit() {
    this.afs.collection("users").doc(this.user.getUID()).valueChanges().subscribe(queriedItems => {
      let query:any = queriedItems; //this is the one that transform queryItem to be usable.
      console.log(query.email);
      const account = this.afs.collection("users").doc(this.user.getUID())
      this.userPost = account.valueChanges()
      this.userPlayed = account.valueChanges()
      this.userEmail = query.email;
    });
  }

  doRefresh(refresher) {
    console.log('Refreshing...');

    setTimeout(() => {
      this.ngOnInit();
      console.log('Refreshed!');
      refresher.target.complete();
    }, 500);
  }

}
