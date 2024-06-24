import {Component, OnInit} from "@angular/core";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {forkJoin, Subject} from "rxjs";
import {Tag} from "../../../core/models/tag.model";
import {Cliente} from "../../../core/models/cliente.model";
import {TagService} from "../../../core/services/tagService";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ClienteTag} from "../../../core/models/cliente-tag.model";
import {ClienteService} from "../../../core/services/clienteService";

type Action = "DELETE" | "EDIT" | "TOGGLE";

@Component({
    selector: 'app-list-clients',
    templateUrl: 'list-clients.component.html',
    styleUrls: ['list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

    loading = false;
    clientes: Cliente[] = [];
    clienteSearch: Cliente[] = [];
    tags: Tag[] = [];
    search: string = '';
    sortDirection = true;

    searchSubject: Subject<string> = new Subject();

    constructor(
        private router: Router,
        private clienteService: ClienteService,
        private tagService: TagService
    ) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.loadAll(() => {
            this.loading = false;
        });

        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(search => {
            this.loading = true;
            this.searchClients(search);
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
                    this.clienteSearch = result.clientes.data;
                }
                if (result.tags.status === 'SUCCESS') {
                    this.tags = result.tags.data;
                }
                callback();
            },
            error: (error) => {
                Swal.fire('Erro', 'Erro ao carregar clientes e tags', 'error');
                callback();
            }
        });
    }

    onSearch() {
        if (this.search.length > 3) {
            this.searchSubject.next(this.search);
        } else {
            this.clientes = this.clienteSearch;
        }
    }

    searchClients(search: string) {
        this.clienteService.searchClients(search).subscribe((response) => {
            if (response.data) this.clientes = response.data;
            this.loading = false;
        });
    }

    sortClients(column: keyof Cliente): void {
        this.sortDirection = !this.sortDirection;

        this.clientes.sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];

            if (aValue !== undefined && bValue !== undefined) {
                if (aValue < bValue) return this.sortDirection ? -1 : 1;
                if (aValue > bValue) return this.sortDirection ? 1 : -1;
            }

            return 0;
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
                Swal.fire({
                    "title": "Deseja realmente excluir o cliente?", "icon": "warning",
                    "showCancelButton": true, "confirmButtonText": "Sim", "cancelButtonText": "Não"
                })
                    .then((result) => {
                        if (result.isDismissed) {
                            return;
                        }
                        this.clienteService.deleteCliente(element?.uuid).subscribe((response) => {
                            Swal.fire('Sucesso', 'Cliente deletado com sucesso', 'success').then(() => {
                                this.loadAll(() => {
                                    this.loading = false
                                });
                            });
                        });
                    });
                break;
            }
            case "EDIT": {
                this.router.navigate(['/editar-cliente', element?.uuid]);
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
