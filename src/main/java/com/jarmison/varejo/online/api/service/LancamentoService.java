package com.jarmison.varejo.online.api.service;

import com.jarmison.varejo.online.api.model.Lancamentos;
import com.jarmison.varejo.online.api.repository.LancamentosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import static com.jarmison.varejo.online.api.Enums.Cargos.GERENTE;
import static com.jarmison.varejo.online.api.Enums.Cargos.OPERADOR;
import static com.jarmison.varejo.online.api.Enums.TipoMovimentacao.*;

@Service
public class LancamentoService {
    @Autowired
    private LancamentosRepository lancamentosRepository;
    public ResponseEntity <?> realizarLancamento(Lancamentos lancamentos){

        if (lancamentos.getCargo().equals(OPERADOR) && lancamentos.getTipoMovimentacao().equals(SALDO_INICIAL)){
            return ResponseEntity.ok().body("Não possui Permissão");
        } else if (lancamentos.getCargo().equals(GERENTE)) {
            Lancamentos salvarLancamento = lancamentosRepository.save(lancamentos);
            return ResponseEntity.ok().body(salvarLancamento);
        } else if (lancamentos.getCargo().equals(OPERADOR) && lancamentos.getTipoMovimentacao().equals(AJUSTE)) {
            return ResponseEntity.ok().body("Não possui Permissão");
        }
        Lancamentos salvarLancamento = lancamentosRepository.save(lancamentos);
        return ResponseEntity.ok().body(salvarLancamento);

    }
}
