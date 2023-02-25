import { Cargo } from "./cargos"
import { Produto } from "./produtos"
import { TipoMovimentacao } from "./tipo_movimentacao"

export class Lancamentos{
    codigolancamento:number
    produto:Produto
    cargo:Cargo
    tipoMovimentacao:TipoMovimentacao
    quantidade:number
    dataMovimentacao:Date
    documento:string
    motivoMovimentacao:string
    saldo:number
}