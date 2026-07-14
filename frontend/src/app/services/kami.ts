import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KamiData } from '../models/kami.model';

@Injectable({
  providedIn: 'root',
})
export class Kami {
  private apiUrl = 'http://127.0.0.1:8000/kami';

  constructor(private http: HttpClient) {}

  getAllKami(): Observable<KamiData[]> {
    return this.http.get<KamiData[]>(this.apiUrl + '/');
  }

  getKami(id: number): Observable<KamiData> {
    return this.http.get<KamiData>(`${this.apiUrl}/${id}`);
  }
}