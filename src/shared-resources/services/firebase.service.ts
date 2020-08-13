import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FireBaseService {

    constructor(private storage: AngularFireStorage) { }

    uploadImage(file: File, path: string): Promise<firebase.storage.UploadTaskSnapshot> {
        const metaData = { contentType: file.type };
        const imgPath = `viewpoint-poll/${path}`;
        const storageRef = this.storage.ref(imgPath);
        return storageRef.put(file, metaData).snapshotChanges().pipe(finalize(() => storageRef.getDownloadURL())).toPromise();
    }
}
