import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap, last, map, flatMap } from 'rxjs/operators';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

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
}
