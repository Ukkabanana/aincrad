import { Component, OnInit } from '@angular/core';
import { BoardgameData } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  result:any

  constructor(private bgData: BoardgameData) {}

  ngOnInit() {

    this.bgData.getApi("131357").subscribe(data => {
      this.result = data;
      console.log(this.result.items.item);  //FOR DEBUGGING
      // JSON converted from XML is not easy to read. This results in multiple-level nested JSON.
      let gameItem = this.result.items.item;
      document.getElementById("gameName").innerHTML = gameItem.name[0].$.value;
      document.getElementById("gameImg").innerHTML = "<img src= '"+gameItem.image+"'>";
      document.getElementById("gameDesc").innerHTML = gameItem.description;
    });
  }

}