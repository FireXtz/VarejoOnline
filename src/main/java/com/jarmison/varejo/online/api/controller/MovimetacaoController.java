package com.jarmison.varejo.online.api.controller;

import com.jarmison.varejo.online.api.model.Lancamentos;
import com.jarmison.varejo.online.api.service.LancamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-varejo/movimentos")
public class MovimetacaoController {
    @Autowired
    private LancamentoService lancamentoService;
    @PostMapping
    public ResponseEntity<?> realizarLancamento(@RequestBody Lancamentos lancamentos) {
        return lancamentoService.realizarLancamento(lancamentos);
    }
}
