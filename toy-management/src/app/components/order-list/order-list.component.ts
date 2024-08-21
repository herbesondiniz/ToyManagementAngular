import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '@services/order.service';
import { Order } from '@models/order.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null;

  @ViewChild('detailsModal') detailsModal!: ElementRef;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();    
  }

  loadOrders() {
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    });
  }

  openModal(order: Order) {
    this.selectedOrder = order;  
    const modalElement = this.detailsModal.nativeElement;
    modalElement.style.display = 'block';
    modalElement.classList.add('show');  
  }

  closeModal() {
    const modalElement = this.detailsModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show'); 
    this.selectedOrder = null;  
  }

  deleteOrder(id: number): void {
    this.orderService.delete(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }
}
