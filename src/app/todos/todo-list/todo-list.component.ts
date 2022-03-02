import { filtrosValidos } from './../../filtro/filtro.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  listTodos: Todo[] = [];
  filtroActual: filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // SIN DESESTRUCTURACIÓN
    // this.store.subscribe(state => {
    //   this.listTodos = state.todos;
    //   this.filtroActual = state.filtro;
    // })

    // en lugar de hacerlo asi, se puede usar la desestructuración y no tener que usar state.todos ni state.filtro

    // CON DESESTRUCTURACIÓN
    this.store.subscribe(({ filtro, todos }) => {
      this.listTodos = todos;
      this.filtroActual = filtro;
    })
  }

}
