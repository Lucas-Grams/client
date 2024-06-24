import {Component, OnInit} from "@angular/core";
import Swal from "sweetalert2";
import {Tag} from "../../../core/models/tag.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Cliente} from "../../../core/models/cliente.model";
import {TagService} from "../../../core/services/tagService";
import {ClienteTag} from "../../../core/models/cliente-tag.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClienteService} from "../../../core/services/clienteService";

@Component({
    selector: 'app-form-clients',
    templateUrl: 'form-clients.component.html',
    styleUrls: ['form-clients.component.css']
})
export class FormClientsComponent implements OnInit {

    loading: boolean = false;
    formInvalid = false;
    isEditing: boolean = false;

    formGroup: FormGroup = new FormGroup({});
    cliente: Cliente = new Cliente();
    tags: Tag[] = [];
    uuid?: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private clienteService: ClienteService,
        private tagService: TagService
    ) {
        if (this.route.snapshot.paramMap.has('uuid')) {
            const uuid = this.route.snapshot.paramMap.get('uuid');
            if (uuid !== null) {
                this.uuid = uuid;
                this.isEditing = true;
            }
        }

    }

    ngOnInit() {
        this.buildForm();
        this.loadAll();
    }

    loadAll() {
        this.loading = true;
        if (this.uuid) {
            this.clienteService.getCliente(this.uuid).subscribe((response) => {
                if (response.status === "SUCCESS") {
                    this.cliente = response.data;
                    this.formGroup.patchValue(this.cliente);
                }
            });
        }

        this.tagService.getTags().subscribe((response) => {
            if (response.status === "SUCCESS") {
                if(response.data) response.data.forEach((tag: Tag) => {
                    if (tag.ativo) this.tags.push(tag)
                });
            }
        });
        this.loading = false;
    }

    buildForm() {
        this.formGroup = this.formBuilder.group({
            nome: this.formBuilder.control(this.cliente.nome, [Validators.required, Validators.max(100),
                Validators.min(3)]),
            id: this.formBuilder.control(this.cliente.id, []),
            uuid: this.formBuilder.control(this.cliente.uuid, []),
            email: this.formBuilder.control(this.cliente.email, [Validators.required, Validators.email]),
            clienteTags: this.formBuilder.control(this.cliente.clienteTags, []),
            altivo: this.formBuilder.control(this.cliente.ativo, [])
        });
        this.loading = false;
    }

    checkTag(tag: Tag): boolean {
        return this.cliente.clienteTags.some(clienteTag => clienteTag.tagId === tag.id);
    }


    addTag(tag: Tag): void {
        if (!this.checkTag(tag)) {
            let clienteTag = new ClienteTag(tag.id, this.cliente.id);
            this.cliente.clienteTags.push(clienteTag);
        } else {
            let i = this.cliente.clienteTags.findIndex((clienteTag: ClienteTag) => clienteTag.tagId === tag.id);
            if (i !== -1) {
                this.cliente.clienteTags.splice(i, 1);

            }
        }
    }

    salvar() {
        this.formGroup.get('clienteTags')?.setValue(this.cliente.clienteTags);
        if (this.formGroup.valid) {
            this.cliente = this.formGroup.getRawValue();
            Swal.fire({"title": `Deseja realmente ${this.cliente.id? 'atualizar': 'cadastrar'} o cliente?`, "icon": "warning",
                "showCancelButton": true, "confirmButtonText": "Sim", "cancelButtonText": "Não"})
                .then((result) => {
                    if (result.isDismissed) {
                        return;
                    }
                    this.clienteService.postCliente(this.cliente).subscribe(
                        (response) => {
                            Swal.fire('Sucesso', `Cliente ${this.cliente.id ? 'atualizado' : 'cadastrado'} com sucesso`, 'success');
                            this.formGroup.reset();
                            this.formGroup.markAsUntouched();

                        },
                        (error) => {
                            console.log(error);
                            Swal.fire('Erro', 'Ocorreu um erro ao cadastrar o cliente, tente novamente ou contate o suporte!', 'error');
                        },
                        () => {
                            this.router.navigate(['/gerenciar-clientes']);
                        }
                    );
                });
        } else {
            this.formInvalid = true;
            setTimeout(() => {
                this.formInvalid = false;
            }, 3000);
            return
        }
    }

}
