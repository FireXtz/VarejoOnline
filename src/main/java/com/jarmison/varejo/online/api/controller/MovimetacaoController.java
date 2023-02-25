package com.jarmison.varejo.online.api.controller;

import com.jarmison.varejo.online.api.model.Lancamentos;
import com.jarmison.varejo.online.api.model.Produto;
import com.jarmison.varejo.online.api.service.LancamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api-varejo/movimentos")
public class MovimetacaoController {
    @Autowired
    private LancamentoService lancamentoService;
    @PostMapping
    public ResponseEntity<?> realizarLancamento(@RequestBody Lancamentos lancamentos) {
        return lancamentoService.realizarLancamento(lancamentos);
    }
    @GetMapping
    public ResponseEntity<?> listarLancamentos(){
        return lancamentoService.listarLancamentos();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?>pesquisarPor(@PathVariable Long id){
        return lancamentoService.pesquisarPor(id);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> remover(@PathVariable Long id){
        return lancamentoService.remover(id);
    }
}
