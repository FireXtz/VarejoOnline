import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { Usuario } from '../models/usuario';
import { PerfilService } from '../services/perfil.service';
import { UsuarioService } from '../services/usuarios.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html'
})
export class CadastrarUsuarioComponent implements OnInit {

  visualizarModal:boolean;

  perfil:Perfil[];

  usuario: Usuario = new Usuario;

  items:any = [];

  constructor(
    private perfilService:PerfilService,
    private usuarioService:UsuarioService,
    private router:Router) {

    this.items = [
        {label: 'Cadastro de Usuarios'},
        {label: 'Pesquisa', routerLink: '/usuarios'},
    ];
  }

  ngOnInit(): void {
    this.usuarioIsPresent();
    this.listarPerfis();
  }

  usuarioIsPresent(){
    this.usuario.perfil = new Perfil();
  }

  navegarParaUsuarios(){
    this.router.navigate(['/usuarios'])
  }

  AbrirModal() {
    this.visualizarModal = true;
  }

  clickEventModalPesquisar(event) {
    if (event.detail === 1) {
      setTimeout(() => {
      }, 100)

    }
  }
  listarPerfis(){
    this.perfilService.listarPerfis()
    .subscribe((data =>{
      this.perfil =data;
      console.log(this.perfil)
    }))
  }

  adcionarUsuario(){
    this.usuarioService.adcionarUsuario(this.usuario)
    .subscribe(()=>{
       this.handlerSucceso();
       this.navegarParaUsuarios()
       this.usuario = new Usuario();
    },
    () => this.handlerSucceso())
  }

  
  handler(){
    Swal.fire(
      'Erro de processamento!',
      'Não foi possível realizar a operação atual!!!',
      'error'
    )
  }

  handlerSucceso(){
    Swal.fire(
      'Sucesso!!!',
      'Usuario Cadastrado com sucesso, redirecionado para o menu de Usuarios!!!',
      'success'
    )
  }

}
