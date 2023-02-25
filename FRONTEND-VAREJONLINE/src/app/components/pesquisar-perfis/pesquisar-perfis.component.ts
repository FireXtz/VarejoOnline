import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-pesquisar-perfis',
  templateUrl: './pesquisar-perfis.component.html'
})
export class PesquisarPerfisComponent implements OnInit {
  perfil:Perfil[]

  constructor(private perfilService:PerfilService,private router:Router) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  redirectPerfil(){
    this.router.navigate(['/perfil/cadastro'])
  }

  listarTodos(){
    this.perfilService.listarPerfis().subscribe((data =>{
      this.perfil = data;
      console.log(this.perfil)
    }))
  }

  removerPerfil(id: number) {
    this.perfilService.removerPerfil(id).subscribe(
      (data) => {
        this.sucessoAoRemoverPerfil();
        this.redirectPerfil();
        this.ngOnInit();
      },() => this.handlerPerfil()

    );
  }

  handlerPerfil(){
    Swal.fire(
      'Erro de processamento!',
      'Não foi possível realizar a operação atual, Perfil atual esta em uso não pode remover!!!',
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
