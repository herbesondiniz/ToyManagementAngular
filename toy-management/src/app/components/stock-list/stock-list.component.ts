import { Component,OnInit } from '@angular/core';
import { StockService } from '@services/stock.service';
import { Stock } from '@models/stock.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit{
  
  stocks: Stock[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.stockService.getAll().subscribe(stocks => this.stocks = stocks);
  }
  deleteStock(id: number): void {
    if (confirm('Are you sure you want to delete this stock?')) {
      this.stockService.delete(id).subscribe(() => {``        
        this.stocks = this.stocks.filter(stock => stock.id !== id);
      });
    }
  }
}
