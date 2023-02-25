import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-cadastro-perfil',
  templateUrl: './cadastro-perfil.component.html'
})
export class CadastroPerfilComponent implements OnInit {
  items:any = [];
  perfil:Perfil = new Perfil();

  constructor(private perfilService:PerfilService,private router:Router) { 
    this.items = [
      {label: 'Cadastro de Perfil'},
      {label: 'Pesquisa', routerLink: '/perfil'},
    ];
  }

  ngOnInit(): void {
  }
   redirectPerfil(){
    this.router.navigate(['/perfil'])
  }

  adcionarPerfil(){
    this.perfilService.adcionarPerfil(this.perfil)
    .subscribe(()=>{
       this.sucessoAoRemoverPerfil();
       this.redirectPerfil()
       this.perfil = new Perfil();
    },
    () => this.handlerPerfil())
  }
  
  handlerPerfil(){
    Swal.fire(
      'Erro de processamento!',
      'Não foi possível realizar a operação atual, Ja possui um cadastro com o nome atual!!!',
      'error'
    )
  }

  sucessoAoRemoverPerfil(){
    Swal.fire(
      'Sucesso!!!',
      'Perfil Removido com sucesso',
      'success'
    )
  }

}
