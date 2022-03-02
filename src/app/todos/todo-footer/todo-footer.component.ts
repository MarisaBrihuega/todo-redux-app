import { filtrosValidos, setFiltro } from './../../filtro/filtro.actions';
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  filtroActual: filtrosValidos = 'todas';
  filtros: filtrosValidos[] = ['todas', 'pendientes', 'completadas'];

  pendientes: number = 0;

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(filtro => this.filtroActual = filtro);
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    })
  }

  cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(setFiltro({ filtro: filtro }));
    // Si tenemos un objeto cuya propiedad se llama igual que la variable, se puede dejar únicamente como this.store.dispatch(setFiltro({ filtro }));
  }

  limpiarCompletados() {
    this.store.dispatch(limpiarCompletados());
  }

}
