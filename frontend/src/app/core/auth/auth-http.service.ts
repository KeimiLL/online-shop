import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { DBUser, TokenResponse } from "./auth.model";

@Injectable({
    providedIn: "root",
})
export class AuthHttpService {
    // TODO: Set global api url
    #baseUrl = "http://localhost:8000";
    #usersUrl = this.#baseUrl + "/api/users";
    #tokenUrl = this.#baseUrl + "/token";
    #http = inject(HttpClient);

    createUser$(user: DBUser): Observable<DBUser> {
        return this.#http.post<DBUser>(this.#usersUrl, user);
    }

    loginUser$(email: string, password: string): Observable<TokenResponse> {
        const params = new HttpParams()
            .set("username", email)
            .set("password", password);
        return this.#http.post<TokenResponse>(this.#tokenUrl, params);
    }
}
