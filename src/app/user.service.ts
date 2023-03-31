import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  loginUser(username: string, password: string): Observable<boolean> {
    return this.firestore
      .collection('users', (ref) =>
        ref.where('username', '==', username).where('password', '==', password)
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        map((users) => users.length > 0),
        catchError((error) => of(false))
      );
  }
}
