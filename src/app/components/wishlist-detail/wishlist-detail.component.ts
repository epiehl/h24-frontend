import { Component, OnInit } from '@angular/core';
import {H24BackendService} from '../../services/h24-backend.service';
import {Wishlist} from '../../models/wishlist';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Item} from '../../models/item';
import {map} from 'rxjs/operators';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WishlistListComponent} from '../wishlist-list/wishlist-list.component';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.component.html',
  styleUrls: ['./wishlist-detail.component.css']
})
export class WishlistDetailComponent implements OnInit {
  constructor(private h24Backend: H24BackendService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) { }
  wishlist: Observable<Wishlist>;
  items: Item[] = [];
  addSku: number;
  closeResult = '';
  static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
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
  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        console.log('Result: ' + result);
        this.removeWishlist();
      }, (reason => {
        console.log('Reason: ' + WishlistDetailComponent.getDismissReason(reason));
      })
    );
  }
  ngOnInit(): void {
    this.loadData();
  }
}
