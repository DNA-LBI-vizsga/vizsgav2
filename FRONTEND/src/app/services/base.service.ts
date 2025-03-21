import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private apiUrl = 'http://localhost:3000/leltar'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // User management

  loginUser(userEmail: string, userPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userEmail, userPassword });
  }

  firstLogin(userPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/firstLogin`, { userPassword }, { headers: this.getAuthHeaders() });
  }

  passwordChange(userEmail: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/passwordChange`, { userEmail });
  }

  registerUser(userEmail: string, userPassword: string, isAdmin: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { userEmail, userPassword, isAdmin });
  }

  // Storage place management

  getStoragePlaces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/storagePlace`, { headers: this.getAuthHeaders() });
  }

  createStoragePlace(storage: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/storagePlace`, { storage }, { headers: this.getAuthHeaders() });
  }

  deleteStoragePlace(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/storagePlace/${id}`, { headers: this.getAuthHeaders() });
  }

  // Item name management

  getItemNames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/itemName`, { headers: this.getAuthHeaders() });
  }

  createItemName(item: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/itemName`, { item }, { headers: this.getAuthHeaders() });
  }

  deleteItemName(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/itemName/${id}`, { headers: this.getAuthHeaders() });
  }

  // Item management

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/item`, { headers: this.getAuthHeaders() });
  }

  createItem(itemNameId: number, storagePlaceId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/item`, { itemNameId, storagePlaceId, quantity }, { headers: this.getAuthHeaders() });
  }

  updateItem(itemIdList: number[], storagePlaceId:  number, newStoragePlaceId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/item`, { itemIdList, storagePlaceId, newStoragePlaceId }, { headers: this.getAuthHeaders() });
  }

  deleteItem(itemIdList: number[], storagePlaceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item`, {
      headers: this.getAuthHeaders(),
      body: { itemIdList, storagePlaceId }
    });
  }

  // Log management

  downloadLogs(): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/log`, {}, { headers: this.getAuthHeaders(), responseType: 'blob' });
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BaseService {
//   private apiUrl = 'http://localhost:3000/leltar'; // Adjust the base URL as needed

//   constructor(private http: HttpClient) {}

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('authToken');
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   //User management

//   loginUser(userEmail: string, userPassword: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, { userEmail, userPassword });
//   }

//   firstLogin(userPassword: string): Observable<any> {
//     return this.http.put(`${this.apiUrl}/firstLogin`, {userPassword}, { headers: this.getAuthHeaders() });
//   }

//   passwordChange(userEmail:string) : Observable<any> {
//     return this.http.put(`${this.apiUrl}/passwordChange`, {userEmail});
//   }

//   registerUser(userEmail: string, userPassword: string, isAdmin: boolean): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, { userEmail, userPassword, isAdmin });
//   }

//   //Storage place management

//   getStoragePlaces(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/storagePlace`, { headers: this.getAuthHeaders() });
//   }

//   createStoragePlace(storage: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/storagePlace`, { storage }, { headers: this.getAuthHeaders() });
//   }

//   deleteStoragePlace(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/storagePlace/${id}`, { headers: this.getAuthHeaders() });
//   }

//   //Item name management

//   getItemNames(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/itemName`, { headers: this.getAuthHeaders() });
//   }

//   createItemName(item: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/itemName`, { item }, { headers: this.getAuthHeaders() });
//   }

//   deleteItemName(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/itemName/${id}`, { headers: this.getAuthHeaders() });
//   }

//   updateItemName(id: number, item: string): Observable<any> {
//     return this.http.put(`${this.apiUrl}/itemName/${id}`, { item }, { headers: this.getAuthHeaders() });
//   }

//   //Item management

//   getItems(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/item`, { headers: this.getAuthHeaders() });
//   }

//   createItem(itemNameId: number, storagePlaceId: number, quantity: number ,description: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/item`, { itemNameId, storagePlaceId, quantity,description}, { headers: this.getAuthHeaders() });
//   }

//   updateItem(storagePlaceId:number,itemNameId: number,newStoragePlaceId: number,description:string,quantity:number): Observable<any> {
//     return this.http.put(`${this.apiUrl}/item`, { storagePlaceId, itemNameId,newStoragePlaceId, description, quantity }, { headers: this.getAuthHeaders() });
//   }

//   deleteItem(itemNameId: number, storagePlaceId:number, description:string, quantity:number): Observable<any> {
//     return this.http.patch(`${this.apiUrl}/item`, {itemNameId, storagePlaceId, description, quantity}, { headers: this.getAuthHeaders() });
//   }

//   //Log write to file

//   downloadLogs(): Observable<any> {
//     return this.http.post(`${this.apiUrl}/log`, {} ,{ headers: this.getAuthHeaders(),responseType: 'blob'});
//   }
// }