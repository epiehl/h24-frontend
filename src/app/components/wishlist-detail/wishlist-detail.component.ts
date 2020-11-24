import { Component, OnInit } from '@angular/core';
import {H24BackendService} from '../../services/h24-backend.service';
import {Wishlist} from '../../models/wishlist';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Item} from '../../models/item';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.component.html',
  styleUrls: ['./wishlist-detail.component.css']
})
export class WishlistDetailComponent implements OnInit {
  wishlist: Observable<Wishlist>;
  items: Item[] = [];
  addSku: number;
  constructor(private h24Backend: H24BackendService, private route: ActivatedRoute) { }
  getWishlist(): void {
    this.wishlist = this.h24Backend.getWishlist(+this.route.snapshot.paramMap.get('id'));
  }
  loadData(): void {
    this.items = [];
    this.getWishlist();
    this.wishlist.subscribe(list => {
      list.item_skus.forEach(sku => {
        this.h24Backend.getItemBySKU(sku).subscribe(item => this.items.push(item));
      });
    });
  }
  deleteItem(sku: number): void {
    this.h24Backend.deleteItemFromWishlist(
      +this.route.snapshot.paramMap.get('id'),
      sku
    ).subscribe(() => this.loadData());
  }
  addItem(sku: number): void {
    this.h24Backend.addItemToWishlist(
      +this.route.snapshot.paramMap.get('id'),
      sku
    ).subscribe(() => this.loadData());
  }
  ngOnInit(): void {
    this.loadData();
  }
}
