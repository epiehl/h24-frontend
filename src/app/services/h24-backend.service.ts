import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Wishlist} from '../models/wishlist';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class H24BackendService {
  constructor(private http: HttpClient) {}
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
      return of(result as T);
    };
  }
}
