import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from '../models/produtos';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

    private baseURL = "http://localhost:8081/api-varejo/produto/adcionar";
    private url = "http://localhost:8081/api-varejo/produto";
 
    constructor(private http : HttpClient ) {}

    public listarProdutos(): Observable<any> {
      return this.http.get<any>(this.url);
    }

    public listarPorId(id:number): Observable <Produto>{
      return this.http.get<Produto>(`${this.url}/${id}`);
    }
    
    public adcionarProduto(produto: Produto): Observable <Object>{
      return this.http.post(`${this.baseURL}`, produto);
    }

    public editarProduto(id:number,produto: Produto): Observable<Object>{
      return this.http.put(`${this.url}/${id}`, produto);
    }
    
    public removerProduto(id:number):Observable <Object>{
      return this.http.delete(`${this.url}/${id}`);
    }
}
