import { solicitarReserva } from '../solicitacao/solicitarReserva';

export type Reserva = {
    id?: number;
    inicio: string;
    fim: string;
    status: string;
    user_id: number;
    responsavel?: any;
    solicitacao_reserva_id: number;
    solicitacao_reserva: solicitarReserva;
    loading?: boolean;
    image?: any;
    lugares_disponiveis?: number;
};
