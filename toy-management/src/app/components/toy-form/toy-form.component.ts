import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToyService } from '@services/toy.service';
import { Toy } from '@models/toy.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toy-form', 
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toy-form.component.html',
  styleUrl: './toy-form.component.css'
})
export class ToyFormComponent implements OnInit  {
  toy: any = { name: '', description: '', price: 0 };
  isEdit: boolean = false; 

  constructor(
    private toyService: ToyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.toyService.getById(id).subscribe((data) => {
        this.toy = data;
      });
    }
  }

  saveToy(): void {
    if (this.isEdit) {
      this.toyService.update(this.toy.id, this.toy).subscribe(() => {
        this.router.navigate(['/toys']);
      });
    } else {
      this.toyService.create(this.toy).subscribe(() => {
        this.router.navigate(['/toys']);
      });
    }
  }
}
