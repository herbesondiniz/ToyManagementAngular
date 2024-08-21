import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Stock } from '@models/stock.model';
import { StockService } from '@services/stock.service';
import { CommonModule } from '@angular/common';
import { ToyService } from '@services/toy.service';
import { Toy } from '@models/toy.model';

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.css'
})
export class StockFormComponent {
  toys: Toy[] = [];
  stock: Stock = { id: 0, toyId: 0, quantity: 0 };
  toyName: string = '';

  constructor(
    private stockService: StockService,
    private toyService: ToyService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadToys();
  }

  loadToys() {
    this.toyService.getAll().subscribe(toys => {
      this.toys = toys;
    });
  }

  onToyIdChange() {
    const selectedToy = this.toys.find(toy => toy.id === this.stock.toyId);
    this.toyName = selectedToy ? selectedToy.name : '';
  }

  onSubmit() {
    this.stockService.create(this.stock).subscribe(() => {
      this.router.navigate(['/stocks']);
    });    
  }
}
