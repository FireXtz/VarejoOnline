import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Lancamentos } from '../models/lancamentos';
import { Produto } from '../models/produtos';
import { LancamentoService } from '../services/lancamento.service';
import { ProdutoService } from '../services/produto.service';
import { Cargo } from '../models/cargos';
import { TipoMovimentacao } from '../models/tipo_movimentacao';
import { Documento } from '../models/documento';
@Component({
  selector: 'app-detalhes-lancamentos',
  templateUrl: './detalhes-lancamentos.component.html'
})
export class DetalhesLancamentosComponent implements OnInit {
  id: number
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

  constructor(private activeRoute:ActivatedRoute,private lancamentoService:LancamentoService,private produtoService:ProdutoService,private router:Router) {

    this.cargoKeyValue = Object.keys(this.cargo);
    this.tipoMovimentoKeyValue = Object.keys(this.tipoMovimentacao);
    this.documentoKeyValue = Object.keys(this.documento);

    this.items = [
      {label: 'Lançamentos'},
      {label: 'Pesquisa', routerLink: '/lancamentos'},
  ];
   }

  ngOnInit(): void {
    this.produtoIsPresent();
    this.buscarPorId();
  }
  produtoIsPresent(){
    this.novoLancamento.produto = new Produto();
  }

  clickEventModalPesquisar(event) {
    if (event.detail === 1) {
      setTimeout(() => {
      }, 100)

    }
  }
  buscarPorId(){
    this.id = this.activeRoute.snapshot.params['id'];
    this.lancamentoService.listarPorId(this.id)
    .subscribe(data =>{
      this.novoLancamento = data;
    }), error => console.log(error)
  }

  AbrirModal() {
    this.visualizarModal = true;
  }

}
