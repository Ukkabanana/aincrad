import { Component, OnInit } from '@angular/core';
import { BoardgameData } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private bgData: BoardgameData) {}

  ngOnInit() {
    this.bgData.getApi("131357").subscribe(data => {
      console.log(data);  //FOR DEBUGGING
      document.getElementById("gameName").innerHTML = data["name"];
      document.getElementById("gameImg").innerHTML = "<img src= '"+data["image"]+"'>";
      document.getElementById("gameDesc").innerHTML = data["description"];
    });
  }

}