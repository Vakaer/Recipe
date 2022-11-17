import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { userModel } from "./user.model";



export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean

}



@Injectable({ providedIn: 'root' })
export class AuthService {

    user: Subject<userModel> = new Subject<userModel>();
    //it also gives subscriber an immediate access to previously emmitted value 
    //even if they haven't subscribed
    token : BehaviorSubject<userModel | null> = new BehaviorSubject<userModel | null>(null);

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        debugger
        //return this so we can subscribe it in the auth component
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCXB1s2NbEZrLCIulViePt58aKAjLxtkE',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(catchError(this.handleError), tap(resdata => {
                this.handleAuthenticaion(
                    resdata.email,
                    resdata.localId,
                    resdata.idToken,
                    +resdata.expiresIn
                );
            }));
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCXB1s2NbEZrLCIulViePt58aKAjLxtkE'
                , {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(catchError(this.handleError), tap(resdata => {
                this.handleAuthenticaion(
                    resdata.email,
                    resdata.localId,
                    resdata.idToken,
                    +resdata.expiresIn
                );
            })
            );
    }

    private handleAuthenticaion(email: string, userId: string, token: string, expiresIn: number) {
        //* by 100 because expiresIn is in seconds and getTime() is in milliseconds
        //+ to convert expiresIn into number
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
        const user = new userModel(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An Unknown error occured'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no account registered with this email'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid'
                break;
        }
        return throwError(errorMessage);
    }
}