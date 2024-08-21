import { Component,OnInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrderService } from '@services/order.service';
import { ToyService } from '@services/toy.service';
import { Order } from '@models/order.model';
import { Toy } from '@models/toy.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.css'
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  toys: Toy[] = [];
  orderId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toyService: ToyService
  ) {
    this.orderForm = this.fb.group({
      clientId: [null, Validators.required],
      items: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.loadToys();
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrder();
  }
  loadToys() {
    this.toyService.getAll().subscribe(toys => {
      this.toys = toys;
    });
  }

  loadOrder() {
    this.orderService.getById(this.orderId).subscribe(order => {
      this.orderForm.patchValue({
        clientId: order.clientId
      });
      order.items.forEach(item => {
        this.items.push(this.fb.group({
          toyId: [item.toyId, Validators.required],
          orderId:[item.orderId, Validators.required],
          quantity: [item.quantity, Validators.required],
          price: [item.price, Validators.required]
        }));
      });
    });
  }
  
  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      toyId: [null, Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required]
    });
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }
  onSubmit() {
    if (this.orderForm.invalid) {
      return;
    }

    const order: Order = this.orderForm.value;
    order.id = this.orderId; // Preserva o ID do pedido
    this.orderService.update(order.id,order).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }
}
