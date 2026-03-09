import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-success',
  standalone: false,
  templateUrl: './booking-success.component.html',
})
export class BookingSuccessComponent implements OnInit {
  bookingId = '';
  plotTitle = '';
  plotPrice = 0;
  transactionId = '';
  paymentDate = '';
  today = new Date();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap;
    this.bookingId     = q.get('bookingId')     ?? '';
    this.plotTitle     = q.get('plotTitle')      ?? 'your plot';
    this.plotPrice     = Number(q.get('plotPrice')  ?? 0);
    this.transactionId = q.get('transactionId')  ?? '';
    this.paymentDate   = q.get('paymentDate')    ?? new Date().toISOString();

    if (this.bookingId && this.transactionId) {
      const receiptKey = `plotnet_receipt_${this.bookingId}`;
      localStorage.setItem(receiptKey, JSON.stringify({
        transactionId: this.transactionId,
        plotTitle:     this.plotTitle,
        plotPrice:     this.plotPrice,
        paymentDate:   this.paymentDate,
      }));
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  }

  downloadReceipt(): void {
    window.print();
  }
}
