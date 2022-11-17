import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth-service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        let authObservable: Observable<AuthResponseData> = new Observable<AuthResponseData>();
        const email = form.value.email;
        const password = form.value.password;


        this.isLoading = true;
        if (this.isLoginMode) {
            authObservable = this.authService.login(email, password)
        } else {
            debugger
            this.authService.signUp(email, password)
                .subscribe(response => {
                    console.log(response)
                    this.isLoading = false;
                }, errorMessage => {
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                });

        }

        authObservable.subscribe(response => {
            console.log(response)
            this.isLoading = false;
            this.router.navigate(['./recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        });

        form.reset();
    }
}