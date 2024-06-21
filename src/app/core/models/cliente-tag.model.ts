export class ClienteTag {
    id?: number;
    clienteId?: number;
    tagId?: number;

    constructor(tag?: number, cliente?: number) {
        this.clienteId = cliente;
        this.tagId = tag;
    }
}
