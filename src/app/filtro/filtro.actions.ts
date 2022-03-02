import { createAction, props } from '@ngrx/store';

export type filtrosValidos = 'todas' | 'completadas' | 'pendientes';

export const setFiltro = createAction(
    '[FILTRO] Set Filtro',
    props<{ filtro: filtrosValidos }>()
);