import {Component, OnInit} from '@angular/core';
import {Item} from '../../../models/item';
import {ActivatedRoute} from '@angular/router';
import {H24BackendService} from '../../../services/h24-backend.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Observable<Item>;

  constructor(private route: ActivatedRoute, private h24Backend: H24BackendService) {
  }

  ngOnInit(): void {
    this.item = this.h24Backend.getItemBySKU(+this.route.snapshot.paramMap.get('sku'));
  }

}
