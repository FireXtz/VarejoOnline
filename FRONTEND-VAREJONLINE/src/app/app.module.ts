import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import { AppLayoutModule } from './layout/app.layout.module';


import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';


import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import {AutoFocusModule} from 'primeng/autofocus';
import {CardModule} from 'primeng/card';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DividerModule} from 'primeng/divider';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {FieldsetModule} from 'primeng/fieldset';
import {DialogModule} from 'primeng/dialog';
import { PesquisarProdutosComponent } from './components/pesquisar-produtos/pesquisar-produtos.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { EditarProdutoComponent } from './components/editar-produto/editar-produto.component';
import { MovimentosComponent } from './components/movimentos/movimentos.component';
import { CadastrarLancamentoComponent } from './components/cadastrar-lancamento/cadastrar-lancamento.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PesquisarPerfisComponent } from './components/pesquisar-perfis/pesquisar-perfis.component';
import { CadastroPerfilComponent } from './components/cadastro-perfil/cadastro-perfil.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { CadastrarUsuarioComponent } from './components/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { DetalhesLancamentosComponent } from './components/detalhes-lancamentos/detalhes-lancamentos.component';
@NgModule({
  declarations: [
    AppComponent,
    PesquisarProdutosComponent,
    CadastroProdutoComponent,
    EditarProdutoComponent,
    MovimentosComponent,
    CadastrarLancamentoComponent,
    UsuariosComponent,
    PesquisarPerfisComponent,
    CadastroPerfilComponent,
    EditarPerfilComponent,
    CadastrarUsuarioComponent,
    EditarUsuarioComponent,
    DetalhesLancamentosComponent
  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    AppRoutingModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    AutoFocusModule,
    CardModule,
    InputMaskModule,
    DropdownModule,
    InputSwitchModule,
    BreadcrumbModule,
    RadioButtonModule,
    FormsModule,
    DividerModule,
    InputTextareaModule,
    TableModule,
    CoreModule,
    SharedModule,
    ToastModule,
    ConfirmDialogModule,
    FieldsetModule,
    DialogModule,
    MessagesModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
