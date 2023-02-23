package com.jarmison.varejo.online.api.controller;

import com.jarmison.varejo.online.api.model.Produto;
import com.jarmison.varejo.online.api.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
@RestController
@RequestMapping("/api-varejo/produto")
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;
    @GetMapping
    public ResponseEntity<?> list(){
       return produtoService.list();
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
}
