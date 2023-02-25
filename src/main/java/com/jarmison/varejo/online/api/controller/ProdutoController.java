package com.jarmison.varejo.online.api.controller;

import com.jarmison.varejo.online.api.model.Produto;
import com.jarmison.varejo.online.api.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api-varejo/produto")
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;
    @GetMapping
    public ResponseEntity<?> listarTodos(){
       return produtoService.listarProdutos();
    }
    @PostMapping("/adcionar")
    public ResponseEntity<?> adcionar(@RequestBody Produto produto, HttpServletResponse response){
        return produtoService.adcionar(produto,response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Produto>pesquisarPor(@PathVariable Long id){
        return produtoService.pesquisarPor(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> editarProduto(@PathVariable Long id, @RequestBody Produto produto){
      return produtoService.editarProduto(id, produto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>>removerRegistro(@PathVariable Long id){
        return produtoService.remover(id);
    }
}
