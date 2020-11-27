import { Component, OnInit } from '@angular/core';
import {H24BackendService} from '../../services/h24-backend.service';
import {Wishlist} from '../../models/wishlist';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})
export class WishlistListComponent implements OnInit {
  wishlists: Wishlist[];
  columnsToDisplay = ['id'];
  wishlistName: string;
  constructor(private h24Backend: H24BackendService) { }
  loadWishlists(): void {
    this.h24Backend.getAllWishlists().subscribe(list => {
      this.wishlists = list;
    });
  }
  addNewWishlist(name: string): void {
    this.h24Backend.addWishlist(name).subscribe(() => {
      this.wishlists = [];
      this.loadWishlists();
    });
  }
  ngOnInit(): void {
    this.loadWishlists();
  }

}
