import { Component, OnInit } from '@angular/core';
import {H24BackendService} from '../../../services/h24-backend.service';
import {Wishlist} from '../../../models/wishlist';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.scss']
})
export class WishlistListComponent implements OnInit {
  wishlists: Wishlist[];
  closeResult = '';
  newWishlistName: string;
  constructor(private h24Backend: H24BackendService, private modalService: NgbModal) { }

  loadWishlists(): void {
    this.h24Backend.getAllWishlists().subscribe(list => {
      this.wishlists = list;
    });
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = result;
      this.h24Backend.addWishlist(this.newWishlistName).subscribe(() => {
        this.loadWishlists();
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.loadWishlists();
  }

}
