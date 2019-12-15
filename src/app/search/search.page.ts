import { Component, OnInit } from '@angular/core';
import { BoardgameData } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  result:any
  searchResArr: Array<any> = []

  constructor(private bgData: BoardgameData) {}

  ngOnInit() {

  }

  onInput(searchText: string) {
    //let searchText:string;
    if(searchText.length >= 3){
      
      this.bgData.searchApi(searchText).subscribe(data => {
        this.result = data;
        console.log(this.result);  //FOR DEBUGGING
        let gameCount = this.result.items.item.length;
        let gameItem = this.result.items.item;
        //Reset search results
        this.searchResArr = [];
        //Show search results
        for (let i in gameItem) {
          console.log(gameItem[i].name.$.value); //FOR DEBUGGING
          this.searchResArr.push("- "+gameItem[i].name.$.value);
        }
      });
      
    }
    else{
      this.searchResArr = [];
    }
    console.log(searchText);
  }


}
