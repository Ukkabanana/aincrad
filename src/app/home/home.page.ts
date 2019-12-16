import { Component, OnInit } from '@angular/core';
import { BoardgameData } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  result:any;

  constructor(private bgData: BoardgameData) {}

  ngOnInit() {
    //Get hottest game currently (item[0] is first place)
    this.bgData.getTop50().subscribe(data => {
      this.result = data;
      //Get data of that game
      this.bgData.getApi(String(this.result.items.item[0].$.id)).subscribe(data => {
        this.result = data;
        console.log(data);  //FOR DEBUGGING
        // JSON converted from XML is not easy to read. This results in multiple-level nested JSON.
        let gameItem = this.result.items.item;
        // In XML provided by the public API, 'name' may or may not be an array.
        if(gameItem.name[0] != undefined) document.getElementById("gameName").innerHTML = gameItem.name[0].$.value;
        else document.getElementById("gameName").innerHTML = gameItem.name.$.value;
        document.getElementById("gameImg").innerHTML = "<img src= '"+gameItem.image+"'>";
        document.getElementById("gameDesc").innerHTML = gameItem.description;
      });
    });
    
  }

}