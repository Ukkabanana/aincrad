import { Component, OnInit } from '@angular/core';
import { BoardgameData } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  result:any;

  recGameArr: Array<any> = [];

  constructor(private bgData: BoardgameData) {}

  ngOnInit() {
    //Get hottest game currently (item[0] is first place)
    this.bgData.getTop50().subscribe(data => {
      this.result = data;
      //Get data of top 10 games 
      for(let i:number = 0; i < 10; i++){
        this.bgData.getApi(String(this.result.items.item[i].$.id)).subscribe(data => {
          this.result = data;
          console.log(data);  //FOR DEBUGGING
          // JSON converted from XML is not easy to read. This results in multiple-level nested JSON.
          let gameItem = this.result.items.item;
          // In XML provided by the public API, 'name' may or may not be an array.
          /*
          if(gameItem.name[0] != undefined) document.getElementById("recGameName").innerHTML = gameItem.name[0].$.value;
          else document.getElementById("recGameName").innerHTML = gameItem.name.$.value;
          document.getElementById("recGameImg").innerHTML = "<img src= '"+gameItem.image+"'>";
          document.getElementById("recGameDesc").innerHTML = gameItem.description;
          */
          let gameName:string;
          if(gameItem.name[0] != undefined) gameName = gameItem.name[0].$.value;
          else gameName = gameItem.name.$.value;
          this.recGameArr.push([
            gameName,
            gameItem.image,
            gameItem.description
          ]);
        });
      }
    });
    
  }

}