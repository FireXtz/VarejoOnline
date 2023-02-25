import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[]

  constructor(private route:Router,private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  redirectUsuario(){
    this.route.navigate(['/usuario/cadastro'])
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe((data =>{
      this.usuarios = data;
      console.log(this.usuarios)
    }),
    )
  }

  removerUsuarios(id: number) {
    this.usuarioService.removerUsuario(id).subscribe(
      (data) => {
        this.sucessoAoRemoverLancamento();
        this.redirectUsuario();
        this.ngOnInit();
      },() => this.handleLancamentos()

    );
  }

  handleLancamentos(){
    Swal.fire(
      'Erro de processamento!',
      'Não foi possível realizar a operação atual!!!',
      'error'
    )
  }

  sucessoAoRemoverLancamento(){
    Swal.fire(
      'Sucesso!!!',
      'Usuario Removido com sucesso',
      'success'
    )
  }

}
