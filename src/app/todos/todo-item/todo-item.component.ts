import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AppState } from '../app.reducer';
import { Todo } from '../models/todo.model';
import { borrar, editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('edition') inputEdition: ElementRef;
  checkCompletado: FormControl;
  txtInput: FormControl;
  editando: boolean = false;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.checkCompletado.valueChanges.subscribe(check => {
      this.store.dispatch(toggle({ id: this.todo.id }));
    })
  }

  editar() {
    this.editando = true;

    /* 
     * Si borro el contenido al editar y pulso fuera, cuando vuelvo a hacer 
     * click en el contenido el input ya no tiene valor, por lo que es necesario 
     * siempre setear el valor del input
     */
    this.txtInput.setValue(this.todo.texto);

    setTimeout(() => {
      // this.inputEdition.nativeElement.focus();
      this.inputEdition.nativeElement.select(); //lo que hace es que selecciona el texto completo al hacer click y tener el foco
    }, 1)
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) { return; }
    if (this.txtInput.value === this.todo.texto) { return; }

    this.store.dispatch(editar({ id: this.todo.id, texto: this.txtInput.value }));
  }

  borrarTodo() {
    this.store.dispatch(borrar({ id: this.todo.id }));
  }
}
