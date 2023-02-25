import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produtos';
import { ProdutoService } from '../services/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html'
})
export class EditarProdutoComponent implements OnInit {

  items:any = [];
  id:number;
  produto:Produto = new Produto();

  constructor(private produtosService:ProdutoService,private router:Router,private activeRoute:ActivatedRoute) { 
    this.items = [
      {label: 'Cadastro de Produtos'},
      {label: 'Pesquisa', routerLink: '/produtos'},
    ];
  }

  buscarProdutoPorId(){
    this.id = this.activeRoute.snapshot.params['id'];
    this.produtosService.listarPorId(this.id)
    .subscribe(data =>{
      this.produto = data;
    }), error => console.log(error)
  }

  redirectProduto(){
    this.router.navigate(['/produtos'])
  }

  editarProduto(){
    this.produtosService.editarProduto(this.id,this.produto).subscribe(data => {
      this.redirectProduto();
    },
    () => this.handlerProduto())
  }

  handlerProduto(){
    Swal.fire(
      'Erro de processamento!',
      'Não  é Possivel Editar o Produto atual!!!',
      'error'
    )
  }

  sucessoAoCadastrarProduto(){
    Swal.fire(
      'Sucesso!!!',
      'Produto Cadastrado com sucesso, redirecionado para o menu de produtos!!!',
      'success'
    )
  }
 ngOnInit(): void {
  this.buscarProdutoPorId();
 }
}
