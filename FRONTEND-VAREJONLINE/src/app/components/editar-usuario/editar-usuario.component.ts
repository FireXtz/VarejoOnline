import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../models/perfil';
import { Usuario } from '../models/usuario';
import { PerfilService } from '../services/perfil.service';
import { UsuarioService } from '../services/usuarios.service';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html'
})
export class EditarUsuarioComponent implements OnInit {
  visualizarModal:boolean;

  perfil:Perfil[];

  id: number;

  usuario: Usuario = new Usuario;

  items:any = [];

  constructor(
    private perfilService:PerfilService,
    private usuarioService:UsuarioService,
    private router:Router,
    private activeRoute:ActivatedRoute) {

    this.items = [
        {label: 'Edição de Usuarios'},
        {label: 'Pesquisa', routerLink: '/usuarios'},
    ];
    
  }

  ngOnInit(): void {
    this.usuarioIsPresent();
    this.listarPerfis();
    this.findById();
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

  fixNull(usuario:Usuario){
    if (!usuario.perfil)
    this.usuario.perfil = new Perfil();   
  }

  findById(){
    this.id = this.activeRoute.snapshot.params['id'];
    this.usuarioService.listarPorId(this.id)
    .subscribe(data =>{
      this.usuario = data;
      this.fixNull(this.usuario);
      console.log(data)
    }), error => console.log(error)
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
