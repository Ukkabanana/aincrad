import { Injectable, RootRenderer } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as xml2js from "xml2js";
import { map } from 'rxjs/operators';
import { TransformProvider } from '../providers/transform';

@Injectable({
    providedIn: "root"
})

export class BoardgameData {
    constructor(private http: HttpClient, private transformProvider: TransformProvider) {}

    //Input string (Board game ID) to return data from public api (bgg).
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
    // Source: https://forum.ionicframework.com/t/how-convert-xml-input-file-to-json/40759/18

}