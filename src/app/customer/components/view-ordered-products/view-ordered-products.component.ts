import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.scss'],
})
export class ViewOrderedProductsComponent implements OnInit {
  orderId = this.activatedRouter.snapshot.params['orderId'];
  orderedProductsDetailsList = [];
  totalAmount: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private custoemrService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getOrderedProductsByOrderId();
  }

  getOrderedProductsByOrderId() {
    this.custoemrService.getOrderedProducts(this.orderId).subscribe((resp) => {
      resp.productDtoList.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.orderedProductsDetailsList.push(element);
      });
      this.totalAmount = resp.orderAmount;
    });
  }
}
