import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    inject,
    OnInit,
    signal,
} from "@angular/core";
import {
    NavigationEnd,
    Router,
    RouterLink,
    RouterModule,
} from "@angular/router";
import { filter } from "rxjs";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [RouterLink, RouterModule, CommonModule],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
    protected isAuth = signal<boolean>(false);

    readonly #router = inject(Router);

    ngOnInit(): void {
        this.#router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                console.log(event.url);
                this.isAuth.set(event.url === "/auth");
            });
    }

    @HostListener("window:scroll", ["$event"])
    protected onWindowScroll(): void {
        const navbar = document.querySelector(".navbar") as HTMLElement;
        if (window.scrollY > navbar.clientHeight || this.isAuth()) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    }
}
