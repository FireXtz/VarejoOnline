import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from '../models/produtos';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})

export class PerfilService {

    private baseURL = "http://localhost:8081/api-varejo/perfil/adcionar";
    private url = "http://localhost:8081/api-varejo/perfil";
 
    constructor(private http : HttpClient ) {}

    public listarPerfis(): Observable<any> {
      return this.http.get<any>(this.url);
    }

    public listarPorId(id:number): Observable <Perfil>{
      return this.http.get<Perfil>(`${this.url}/${id}`);
    }
    
    public adcionarPerfil(perfil: Perfil): Observable <Object>{
      return this.http.post(`${this.baseURL}`, perfil);
    }

    public editarPerfil(id:number,perfil: Perfil): Observable<Object>{
      return this.http.put(`${this.url}/${id}`, perfil);
    }
    
    public removerPerfil(id:number):Observable <Object>{
      return this.http.delete(`${this.url}/${id}`);
    }
}
