import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    OnInit,
    signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: "app-auth",
    standalone: true,
    imports: [LoginComponent, RegisterComponent, MatButtonModule, CommonModule],
    templateUrl: "./auth.component.html",
    styleUrl: "./auth.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
    backgroundUrl = signal("../../../../../public/backgrounds/lamp.jpg");
    protected isLogin = signal(true);
    protected buttonMessage = computed(() =>
        this.isLogin() ? "Create an account" : "Log in"
    );
    protected buttonQuestion = computed(() =>
        this.isLogin()
            ? "Do not have an account yet?"
            : "Already have an account?"
    );

    ngOnInit() {
        const directoryPath = "../../../../../public/backgrounds";
        const backgrounds = [
            `/chair.jpg`,
            `/lamp.jpg`,
            `/leather_sofa.jpg`,
            `/mountains.jpg`,
        ];
        const randomImg =
            backgrounds[Math.floor(Math.random() * backgrounds.length)];
        this.backgroundUrl.set(`${directoryPath}${randomImg}`);
    }

    protected toggleAuthPage() {
        this.isLogin.set(!this.isLogin());
    }
}
