import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators'; 

//Instrução do video 
export interface Firebase{
  name: string; 
  email: string;
  password: string; 
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  private firebase: Observable<Firebase[]>;
  private firebaseCollection: AngularFirestoreCollection<Firebase>;

  constructor(db: AngularFirestore) { 
    this.firebaseCollection = db.collection<Firebase>('todos');

    this.firebase = this.firebaseCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id; 
          return {id, ...data};
        })
      })
    )
  }

  addFirebase(firebase: Firebase){
    return this.firebaseCollection.add(firebase);
  }

}
