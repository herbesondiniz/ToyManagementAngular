import { Component, OnInit  } from '@angular/core';
import { ToyService } from '@services/toy.service';
import {Toy} from '@models/toy.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toy-list',
  standalone: true,
  imports: [RouterModule,CommonModule], 
  templateUrl: './toy-list.component.html',
  styleUrl: './toy-list.component.css'
})
export class ToyListComponent implements OnInit{
  toys: Toy[] = [];

  constructor(private toyService: ToyService) {}

  ngOnInit(): void {
    this.loadToys();
  }

  loadToys(): void {
    this.toyService.getAll().subscribe({
      next: (data: Toy[]) => {
        this.toys = data;
        console.log('Dados recebidos:', data); 
      },
      error: (err) => {
        console.error('Erro ao carregar brinquedos', err);
      }
    });
  }

  deleteToy(id: number): void {
    this.toyService.delete(id).subscribe(() => {
      this.loadToys();
    });
  }

}
