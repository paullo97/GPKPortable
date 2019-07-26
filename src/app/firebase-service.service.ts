import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators'; 

//Instrução do video 
//rever o video e reallizar um projeto do zero para aprender a mexer no FirebaseStore
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
    this.firebaseCollection = db.collection<Firebase>('gpk');

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

  getTodos() {
    return this.firebase;
  }

  getEmail(){
    return this.getEmail;
  }
 
  getTodo(id) {
    return this.firebaseCollection.doc<Firebase>(id).valueChanges();
  }
 
  updateTodo(todo: Firebase, id: string) {
    return this.firebaseCollection.doc(id).update(todo);
  }
 
  addTodo(todo: Firebase) {
    return this.firebaseCollection.add(todo);
  }
 
  removeTodo(id) {
    return this.firebaseCollection.doc(id).delete();
  }
}
