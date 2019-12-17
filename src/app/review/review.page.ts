import { Component, OnInit, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingComponent } from 'ng-starrating';

import { ActivatedRoute } from '@angular/router';

import { firestore } from 'firebase';
import { BoardgameData } from '../services/data.service';

import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  comment: string;
  players: number;
  time: number;
  rating: string = '5';
  private idInUrl: string;
  public gameName: string;
  result:any;


  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public http: HttpClientModule,
    private route:ActivatedRoute,

    private bgData: BoardgameData,

    public navCtrl: NavController

  ) { }

  ngOnInit() {
    this.getGame();
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
        gameName: this.gameName,
        gameid: this.idInUrl,
        rating: rate
    })

    console.log("added to col: review")

    this.afstore.collection("users").doc(uid).update({
      posts: firestore.FieldValue.arrayUnion({
        feedback: comment,
        group: players,
        duration: time,
        user: uid,
        gameName: this.gameName,
        gameid: this.idInUrl,
        rating: rate
      })
    })
    console.log("added to col: users")


    this.navCtrl.pop();

  }

  updateStar($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.rating=$event.newValue.toString();
    console.log(this.rating)
  }

  getGame(){
    this.idInUrl = this.route.snapshot.paramMap.get('id');
    console.log(this.idInUrl);  //FOR DEBUGGING

    //Get data of that game
    this.bgData.getApi(this.idInUrl).subscribe(data => {
      this.result = data;
      //console.log(data);  //FOR DEBUGGING
      // JSON converted from XML is not easy to read. This results in multiple-level nested JSON.
      let gameItem = this.result.items.item;
      // In XML provided by the public API, 'name' may or may not be an array.
      if(gameItem.name[0] != undefined){
        document.getElementById("gameName").innerHTML = gameItem.name[0].$.value;
        this.gameName = gameItem.name[0].$.value;
      } else  {
        document.getElementById("gameName").innerHTML = gameItem.name.$.value;
        this.gameName = gameItem.name.$.value;
      }
    });
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
