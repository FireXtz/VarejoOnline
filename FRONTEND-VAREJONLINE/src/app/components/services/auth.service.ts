import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { map } from "rxjs";

export class Usuario {
    constructor(public status:string){}
}


@Injectable({
    providedIn: "root"
  })

  export class AuthApiService {
    
    constructor(private http: HttpClient) {}
    
    public autenticar(email,senha){
        return this.http
        .post<any>("http://localhost:8081/authenticate",{email,senha})
        .pipe(map(responseData => {
            sessionStorage.setItem("email",email);
            let jwttoken = "Bearer " + responseData.jwttoken;
            console.log(jwttoken)
            sessionStorage.setItem("jwttoken",jwttoken);
            return responseData;
        }))
    }
    public usuaroIfExist(){
        const email = sessionStorage.getItem("email");
        console.log(!(email == null));
        return !(email ===null);
    }

    public sair(){
        sessionStorage.removeItem("email");
    }
  }