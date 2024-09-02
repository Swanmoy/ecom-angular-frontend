import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrls: ['./post-product-faq.component.scss'],
})
export class PostProductFaqComponent implements OnInit {
  productId: number = this.activatedRouter.snapshot.params['productId'];
  FAQForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.FAQForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    });
  }

  postFaq() {
    this.adminService
      .postFaq(this.productId, this.FAQForm.value)
      .subscribe((resp) => {
        if (resp.id != null) {
          {
            this.snackBar.open('FAQ postted successfully', 'Close', {
              duration: 5000,
            });
            this.router.navigateByUrl('/admin/dashboard');
          }
        } else {
          this.snackBar.open('Something went wrong!!!', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        }
      });
  }
}
