import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

//Tradução pt-BR
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import localePt from '@angular/common/locales/pt';


registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    TranslateService,
    ErrorHandlerService,
    MessageService, 
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
