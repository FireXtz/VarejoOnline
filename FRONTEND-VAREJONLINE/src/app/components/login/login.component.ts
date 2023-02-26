import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginservice: AuthApiService
    ) { }

  email=''
  senha=''
  loginInvalido=true
  

  ngOnInit(): void {
    this.checkLogin
  }
    checkLogin() {
    (this.loginservice.autenticar(this.email, this.senha).subscribe(
      data => {
        this.router.navigate([''])
        this.loginInvalido = false
        console.log(data)
      },
      error => {
        this.loginInvalido = false
        console.log(error)

      }
    )
    );
  }
}
