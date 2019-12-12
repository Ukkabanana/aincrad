/*/////////////////////////////////////////////
// UNFINISHED AND NOT CONNECTED TO ANY PAGE! //
/////////////////////////////////////////////*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable()
export class ScoreProvider {
    private gameURL = 'https://www.boardgamegeek.com/xmlapi2/thing?id=';

    constructor(public http: HttpClient) {}

    getScore(id: string) {
        return this.http.get<Game>(this.gameURL+id);
    }
}