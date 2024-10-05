import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss'],
})
export class ViewProductDetailComponent implements OnInit {
  productId: number = this.activatedRoute.snapshot.params['productId'];
  product!: any;
  FAQS: any[] = [];
  reviews: any[] = [];

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.getProductDetailById();
  }

  ngOnInit(): void {}

  getProductDetailById() {
    this.customerService
      .getProductDetailsById(this.productId)
      .subscribe((resp) => {
        this.product = resp.productDto;
        this.product.processedImg =
          'data:image/jpeg;base64,' + resp.productDto.byteImg;
        this.FAQS = resp.faqDtoList;
        resp.reviewDtoList.forEach((element) => {
          element.processedImg =
            'data:image/jpeg;base64,' + element.returnedImg;
          this.reviews.push(element);
        });
      });
    console.log(this.reviews);
  }

  addToWishlist() {
    const wishlistDto = {
      userId: UserStorageService.getUserId(),
      productId: this.productId,
    };
    this.customerService.addProductToWishlist(wishlistDto).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackBar.open('Product Added to Wishlist Successsfully', 'Close', {
          duration: 5000,
        });
      } else {
        this.snackBar.open('Something Went Wrong!', 'ERROR', {
          duration: 5000,
        });
      }
    });
  }
}
