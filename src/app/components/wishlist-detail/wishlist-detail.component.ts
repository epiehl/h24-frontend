import {Component, Inject, OnInit} from '@angular/core';
import {H24BackendService} from '../../services/h24-backend.service';
import {Wishlist} from '../../models/wishlist';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Item} from '../../models/item';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.component.html',
  styleUrls: ['./wishlist-detail.component.css']
})
export class WishlistDetailComponent implements OnInit {
  constructor(private h24Backend: H24BackendService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              @Inject(DOCUMENT) private document: Document) { }
  wishlist: Observable<Wishlist>;
  items: Item[] = [];
  addSku: number;
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
  removeWishlist(): void {
    this.wishlist.subscribe(list => {
      this.h24Backend.removeWishlist(list.id).subscribe(() => {
        this.router.navigate(['/wishlist']);
      });
    });
  }
  gotoShopLink(link: string): void {
    this.document.location.href = 'https://www.home24.de/' + link;
  }
  getSavings(item: Item): number {
    return 100 - Math.ceil((100 / item.retail_price) * item.outlet_price);
  }
  openCreateModal(content): void {
    this.modalService.open(content).result.then(() => {
      this.addItem(this.addSku);
      this.addSku = null;
    });
  }
  openDeleteItemModal(content, sku: number): void {
    this.modalService.open(content).result.then(() => {
      this.deleteItem(sku);
    });
  }
  ngOnInit(): void {
    this.loadData();
  }
}
