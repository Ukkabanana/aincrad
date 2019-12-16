import { Injectable, RootRenderer } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from 'rxjs/operators';
import { TransformProvider } from '../providers/transform';

@Injectable({
    providedIn: "root"
})

export class BoardgameData {
    constructor(private http: HttpClient, private transformProvider: TransformProvider) {}

    //Input string (Board game ID) to get data from public api (BGG).
    getApi(id: string) {
        return this
            .http
            .get('https://www.boardgamegeek.com/xmlapi2/thing?id='+id, { responseType: "text" })      
            // use the pipe method
            .pipe(
            // ... to apply oprtators to obervables
            map((result: string) => this.transformProvider.convertToJson(result))
            )
    }

    //Input string (Search Text) to get data of all games containing input string in their names.
    searchApi(searchText: string) {
        console.log(searchText);
        return this
            .http
            .get('https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query='+searchText, { responseType: "text" })   
            // use the pipe method
            .pipe(
            // ... to apply oprtators to obervables
            map((result: string) => this.transformProvider.convertToJson(result))
            )
    }

    //Get data of the top 50 games currently in the 'hot' section on BGG
    getTop50() {
        return this
            .http
            .get('https://www.boardgamegeek.com/xmlapi2/hot?type=boardgame', { responseType: "text" })   
            // use the pipe method
            .pipe(
            // ... to apply oprtators to obervables
            map((result: string) => this.transformProvider.convertToJson(result))
            )
    }
    
    // Source: https://forum.ionicframework.com/t/how-convert-xml-input-file-to-json/40759/18

}