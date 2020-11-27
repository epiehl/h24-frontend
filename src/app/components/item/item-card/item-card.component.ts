import {Component, Inject, Input, OnInit} from '@angular/core';
import {Item} from '../../../models/item';
import {OAuthService} from 'angular-oauth2-oidc';
import {H24BackendService} from '../../../services/h24-backend.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Wishlist} from '../../../models/wishlist';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  wishlists: Wishlist[];
  selectedWishlist: Wishlist;
  showItemAddToast: boolean;

  constructor(
    private oauthService: OAuthService,
    private h24Backend: H24BackendService,
    private modalService: NgbModal,
    @Inject(DOCUMENT) public document: Document
  ) {
  }

  ngOnInit(): void {
  }

  gotoShopLink(link: string): void {
    this.document.location.href = 'https://www.home24.de/' + link;
  }

  openAddToWishlistModal(content, sku: number): void {
    this.h24Backend.getAllWishlists().subscribe(list => {
      this.wishlists = list;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        console.log(result);
        this.h24Backend.addItemToWishlist(this.selectedWishlist.id, sku).subscribe(r => {
          this.showItemAddToast = true;
        });
      }, ((reason) => {
        console.log(reason);
      }));
    });
  }

  getSavings(item: Item): number {
    return 100 - Math.ceil((100 / item.retail_price) * item.outlet_price);
  }

  get userEmail(): any {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    const emailKey = 'email';
    return claims[emailKey];
  }
}
