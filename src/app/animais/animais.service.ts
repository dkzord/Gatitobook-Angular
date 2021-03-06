import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokeService } from '../autenticacao/toke.service';
import { Animais, Animal } from './animais';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient, private tokeService: TokeService) { }

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeUsuario}/photos`);
  }

  buscaPorId(id: number): Observable<Animal>{
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal>{
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id: number): Observable<boolean>{
    return this.http.post(`${API}/photos/${id}/like`,
    {},
    { observe: 'response' }
    ).pipe(
      mapTo(true),
      catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error);
      })
    )
  }

}
