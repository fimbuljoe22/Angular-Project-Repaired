import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoundsModel } from '../app/models/rounds-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/rounds';

  constructor(private http: HttpClient) { }

  getRounds(): Observable<RoundsModel[]> {
    return this.http.get<RoundsModel[]>(this.url);
  }

  addRound(reg: RoundsModel): Observable<RoundsModel> {
    return this.http.post<RoundsModel>(this.url, reg);
  }

  modifyRound(reg: RoundsModel): Observable<RoundsModel> {
    return this.http.put<RoundsModel>(`${this.url}/${reg.id}`, reg);
  }

  deleteRound(reg: RoundsModel): Observable<RoundsModel> {
    return this.http.delete<RoundsModel>(`${this.url}/${reg.id}`);
  }
}
