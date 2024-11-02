import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./auth.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class AuthHttpService {
    #apiUrl = "http://localhost:8000/api/users/";
    #http = inject(HttpClient);

    createUser$(user: User): Observable<User> {
        return this.#http.post<User>(this.#apiUrl, user);
    }
}
