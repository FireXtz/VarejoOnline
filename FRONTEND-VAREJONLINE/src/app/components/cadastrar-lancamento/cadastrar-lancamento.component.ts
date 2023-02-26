import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Lancamentos } from '../models/lancamentos';
import { Produto } from '../models/produtos';
import { LancamentoService } from '../services/lancamento.service';
import { ProdutoService } from '../services/produto.service';
import { Cargo } from '../models/cargos';
import { TipoMovimentacao } from '../models/tipo_movimentacao';
import { Documento } from '../models/documento';

@Component({
  selector: 'app-cadastrar-lancamento',
  templateUrl: './cadastrar-lancamento.component.html'
})

export class CadastrarLancamentoComponent implements OnInit {

  visualizarModal:boolean;
  produtos:Produto[];
  items:any = [];
  novoLancamento:Lancamentos = new Lancamentos();

  cargo = Cargo;
  cargoKeyValue= [];

  tipoMovimentacao=TipoMovimentacao;
  tipoMovimentoKeyValue = [];

  documento = Documento;
  documentoKeyValue= [];
  
  
  constructor(private lancamentoService:LancamentoService,private produtoService:ProdutoService,private router:Router) { 

    this.cargoKeyValue = Object.keys(this.cargo);
    this.tipoMovimentoKeyValue = Object.keys(this.tipoMovimentacao);
    this.documentoKeyValue = Object.keys(this.documento);

    this.items = [
      {label: 'Lançamentos'},
      {label: 'Pesquisa', routerLink: '/lancamentos'},
  ];
}

  ngOnInit(): void {
    this.listarProdutos();
    this.produtoIsPresent();
  }

    produtoIsPresent(){
      this.novoLancamento.produto = new Produto();
  }

    listarProdutos(){
      this.produtoService.listarProdutos()
      .subscribe((data =>{
        this.produtos =data;
        console.log(this.produtos)
      }))
    }

    realizarLancamento(){
      this.lancamentoService.adcionarLancamento(this.novoLancamento)
      .subscribe(()=>{
         this.sucessoLancamentoCadastrado();
         this.redirectLancamentos()
         this.novoLancamento = new Lancamentos();
      },
      () => this.handlerLancamento())
    }

    clickEventModalPesquisar(event) {
      if (event.detail === 1) {
        setTimeout(() => {
        }, 100)
  
      }
    }

    AbrirModal() {
      this.visualizarModal = true;
    }

    redirectLancamentos(){
      this.router.navigate(['/lancamentos'])
    }
  

    handlerLancamento(){
      Swal.fire(
        'Erro de processamento!',
        'Não foi possível realizar a operação atual OPERADO não possui permissão para fazer movimentações de Saldo Inicial e Ajuste',
        'error'
      )
    }
  
    sucessoLancamentoCadastrado(){
      Swal.fire(
        'Sucesso!!!',
        'Produto Cadastrado com sucesso, redirecionado para o menu de produtos!!!',
        'success'
      )
    }

}
