import { createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';

export const estadoInicial: any = 'todas'; // el tipo deberia ser filtrosValidos pero sale un error de typescript

const _filtroReducer = createReducer(estadoInicial,
    on(setFiltro, (state, { filtro }) => filtro)
);

export function filtroReducer(state: any, action: any) {
    return _filtroReducer(state, action);
}