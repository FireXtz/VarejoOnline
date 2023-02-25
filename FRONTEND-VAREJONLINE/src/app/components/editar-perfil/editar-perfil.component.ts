import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../services/perfil.service';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html'
})
export class EditarPerfilComponent implements OnInit {
  items:any = [];
  id:number
  perfil:Perfil = new Perfil();
  constructor(private activeRoute:ActivatedRoute,private router:Router,private perfilService:PerfilService) { 
    this.items = [
      {label: 'Cadastro de Perfil'},
      {label: 'Pesquisa', routerLink: '/perfil'},
    ];
  }

  ngOnInit(): void {
    this.buscarPorId();
  }

  buscarPorId(){
    this.id = this.activeRoute.snapshot.params['id'];
    this.perfilService.listarPorId(this.id)
    .subscribe(data =>{
      this.perfil = data;
    }), error => console.log(error)
  }

  redirect(){
    this.router.navigate(['/perfil'])
  }

  editarPerfil(){
    this.perfilService.editarPerfil(this.id,this.perfil).subscribe(data => {
      this.redirect();
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
