import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../models/produtos';
import { ProdutoService } from '../services/produto.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html'
})
export class CadastroProdutoComponent implements OnInit {
  items:any = [];
  produto:Produto = new Produto();

  constructor(private produtosService:ProdutoService,private router:Router) { 
    this.items = [
      {label: 'Cadastro de Produtos'},
      {label: 'Pesquisa', routerLink: '/produtos'},
    ];
  }

  redirectProduto(){
    this.router.navigate(['/produtos'])
  }

  adcionarProduto(){
    this.produtosService.adcionarProduto(this.produto)
    .subscribe(()=>{
       this.sucessoAoCadastrarProduto();
       this.redirectProduto()
       this.produto = new Produto();
    },
    () => this.handlerProduto())
  }
  

  handlerProduto(){
    Swal.fire(
      'Erro de processamento!',
      'Não foi possível realizar a operação atual verifique se o saldo é maior do que a quantidade disponível!!!',
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
 ngOnInit(): void {}

}
