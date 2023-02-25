import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

    private baseURL = "http://localhost:8081/api-varejo/usuario/adcionar";
    private url = "http://localhost:8081/api-varejo/usuario";
 
    constructor(private http : HttpClient ) {}

    public listarUsuarios(): Observable<any> {
      return this.http.get<any>(this.url);
    }

    public listarPorId(id:number): Observable <Usuario>{
      return this.http.get<Usuario>(`${this.url}/${id}`);
    }
    
    public adcionarUsuario(usuario: Usuario): Observable <Object>{
      return this.http.post(`${this.baseURL}`, usuario);
    }

    public editarUsuario(id:number,usuario: Usuario): Observable<Object>{
      return this.http.put(`${this.url}/${id}`, usuario);
    }
    
    public removerUsuario(id:number):Observable <Object>{
      return this.http.delete(`${this.url}/${id}`);
    }
}
