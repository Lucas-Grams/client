import {Component, OnInit} from "@angular/core";
import {Tag} from "../../../core/models/tag.model";
import {TagService} from "../../../core/services/tagService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import Swal from "sweetalert2";

type Action = "CANCEL" | "EDIT" | "TOGGLE";

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.css']
})

export class TagComponent implements OnInit {

    loading = false;
    editing = false;
    formInvalid = false;
    tags: Tag[] = [];

    form: FormGroup = new FormGroup({});

    constructor(
        private fb: FormBuilder,
        private tagService: TagService,
    ) {
    }

    ngOnInit() {
        this.buildForm();
        this.loadAll();
    }

    buildForm() {
        this.form = this.fb.group({
            id: this.fb.control("", []),
            nome: this.fb.control("", [Validators.required]),
        });
    }

    loadAll() {
        this.loading = true;
        this.tagService.getTags().subscribe((response) => {
            if (response.data) {
                this.tags = response.data;
            }
        });
        this.loading = false;
    }

    submit() {
        if (!this.form.valid) {
            this.formInvalid = true;
            setTimeout(() => {
                this.formInvalid = false;
            }, 3000);
            return
        }

        this.loading = true;

        if (this.editing) {
            this.tagService.postTag(this.form.getRawValue()).subscribe(
                (res) => {
                    Swal.fire({"title": res.msg, "icon": "success"});
                    this.form.reset();
                    this.editing = false;
                    this.loadAll();
                },
                ({error}) => {
                    Swal.fire({"title": error.message, "icon": "error"});
                },
                () => {
                    this.loading = false;
                }
            );

            return;
        }

        this.tagService.postTag(this.form.getRawValue()).subscribe(
            (res) => {
                Swal.fire({"title": res.msg, "icon": "success"});
                this.form.reset();
                this.loadAll();
            },
            ({error}) => {
                Swal.fire({"title": error.message, "icon": "error"});
            },
            () => {
                this.loading = false;
            }
        );
    }

    performAction(action: Action, element?: Tag, extra?: any) {
        switch (action) {
            case "CANCEL": {
                this.editing = false;
                this.form.reset();
                break;
            }
            case "EDIT": {
                this.editing = true;
                if (element) this.form.patchValue(element);
                break;
            }
            case "TOGGLE": {
                if (!element) {
                    return;
                }
                const oldValue = element.ativo;
                element.ativo = extra;

                this.tagService.postTag(element).subscribe(
                    (res) => {
                        Swal.fire({
                            title: `Tag ${extra ? 'ativada' : 'inativada'} com sucesso!`,
                            icon: 'success'
                        });
                        this.loadAll();
                    },
                    ({error}) => {
                        Swal.fire({"title": error.message, "icon": "error"});
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
