import { Component, OnInit } from '@angular/core';
import { Lancamentos } from '../models/lancamentos';
import { Router } from '@angular/router';
import { LancamentoService } from '../services/lancamento.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-movimentos',
  templateUrl: './movimentos.component.html'
})
export class MovimentosComponent implements OnInit {

  lancamentos:Lancamentos[];

  constructor(private router:Router,private lancamentoService:LancamentoService) { }

  ngOnInit(): void {
    this.listarLancamentos();
  }

  redirectProduto(){
    this.router.navigate(['/produtos/cadastro'])
  }

  listarLancamentos(){
    this.lancamentoService.listarLancamentos().subscribe((data =>{
      this.lancamentos = data;
      console.log(this.lancamentos)
    }),
    )
  }

  removerLancamentos(id: number) {
    this.lancamentoService.removerLancamento(id).subscribe(
      (data) => {
        this.sucessoAoRemoverLancamento();
        this.redirectProduto();
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
      'Lançamento Removido com sucesso',
      'success'
    )
  }


}
