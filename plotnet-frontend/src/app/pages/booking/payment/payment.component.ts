import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingService } from '../../../core/services/booking.service';

type PaymentMethod = 'CARD' | 'UPI';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit, OnDestroy {
  bookingId = 0;
  plotTitle = '';
  plotPrice = 0;

  method: PaymentMethod = 'CARD';
  cardForm: FormGroup;
  upiForm: FormGroup;
  processing = false;
  error = '';

  private paymentSub?: Subscription;
  private delayTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {
    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      expiry:     ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv:        ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      nameOnCard: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.upiForm = this.fb.group({
      upiId: ['', [Validators.required, Validators.pattern(/^[\w.\-]+@[\w]+$/)]],
    });
  }

  ngOnInit(): void {
    this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    this.plotTitle  = this.route.snapshot.queryParamMap.get('plotTitle') ?? 'Plot';
    this.plotPrice  = Number(this.route.snapshot.queryParamMap.get('plotPrice') ?? 0);
  }

  ngOnDestroy(): void {
    clearTimeout(this.delayTimer);
    this.paymentSub?.unsubscribe();
  }

  setMethod(m: PaymentMethod): void {
    this.method = m;
    this.error = '';
  }

  formatCardInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    input.value = val;
    this.cardForm.get('cardNumber')!.setValue(val, { emitEvent: false });
  }

  formatExpiryInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
    input.value = val;
    this.cardForm.get('expiry')!.setValue(val, { emitEvent: false });
  }

  pay(): void {
    const activeForm = this.method === 'CARD' ? this.cardForm : this.upiForm;
    if (activeForm.invalid) {
      activeForm.markAllAsTouched();
      return;
    }

    this.processing = true;
    this.error = '';

    const transactionId = 'TXN' + Date.now() + Math.random().toString(36).substring(2, 6).toUpperCase();

    this.delayTimer = setTimeout(() => {
      this.paymentSub = this.bookingService
        .processPayment(this.bookingId, transactionId, this.plotPrice)
        .subscribe({
          next: () => this.navigateToSuccess(transactionId),
          error: () => {
            this.processing = false;
            this.error = 'Payment could not be processed. Please try again.';
            this.cdr.detectChanges();
          },
        });
    }, 2000);
  }

  private navigateToSuccess(transactionId: string): void {
    this.router.navigate(['/booking/success'], {
      queryParams: {
        bookingId:     this.bookingId,
        plotTitle:     this.plotTitle,
        plotPrice:     this.plotPrice,
        transactionId: transactionId,
        paymentDate:   new Date().toISOString(),
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  }
}
