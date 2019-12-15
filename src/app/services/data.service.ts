import { Injectable, RootRenderer } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class BoardgameData {
    constructor(private http: HttpClient) {}

    //Input string (Board game ID) to return data from public api (bgg).
    getApi(id: string) {
        return this.http.get("https://bgg-json.azurewebsites.net/thing/"+id);
    }
    
}