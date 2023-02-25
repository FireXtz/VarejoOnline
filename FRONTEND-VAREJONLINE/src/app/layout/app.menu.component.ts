import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
           
            {
                label: 'Sistema de Lançamentos',
                items: [
                    
                    {
                        label: 'PDV',
                        items: [
                            {
                                label: 'Produtos', icon: 'pi pi-shopping-bag', routerLink: '/produtos'
                            },

                            {
                                label: 'Lançamentos', icon: 'pi pi-tags', routerLink: '/lancamentos'
                            },

                    
                        ]
                    },
                    {
                        label: 'Clientes',
                        items: [
                            {
                                label: 'Usuários', icon: 'pi pi-users', routerLink: '/usuarios'
                            },
                            {
                                label: 'Perfil', icon: 'pi pi-users', routerLink: '/perfil'
                            },
                        ]
                    }
                ]
            },
            
        ];
    }
}
