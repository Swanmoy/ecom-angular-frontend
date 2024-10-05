import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  data: any;

  ngOnInit(): void {
    this.adminService.getAnalytics().subscribe((resp) => {
      this.data = resp;
      console.log(this.data);
    });
  }
}
