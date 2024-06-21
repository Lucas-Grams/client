import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Cliente} from "../../../core/models/cliente.model";
import {ClienteService} from "../../../core/services/clienteService";
import Swal from "sweetalert2";
import {Tag} from "../../../core/models/tag.model";
import {forkJoin} from "rxjs";
import {TagService} from "../../../core/services/tagService";
import {ClienteTag} from "../../../core/models/cliente-tag.model";

type Action = "DELETE" | "EDIT" | "TOGGLE";


@Component({
    selector: 'app-list-clients',
    templateUrl: 'list-clients.component.html',
    styleUrls: ['list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

    loading = false;
    clientes: Cliente[] = [];
    tags: Tag[] = [];

    @Input() option?: number;
    @Input() uuid?: string;

    @Output() optionChange = new EventEmitter<number>();
    @Output() uuidChange = new EventEmitter<string>();

    constructor(
        private clienteService: ClienteService,
        private tagService: TagService
    ) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.loadAll(() => {
            this.loading = false;
        });
    }

    loadAll(callback: () => void): void {
        forkJoin({
            clientes: this.clienteService.getClientes(),
            tags: this.tagService.getTags()
        }).subscribe({
            next: (result) => {
                if (result.clientes.status === 'SUCCESS') {
                    this.clientes = result.clientes.data;
                }
                if (result.tags.status === 'SUCCESS') {
                    this.tags = result.tags.data;
                }
                callback();
            },
            error: (error) => {
                console.error('Erro ao carregar clientes e tags', error);
                Swal.fire('Erro', 'Erro ao carregar clientes e tags', 'error');
                callback();
            }
        });
    }

    checkNameTag(cltg: ClienteTag) {
        let tag = new Tag();
        this.tags.forEach((t) => {
            if (t.id === cltg.tagId) {
                tag = t;
            }
        });
        return tag?.nome;
    }


    performAction(action: Action, element?: Cliente, extra?: any) {
        switch (action) {
            case "DELETE": {
                this.clienteService.deleteCliente(element?.uuid).subscribe((response) => {
                    Swal.fire('Sucesso', 'Cliente deletado com sucesso', 'success').then(() => {
                        this.loadAll(() => {
                            this.loading = false
                        });
                    });
                });
                break;
            }
            case "EDIT": {
                console.log(element);
                this.uuidChange.emit(element?.uuid);
                this.optionChange.emit(2);
                break;
            }
            case "TOGGLE": {
                if (!element) {
                    return;
                }
                const oldValue = element.ativo;
                element.ativo = extra;

                this.clienteService.postCliente(element).subscribe(
                    (res) => {
                        Swal.fire({
                            title: `Cliente ${extra ? 'ativado' : 'inativado'} com sucesso!`,
                            icon: 'success'
                        });
                        this.optionChange.emit(1);
                    },
                    ({error}) => {
                        Swal.fire({"title": error, "icon": "error"});
                        element.ativo = oldValue;
                    }
                );

                break;
            }
            default: {
                const unhandled: never = action;
                console.error("Unhandled action: ", unhandled);
                break;
            }
        }
    }

}
