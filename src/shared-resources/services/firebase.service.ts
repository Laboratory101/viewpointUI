import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { last, map, flatMap } from 'rxjs/operators';
import firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class FireBaseService {

    constructor(private storage: AngularFireStorage) { }

    uploadImage(file: File, path: string): Observable<string> {
        const metaData = { contentType: file.type };
        const imgPath = `viewpoint-poll/${path}`;
        const storageRef = this.storage.ref(imgPath);
        const task = this.storage.upload(imgPath, file, metaData);
        return task.snapshotChanges().pipe(last(),
            flatMap(() => storageRef.getDownloadURL().pipe(map(url => url)))) as Observable<string>;
    }

    async deleteImage(path: string): Promise<void> {
        try {
            const data = await firebase.storage().ref(`viewpoint-poll/${path}`).listAll();
            data.items.forEach(async (item: firebase.storage.Reference) => {
                await this.storage.storage.ref(item['location']['path']).delete();
            });
            return Promise.resolve();
        }
        catch (err) {
            return await Promise.reject();
        }
    }
}
