package com.jarmison.varejo.online.api.service;

import com.jarmison.varejo.online.api.Enums.TipoMovimentacao;
import com.jarmison.varejo.online.api.Exception.ProdutoNaoEncontradoException;
import com.jarmison.varejo.online.api.VarejoRunner;
import com.jarmison.varejo.online.api.model.Lancamentos;
import com.jarmison.varejo.online.api.repository.LancamentosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static com.jarmison.varejo.online.api.Enums.Cargos.GERENTE;
import static com.jarmison.varejo.online.api.Enums.Cargos.OPERADOR;
import static com.jarmison.varejo.online.api.Enums.TipoMovimentacao.*;

@Service
public class LancamentoService {
    @Autowired
    private LancamentosRepository lancamentosRepository;
    private final String MSG_LANCAMENTO_NAO_ENCONTRADO = "Não foi possivel localizar o lançamento com id de destino:";
    private final String MSG_NAO_TEM_PERMISSAO_LANCAMENTO = "Não possui Permissão para realizar o lançamento";
    private static Logger logger = LoggerFactory.getLogger(VarejoRunner.class);
    public ResponseEntity <?> realizarLancamento(Lancamentos lancamentos){

        if (lancamentos.getCargo().equals(OPERADOR) && lancamentos.getTipoMovimentacao().equals(SALDO_INICIAL)){
            return ResponseEntity.status(400).body(MSG_NAO_TEM_PERMISSAO_LANCAMENTO);

        } else if (lancamentos.getCargo().equals(GERENTE)) {
            saldoFinal(lancamentos.getTipoMovimentacao(),lancamentos);
            Lancamentos salvarLancamento = lancamentosRepository.save(lancamentos);
            return ResponseEntity.ok().body(salvarLancamento);

        } else if (lancamentos.getCargo().equals(OPERADOR) && lancamentos.getTipoMovimentacao().equals(AJUSTE)) {
            return ResponseEntity.status(400).body(MSG_NAO_TEM_PERMISSAO_LANCAMENTO);
        }
        else if (lancamentos == null){
            saldoFinal(lancamentos.getTipoMovimentacao(), lancamentos);
            Lancamentos salvarLancamento = lancamentosRepository.save(lancamentos);
            return ResponseEntity.ok().body(salvarLancamento);
        }
        saldoFinal(lancamentos.getTipoMovimentacao(), lancamentos);
        Lancamentos salvarLancamento = lancamentosRepository.save(lancamentos);
        return ResponseEntity.ok().body(salvarLancamento);

    }
    public ResponseEntity<?>listarLancamentos(){
        List<Lancamentos> lancamentos = lancamentosRepository.findAll();
        return !lancamentos.isEmpty()?ResponseEntity.ok().body(lancamentos):ResponseEntity.notFound().build();
    }
    public ResponseEntity<Lancamentos>pesquisarPor(Long id){
        return lancamentosRepository.findById(id)
                .map(produtos-> ResponseEntity.ok().body(produtos))
                .orElseThrow(()-> new ProdutoNaoEncontradoException(MSG_LANCAMENTO_NAO_ENCONTRADO + id));
    }
    @Transactional
    public ResponseEntity<Map<String, Boolean>> remover(Long id){
        Lancamentos lancamentos = lancamentosRepository.findById(id)
                .orElseThrow(()->new ProdutoNaoEncontradoException("Lancamento não encontrado com id:"+id));
        lancamentosRepository.delete(lancamentos);

        Map<String,Boolean>response = new HashMap<>();
        response.put("removido",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    public void saldoFinal(TipoMovimentacao tipoMovimentacao,Lancamentos lancamentos){

            if (tipoMovimentacao.equals(ENTRADA)){
                lancamentos.setSaldo(lancamentos.getProduto().getSaldoInicial() + lancamentos.getProduto().getQuantidadeMinima());
            } else if (tipoMovimentacao.equals(SALDO_INICIAL)) {
                lancamentos.setSaldo(lancamentos.getProduto().getSaldoInicial() + lancamentos.getProduto().getQuantidadeMinima());
            } else if (tipoMovimentacao.equals(AJUSTE_ENTRADA)) {
                lancamentos.setSaldo(lancamentos.getProduto().getSaldoInicial() + lancamentos.getProduto().getQuantidadeMinima());
            }
            else {
                lancamentos.setSaldo(lancamentos.getProduto().getSaldoInicial() - lancamentos.getProduto().getQuantidadeMinima());
            }
    }

}
