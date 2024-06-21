import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Cliente} from "../models/cliente.model";
import {ResponseDTO} from "../dtos/response.dto";
import {Tag} from "../models/tag.model";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(
        private http: HttpClient,
    ) {}

    getTags(): Observable<ResponseDTO<Tag[]>>{
        return this.http.get<ResponseDTO<Tag[]>>(`${environment.apiUrl}/tags`);
    }

    postTag(tag: Tag): Observable<ResponseDTO<string>>{
        return this.http.post<ResponseDTO<string>>(`${environment.apiUrl}/tags`, tag);
    }
}
