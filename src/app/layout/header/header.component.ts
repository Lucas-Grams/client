import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

    options = [
        {label: 'Gerenciar Clientes', value: 1},
        {label: 'Cadastrar Clientes', value: 2},
        {label: 'Gerenciar Tags', value: 3},
    ];
    option: number = 1;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const option = this.options.find(option => option.value === 2);
        if (option) {
            if (this.route.snapshot.paramMap.has('uuid')) {
                option.label = 'Editar Cliente';
            } else {
                option.label = 'Cadastrar Cliente';
            }
        }
    }

    onChange(event: number) {
        let route;
        switch (event) {
            case 1:
                route = '/gerenciar-clientes'
                this.option = 1;
                break;
            case 2:
                route = '/cadastrar-cliente'
                this.option = 2;
                break;
            case 3:
                route = '/gerenciar-tags'
                this.option = 3;
                break;
        }
        this.router.navigate([route]);
    }
}
