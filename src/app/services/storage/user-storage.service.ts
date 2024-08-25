import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  TOKEN = 'ecom-token';
  USER = 'ecom-user';
  constructor() {}
  public saveToken(token: string): void {
    window.localStorage.removeItem(this.TOKEN);
    window.localStorage.setItem(this.TOKEN, token);
  }
  public saveUser(user: any): void {
    window.localStorage.removeItem(this.USER);
    window.localStorage.setItem(this.USER, JSON.stringify(user));
  }
  static getToken(): string {
    return localStorage.getItem('ecom-token');
  }
  static getUser(): any {
    return JSON.parse(localStorage.getItem('ecom-user'));
  }
  static getUserId(): string {
    const user = this.getUser();
    if (user == null) return '';
    return user.userId;
  }
  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) return '';
    return user.role;
  }
  static isAdminLoggedIn(): boolean {
    if (this.getToken === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }
  static isCustomerLoggedIn(): boolean {
    if (this.getToken === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CUSTOMER';
  }
  static signOut() {
    window.localStorage.removeItem('ecom-token');
    window.localStorage.removeItem('ecom-user');
  }
}
