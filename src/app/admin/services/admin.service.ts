import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  BASIC_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(this.BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllCategories(): Observable<any> {
    return this.http.get(this.BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post(this.BASIC_URL + 'api/admin/product', productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(this.BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.BASIC_URL + 'api/admin/products', {
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(this.BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  addCoupon(couponDto: any): Observable<any> {
    return this.http.post(this.BASIC_URL + 'api/admin/coupons', couponDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getCoupons(): Observable<any> {
    return this.http.get(this.BASIC_URL + 'api/admin/coupons', {
      headers: this.createAuthorizationHeader(),
    });
  }
  getPlacedOrders(): Observable<any> {
    return this.http.get(this.BASIC_URL + 'api/admin/placedOrders', {
      headers: this.createAuthorizationHeader(),
    });
  }
  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(
      this.BASIC_URL + `api/admin/order/${orderId}/${status}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
