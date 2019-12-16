import { Component, OnInit, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingComponent } from 'ng-starrating';

import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  comment: string
  players: number
  time: number
  rating: string = '5';
  private idInUrl: string;

  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public http: HttpClientModule,
    private route:ActivatedRoute,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async addReview(){
    //Get ID from URL
    this.idInUrl = this.route.snapshot.paramMap.get('id');
    console.log(this.idInUrl);  //FOR DEBUGGING

    const comment = this.comment
    const players = this.players
    const time = this.time
    const uid = this.user.getUID()
    const rate = this.rating
    console.log("RATE: "+rate,"COMMENT: "+comment,"PLAYERS: "+players,"TIME: "+time,"UID: "+uid)
  
    this.afstore.collection("review").add({
        feedback: comment,
        group: players,
        duration: time,
        user: uid,
        gameid: this.idInUrl,
        rating: rate
    })

    this.navCtrl.pop();
  }

  updateStar($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.rating=$event.newValue.toString();
    console.log(this.rating)
  }
  
}
