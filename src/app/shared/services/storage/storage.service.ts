import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageSub = new Subject<String>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    console.log(key);
    console.log(data);
    
    localStorage.setItem(key, data);
    this.storageSub.next(key);
  }

  getItem(key: any) {
    return localStorage.getItem(key);
  }

  removeItem(key: any) {
    localStorage.removeItem(key);
    this.storageSub.next(key);
  }

  constructor() { }
}
