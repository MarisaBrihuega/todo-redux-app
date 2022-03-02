import { borrar, crear, editar, toggle, toggleAll, limpiarCompletados } from './todo.actions';
import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';


export const estadoInicial: Todo[] = [
    new Todo("Salvar al mundo")
];

const _todoReducer = createReducer(estadoInicial,
    on(crear, (state, { texto }) => [...state, new Todo(texto)]), // Vamos a devolver un nuevo array formado por todos los objetos del state + el nuevo que creamos con el reducer
    // ...state -> extrae cada uno de sus elementos y regrésalos de manera independiente (DESESTRUCTURACIÓN)

    on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),

    on(limpiarCompletados, (state) => state.filter(todo => !todo.completado)),

    on(toggle, (state, { id }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }

        });
    }),

    on(editar, (state, { id, texto }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    texto: texto,
                }
            } else {
                return todo;
            }

        });
    }),

    on(toggleAll, (state, { completado }) => {
        return state.map(todo => {
            return {
                ...todo,
                completado: completado
            }
        })
    })
);

export function todoReducer(state: any, action: any) {
    return _todoReducer(state, action);
}