import { Component, OnInit } from '@angular/core';
import { BoardgameData } from '../services/data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  result:any;

  form: FormGroup;
  show = false;
  recGameArr = [];

  constructor(private bgData: BoardgameData) {}

  ngOnInit() {
    this.getTop10Games();
  }

  //Manually refresh this page
  doRefresh(refresher) {
    console.log('Refreshing...');

    setTimeout(() => {
      this.getTop10Games();
      console.log('Refreshed!');
      refresher.target.complete();
    }, 0);
  }
  

  //Get 10 hottest game on BGG
  getTop10Games(){
    //Get hottest game currently (item[0] is first place)
    this.bgData.getTop50().subscribe(data => {
      this.result = data;
      //Get data of top (10) games 
      for(let i:number = 0; i < 10; i++){
        var gameIdStr:string = String(this.result.items.item[i].$.id);
        //Get data from BGG Public API (See data.service.ts)
        this.bgData.getApi(gameIdStr).subscribe(data => {
          this.result = data;
          console.log(data);  //FOR DEBUGGING
          // JSON converted from XML is not easy to read. This results in multiple-level nested JSON.
          let gameItem = this.result.items.item;
          // In XML provided by the public API, 'name' may or may not be an array.
          let gameName:string;
          if(gameItem.name[0] != undefined) gameName = gameItem.name[0].$.value;
          else gameName = gameItem.name.$.value;
          //Put only description in array, this one can do "Read More/Show Less!"
          this.recGameArr.push({
            orderInList: i,
            gameId: gameItem.$.id,
            name: gameName,
            image: gameItem.image,
            content: gameItem.description,
            visible: false
          })
          //Source: https://stackoverflow.com/questions/53372022/how-will-achive-content-show-more-and-show-less-in-angular-6
          //Source: https://stackblitz.com/edit/angular-multi-select-eg?file=src%2Fapp%2Fapp.component.ts
        });
      }
    });
  }

}