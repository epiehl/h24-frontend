import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Wishlist} from '../models/wishlist';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Item} from '../models/item';
import {OAuthStorage} from 'angular-oauth2-oidc';
import {ItemList} from '../models/itemlist';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class H24BackendService {
  constructor(private http: HttpClient, private router: Router) {}
  baseUrl = environment.apiUrl + '/api/v1';
  static logError(message: string): void {
    console.error(message);
  }
  addWishlist(name: string): Observable<Wishlist> {
    return this.http.post<Wishlist>(
      this.baseUrl + '/wishlist',
      {
        name
      }
    ).pipe(
      catchError(this.handleError<Wishlist>('addWishlist'))
    );
  }
  removeWishlist(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/wishlist/' + id).pipe(
      catchError(this.handleError<any>('removeWishlist'))
    );
  }
  getWishlist(id: number): Observable<Wishlist> {
    return this.http.get<Wishlist>(this.baseUrl + '/wishlist/' + id.toString()).pipe(
      catchError(this.handleError<Wishlist>('getWishlist'))
    );
  }
  getAllWishlists(): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.baseUrl + '/wishlist').pipe(
      catchError(this.handleError<Wishlist[]>('getAllWishlists'))
    );
  }
  getItemBySKU(sku: number): Observable<Item> {
    return this.http.get<Item>(this.baseUrl + '/item/' + sku).pipe(
      catchError(this.handleError<Item>('getItemBySKU'))
    );
  }
  getItemsPaginated(limit: number, page: number, availableInOutlet: boolean): Observable<ItemList> {
    let params = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('page', page.toString());
    if (availableInOutlet != null) {
      params = params.append('available_in_outlet', availableInOutlet.toString());
    }
    return this.http.get<ItemList>(this.baseUrl + '/item', {params}).pipe(
      catchError(this.handleError<Item>('getItemsPaginated'))
    );
  }
  deleteItemFromWishlist(id: number, sku: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/wishlist/' + id + '/item/' + sku).pipe(
        catchError(this.handleError<any>('deleteItemFromWishlist'))
    );
  }
  addItemToWishlist(id: number, sku: number): Observable<Item> {
    return this.http.post<Item>(this.baseUrl + '/wishlist/' + id + '/item/' + sku, {}).pipe(
      catchError(this.handleError<Item>('addItemToWishlist'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      H24BackendService.logError(`${operation} failed: ${error.message}`);
      if (error.status === 401) {
        this.router.navigate(['notloggedin']);
      }
      return of(result as T);
    };
  }
}
