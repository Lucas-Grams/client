import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

    options = [
        {label: 'Gerenciar Clientes', value: 1},
        {label: 'Cadastrar Clientes', value: 2},
        {label: 'Gerenciar Usuários', value: 3},
        {label: 'Cadastrar Usuários', value: 4},
        {label: 'Gerenciar Tags', value: 5},
    ];

    @Input() option?: number;
    @Input() uuid?: string;
    @Output() optionChange = new EventEmitter<number>();
    @Output() uuidChange = new EventEmitter

    constructor() {}

    ngOnInit(): void {}

    onChange(event: number) {
        this.uuidChange.emit(undefined);
        this.optionChange.emit(event);
    }
}
