import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  animais$!: Observable<Animais>;

  constructor(
    private _usuarioService: UsuarioService,
    private _animaisService: AnimaisService,
  ) { }

  ngOnInit(): void {
/*     this._usuarioService.returnaUsuario().subscribe((usuario) => {
      const userName = usuario.name ?? '';
      this._animaisService.listaDoUsuario(userName).subscribe((animais) => {
        this.animais = animais;
      })
    }) */

    this.animais$ = this._usuarioService.returnaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this._animaisService.listaDoUsuario(userName);
      })
    );
  }

}
