import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Lancamentos } from '../models/lancamentos';

@Injectable({
    providedIn: 'root'
})

export class LancamentoService {

private url = "http://localhost:8081/api-varejo/movimentos";

constructor(private http : HttpClient ) {}

public listarLancamentos(): Observable<any> {
  return this.http.get<any>(this.url);
}

public listarPorId(id:number): Observable <Lancamentos>{
  return this.http.get<Lancamentos>(`${this.url}/${id}`);
}

public adcionarLancamento(lancamento: Lancamentos): Observable <Object>{
  return this.http.post(`${this.url}`, lancamento);
}

public removerLancamento(id:number):Observable <Object>{
  return this.http.delete(`${this.url}/${id}`);
}

}