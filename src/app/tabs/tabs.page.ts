import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  // @ViewChild(IonTabs,{static: false}) tabs: IonTabs

  constructor() { }

  ngOnInit() {
    // this.tabs.select('feed')
  }

}
