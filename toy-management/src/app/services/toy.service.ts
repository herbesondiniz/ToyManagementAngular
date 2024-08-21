import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Toy } from '@models/toy.model'


@Injectable({
  providedIn: 'root'
})
export class ToyService {
  
  private apiUrl = 'http://localhost:5081/Toys';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Toy[]> {
    return this.http.get<Toy[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Toy> {
    return this.http.get<Toy>(`${this.apiUrl}/${id}`);
  }

  create(toy: Toy): Observable<Toy> {
    return this.http.post<Toy>(this.apiUrl, toy);
  }

  update(id: number, toy: Toy): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, toy);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
