import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { OrderService } from '@services/order.service';
import { ToyService } from '@services/toy.service';
import { Order } from '@models/order.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Toy } from '@models/toy.model'; 

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
    orderForm: FormGroup;
    toys: Toy[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private toyService: ToyService
   ) {
      this.orderForm = this.fb.group({
        clientId: [null, Validators.required],
        items: this.fb.array([this.createItem()])
      });
    }
    
    ngOnInit(): void {
      this.loadToys();
    }

    loadToys() {
      this.toyService.getAll().subscribe(toys => {
        this.toys = toys;
      });
    }
    
    get items(): FormArray {
      return this.orderForm.get('items') as FormArray;
    }
  
    createItem(): FormGroup {
      return this.fb.group({
        toyId: [null, Validators.required],
        quantity: [null, Validators.required],
        price: [null, Validators.required]
      });
    }
  
    addItem() {
      this.items.push(this.createItem());
    }
  
    removeItem(index: number) {
      this.items.removeAt(index);
    }
  
    onSubmit() {
      if (this.orderForm.invalid) {
        return;
      }
  
      const order: Order = this.orderForm.value;
      this.orderService.create(order).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }

}
