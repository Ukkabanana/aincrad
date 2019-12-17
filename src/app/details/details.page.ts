import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardgameData } from '../services/data.service';
import { AlertController } from '@ionic/angular'

import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private idInUrl: string;
  result:any;
  public gameName: string;

  showReviewArr: Array<any>;

  constructor(private route:ActivatedRoute, 
    private bgData: BoardgameData, 
    public afs: AngularFirestore,
    public user: UserService,
    public alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    //Get ID from URL
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
      document.getElementById("gameImg").innerHTML = "<img src= '"+gameItem.image+"'>";
      document.getElementById("gameDesc").innerHTML = gameItem.description;
      //More Details (Players, Time, Age) come from these lines below.
      //Sometimes player count and playtime are given as a range, other times it is just a singular number.
      if(gameItem.minplayers.$.value == gameItem.maxplayers.$.value)
        document.getElementById("gamePlayers").innerHTML = "Players: "+gameItem.minplayers.$.value;
      else document.getElementById("gamePlayers").innerHTML = "Players: "+gameItem.minplayers.$.value+" - "+gameItem.maxplayers.$.value;
      if(gameItem.minplaytime.$.value == gameItem.maxplaytime.$.value)
        document.getElementById("gameTime").innerHTML = "Time: "+gameItem.minplaytime.$.value+" min.";
      else  document.getElementById("gameTime").innerHTML = "Time: "+gameItem.minplaytime.$.value+" - "+gameItem.maxplaytime.$.value+" min.";
      document.getElementById("gameAge").innerHTML =  "Age: "+gameItem.minage.$.value+"+";
    });
  }

  //Refresh reviews each time users enter this page
  ionViewWillEnter(){
    this.getReviewsFromFirebase();
  }

  //Manually refresh this page
  doRefresh(refresher) {
    console.log('Refreshing...');

    setTimeout(() => {
      this.getReviewsFromFirebase();
      console.log('Refreshed!');
      refresher.target.complete();
    }, 0);
  }

  //Get Reviews from Firebase
  getReviewsFromFirebase(){
    //Need another variable because of different access level.
    var dataArr:Array<any> = [];
    //Accessing review collection in Firebase
    var reviewColl = this.afs.firestore.collection("review");
    reviewColl.where("gameid", "==", this.idInUrl).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());  //FOR DEBUGGING
        //Number rating to Star rating
        var starRating:string;
        if(doc.data().rating == 1)  starRating="⭐";
        else if(doc.data().rating == 2)  starRating="⭐⭐";
        else if(doc.data().rating == 3)  starRating="⭐⭐⭐";
        else if(doc.data().rating == 4)  starRating="⭐⭐⭐⭐";
        else starRating="⭐⭐⭐⭐⭐";
        //Put data in arrays
        dataArr.push([
          starRating,
          doc.data().user,
          doc.data().feedback,
          doc.data().duration,
          doc.data().group
        ]);
      });
    })
    //Need another variable because of different access level.
    this.showReviewArr = dataArr;
  }

  async addGame(){
    //Get ID from URL
    this.idInUrl = this.route.snapshot.paramMap.get('id');
    console.log(this.idInUrl);  //FOR DEBUGGING

    
    const uid = this.user.getUID()
    console.log("UID: ", uid)

    console.log("UID: "+uid,"Played this game.")
  
    this.afs.collection("users").doc(this.user.getUID()).update({
        played: firestore.FieldValue.arrayUnion({
          user: uid,
          gameName: this.gameName,
        })  
    })
    await this.showAlert("OOWEE!","You have played this game.")
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
