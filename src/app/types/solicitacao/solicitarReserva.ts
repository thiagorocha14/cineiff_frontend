export type solicitarReserva = {
    id?: number;
    nome_evento: string;
    descricao: string;
    justificativa: string;
    publico_alvo: string;
    nome_solicitante: string;
    documento: string;
    telefone: string;
    email: string;
    instituicao: string;
    status?: string;
    loading?: boolean;
};
