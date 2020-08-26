import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticateService {

    private user: BehaviorSubject<Observable<firebase.User>> = new BehaviorSubject<Observable<firebase.User>>(null);
    user$: Observable<firebase.User> = this.user
        .asObservable()
        .pipe(switchMap((user: Observable<firebase.User>) => user));


    constructor(private afAuth: AngularFireAuth) {
        this.user.next(this.afAuth.authState);
        // this.afAuth.auth.onAuthStateChanged((data: firebase.User) => this.user.next(of(data)))
    }

    loginViaGoogle(): Observable<auth.UserCredential> {
        const provider: auth.GoogleAuthProvider = new auth.GoogleAuthProvider();
        return from(this.afAuth.auth.signInWithPopup(provider));
    }

    logout(): Observable<void> {
        return from(this.afAuth.auth.signOut());
    }


}