import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;

  constructor(private afAuth?: AngularFireAuth, private afs?: AngularFirestore) {
    
    if(afAuth && afs){
      this.user$ = this.afAuth.authState.pipe(
        switchMap((user) => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          }
          return of(null);
        })
      )
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) { console.log('Error ->', error); }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) { console.log('Error ->', error); }
  }

  async register(email: string, password: string): Promise<User> {
    try {

      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      
      //await this.sendVerificationEmail();
      return user;
    } catch (error) { console.log('Error ->', error); return;}
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      //this.presentAlert();
      return user;
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) { console.log('Error ->', error); }
  }


  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }

  redirectUser(insVerified: boolean){

  }

  verificarCorreo(correo: string): boolean {

    if(correo.includes('@')){
      return true;
    }

    return false;
  }

}
