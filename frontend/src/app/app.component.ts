import { Component } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { RouterOutlet } from "@angular/router";

import { NavbarComponent } from "./core/navbar/navbar.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, MatDividerModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
}
