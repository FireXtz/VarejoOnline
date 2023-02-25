import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../models/produtos';
import { ProdutoService } from '../services/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pesquisar-produtos',
  templateUrl: './pesquisar-produtos.component.html'
})
export class PesquisarProdutosComponent implements OnInit {

  produtos: Produto[]
  constructor(private produtoService:ProdutoService,private router:Router) { }

  ngOnInit(): void {
    this.listarTodosProdutos()
  }

  redirectProduto(){
    this.router.navigate(['/produtos/cadastro'])
  }

  listarTodosProdutos(){
    this.produtoService.listarProdutos().subscribe((data =>{
      this.produtos = data;
      console.log(this.produtos)
    }))
  }

  removerProduto(id: number) {
    this.produtoService.removerProduto(id).subscribe(
      (data) => {
        this.sucessoAoRemoverProduto();
        this.redirectProduto();
        this.ngOnInit();
      },() => this.handlerProdutoEmUso()

    );
  }

  handlerProduto(){
    Swal.fire(
      'Erro de processamento!',
      'Não foi possível realizar a operação atual!!!',
      'error'
    )
  }

  handlerProdutoEmUso(){
    Swal.fire(
      'Erro de processamento!',
      'Não foi possível remover o produto, produto em uso',
      'error'
    )
  }
  sucessoAoRemoverProduto(){
    Swal.fire(
      'Sucesso!!!',
      'Produto Removido com sucesso',
      'success'
    )
  }

}
