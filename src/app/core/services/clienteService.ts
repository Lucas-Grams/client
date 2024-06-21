import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Cliente} from "../models/cliente.model";
import {ResponseDTO} from "../dtos/response.dto";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(
        private http: HttpClient,
    ) {}

    getClientes(): Observable<ResponseDTO<Cliente[]>>{
        return this.http.get<ResponseDTO<Cliente[]>>(`${environment.apiUrl}/clientes`);
    }

    getCliente(uuid: string): Observable<ResponseDTO<Cliente>>{
        return this.http.get<ResponseDTO<Cliente>>(`${environment.apiUrl}/clientes/${uuid}`);

    }

    postCliente(cliente: Cliente): Observable<ResponseDTO<string>>{
        return this.http.post<ResponseDTO<string>>(`${environment.apiUrl}/clientes`, cliente);
    }

    deleteCliente(uuid?: string): Observable<ResponseDTO<string>>{
        return this.http.delete<ResponseDTO<string>>(`${environment.apiUrl}/clientes/${uuid}`);
    }
}
