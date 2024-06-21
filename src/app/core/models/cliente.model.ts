import {ClienteTag} from "./cliente-tag.model";

export class Cliente {
    id?: number;
    uuid?: string
    nome: string = '';
    email: string = '';
    ativo: boolean = true;
    clienteTags: ClienteTag[] = [];
}
