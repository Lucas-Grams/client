import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Cliente} from "../models/cliente.model";
import {ResponseDTO} from "../dtos/response.dto";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private clientesSubject: BehaviorSubject<Cliente[]> = new BehaviorSubject<Cliente[]>([]);

    constructor(
        private http: HttpClient,
    ) {
        this.loadInitialData();
    }

    private loadInitialData() {
        this.http.get<Cliente[]>(`${environment.apiUrl}/clientes`).subscribe(data => {
            this.clientesSubject.next(data);
        });
    }

    getClientes(): Observable<Cliente[]> {
        return this.clientesSubject.asObservable();
    }

    getCliente(uuid: string): Observable<ResponseDTO<Cliente>>{
        return this.http.get<ResponseDTO<Cliente>>(`${environment.apiUrl}/clientes/${uuid}`);

    }

    postCliente(cliente: Cliente): Observable<ResponseDTO<string>> {
        return this.http.post<ResponseDTO<string>>(`${environment.apiUrl}/clientes`, cliente).pipe(
            tap(response => {
                if (response.status == 'SUCCESS') {
                    this.loadInitialData();
                }
            })
        );
    }

    deleteCliente(uuid?: string): Observable<ResponseDTO<string>> {
        return this.http.delete<ResponseDTO<string>>(`${environment.apiUrl}/clientes/${uuid}`).pipe(
            tap(response => {
                if (response.status == 'SUCCESS') {
                    this.loadInitialData();
                }
            })
        );
    }

    searchClients(search: string): Observable<ResponseDTO<Cliente[]>> {
        return this.http.post<ResponseDTO<Cliente[]>>(`${environment.apiUrl}/clientes/search`, { search }).pipe(
            tap(response => {
                if (response.status == 'SUCCESS') {
                    this.clientesSubject.next(response.data);
                }
            })
        );
    }
}
