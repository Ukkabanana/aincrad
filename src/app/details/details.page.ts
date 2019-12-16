import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardgameData } from '../services/data.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private idInUrl: string;
  result:any;

  showReviewArr: Array<any>;

  constructor(private route:ActivatedRoute, 
    private bgData: BoardgameData, 
    public afs: AngularFirestore,
    public user: UserService
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
      if(gameItem.name[0] != undefined) 
        document.getElementById("gameName").innerHTML = gameItem.name[0].$.value;
      else  document.getElementById("gameName").innerHTML = gameItem.name.$.value;
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

    //Get Reviews from Firebase
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

}
