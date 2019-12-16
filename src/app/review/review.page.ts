import { Component, OnInit, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingComponent } from 'ng-starrating';
import { Observable } from 'rxjs'

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

  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public http: HttpClientModule,
  ) { }

  ngOnInit() {
  }

  async addReview(){
    const comment = this.comment
    const players = this.players
    const time = this.time
    const uid = this.user.getUID()
    const rate = this.rating
    console.log(comment,players,time,uid)
    this.afstore.collection("review").add({
        feedback: comment,
        group: players,
        duration: time,
        user: uid,
        gameid: "123456",
        rating: rate

    })
  }

  updateStar($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.rating=$event.newValue.toString();
    console.log(this.rating)
  }

  /*
  createPost(){
    const comment = this.comment
    const players = this.players
    const time = this.time
    const uid = this.user.getUID()
    console.log(comment,players,time,uid)
    this.afstore.collection("review").add({
        feedback: comment,
        group: players,
        duration: time,
        user: uid,
        gameid: "123456",
        rating: 5
    })
  }
  */
}
