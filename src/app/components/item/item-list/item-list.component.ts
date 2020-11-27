import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../../models/item';
import {H24BackendService} from '../../../services/h24-backend.service';
import {DOCUMENT} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OAuthService} from 'angular-oauth2-oidc';
import {Params} from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit {
  page: number;
  limit: number;
  numItems: number;
  searchTerm: string;
  items: Item[];
  availableInOutletFilter: boolean;
  showItemAddToast: boolean;

  constructor(
    private route: ActivatedRoute,
    private h24: H24BackendService,
    private router: Router,
    private modalService: NgbModal,
    private h24Backend: H24BackendService,
    private oauthService: OAuthService,
    @Inject(DOCUMENT) public document: Document
  ) {
    this.availableInOutletFilter = true;
    this.showItemAddToast = false;
    this.limit = 12;
    this.page = 1;
    this.numItems = 100;
  }

  ngOnInit(): void {
    setTimeout(() => {
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.route.queryParamMap.subscribe(m => {
      this.page = +m.get('page') || 1;
      this.limit = +m.get('limit') || 12;
      this.searchTerm = m.get('searchTerm') || null;
      this.updateItems();
    });
  }

  updateItems(): void {
    this.h24.getItemsPaginated(this.limit, this.page, this.availableInOutletFilter).subscribe(itemList => {
      this.items = [];
      this.items = itemList.items;
      this.numItems = itemList.num_items;
      console.log(this.items);
    });
  }

  get userEmail(): any {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    const emailKey = 'email';
    return claims[emailKey];
  }

  processPageChange(page: number): void {
    console.log('page change');
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);

    const params = {
      page,
      limit: this.limit,
      searchTerm: this.searchTerm ? this.searchTerm : null
    };
    this.router.navigate(['items'], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }
}
