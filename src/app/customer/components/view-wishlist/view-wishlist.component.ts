import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss'],
})
export class ViewWishlistComponent implements OnInit {
  products: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getWishlistByUserId();
  }
  getWishlistByUserId() {
    this.customerService.getWishlistByUserId().subscribe((res) => {
      res.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
      });
    });
  }
}
