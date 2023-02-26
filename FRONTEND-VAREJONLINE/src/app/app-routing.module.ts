import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarLancamentoComponent } from './components/cadastrar-lancamento/cadastrar-lancamento.component';
import { CadastrarUsuarioComponent } from './components/cadastrar-usuario/cadastrar-usuario.component';
import { CadastroPerfilComponent } from './components/cadastro-perfil/cadastro-perfil.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { DetalhesLancamentosComponent } from './components/detalhes-lancamentos/detalhes-lancamentos.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { EditarProdutoComponent } from './components/editar-produto/editar-produto.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { Lancamentos } from './components/models/lancamentos';
import { MovimentosComponent } from './components/movimentos/movimentos.component';
import { PesquisarPerfisComponent } from './components/pesquisar-perfis/pesquisar-perfis.component';
import { PesquisarProdutosComponent } from './components/pesquisar-produtos/pesquisar-produtos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {path: 'produtos/cadastro', component: CadastroProdutoComponent},
      {path: 'produtos', component: PesquisarProdutosComponent},
      {path: 'produtos/editar/:id', component: EditarProdutoComponent},
      {path: 'lancamentos', component: MovimentosComponent},
      {path: 'lancamentos/detalhes/:id', component: DetalhesLancamentosComponent},
      {path: 'lancamentos/cadastro', component: CadastrarLancamentoComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: 'usuarios/editar/:id', component: EditarUsuarioComponent},
      {path: 'usuarios/cadastro', component: CadastrarUsuarioComponent},
      {path: 'perfil', component: PesquisarPerfisComponent},
      {path: 'perfil/cadastro', component: CadastroPerfilComponent},
      {path: 'perfil/editar/:id', component: EditarPerfilComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
