import { Routes } from "@angular/router";

import { AuthComponent } from "./core/auth/components/auth/auth.component";
import { HomeComponent } from "./core/home/home.component";

export const routes: Routes = [
    {
        path: "auth",
        component: AuthComponent,
    },
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full",
    },
    {
        path: "**",
        redirectTo: "/auth",
        pathMatch: "full",
    },
];
