package com.jarmison.varejo.online.api.service;

import com.jarmison.varejo.online.api.Enums.TipoMovimentacao;
import com.jarmison.varejo.online.api.Exception.ProdutoNaoEncontradoException;
import com.jarmison.varejo.online.api.VarejoRunner;
import com.jarmison.varejo.online.api.events.RecursoCriadoEvent;
import com.jarmison.varejo.online.api.model.Lancamentos;
import com.jarmison.varejo.online.api.model.Produto;
import com.jarmison.varejo.online.api.repository.ProdutoRepository;
import org.slf4j.LoggerFactory;
import  org.slf4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private ApplicationEventPublisher publisher;
    private static Logger logger = LoggerFactory.getLogger(VarejoRunner.class);
    private final String MSG_USER_PRODUTO_SALDO_INICIAL = "Não é possível Editar o Produto Saldo Inicial é menor do que a quantidade Minima esperada";
    private final String MSG_USER_PRODUTO_SALDO_INICIAL_SALVAR = "Não é possível Salvar o Produto Saldo Inicial é menor do que a quantidade Minima esperada";
    private final String MSG_PRODUTO_NAO_ENCONTRADO = "Não foi possivel localizar o produto com id de destino:";
    public ResponseEntity<?>listarProdutos(){
        List<Produto> produtos = produtoRepository.findAll();
        return !produtos.isEmpty()?ResponseEntity.ok().body(produtos):ResponseEntity.notFound().build();
    }
    @Transactional
    public ResponseEntity<?> adcionar(Produto produto, HttpServletResponse response){
        Map<String, String> responseSaldoInicialInvalido = new HashMap<>();

        if ( produto.getSaldoInicial() < produto.getQuantidadeMinima()){
            responseSaldoInicialInvalido.put("mensagem:",MSG_USER_PRODUTO_SALDO_INICIAL_SALVAR);
            logger.error(MSG_USER_PRODUTO_SALDO_INICIAL_SALVAR);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseSaldoInicialInvalido);
        }
        Map<String, Double> adcionarMovimentacao = new HashMap<>();

        if ( produto.getSaldoInicial() > produto.getQuantidadeMinima()){
            adcionarMovimentacao.put(String.valueOf(TipoMovimentacao.SALDO_INICIAL),produto.getSaldoInicial());
            return ResponseEntity.status(HttpStatus.OK).body(adcionarMovimentacao);
        }
        else {
            Produto save = produtoRepository.save(produto);
            publisher.publishEvent(new RecursoCriadoEvent(this,response, produto.getId()));
            return ResponseEntity.status(HttpStatus.CREATED).body(save);
        }
    }
    public ResponseEntity<Produto>pesquisarPor(Long id){
        return produtoRepository.findById(id)
                .map(produtos-> ResponseEntity.ok().body(produtos))
                .orElseThrow(()-> new ProdutoNaoEncontradoException(MSG_PRODUTO_NAO_ENCONTRADO + id));
    }
    public ResponseEntity<?> editarProduto(Long id, Produto produto){
        Produto updateProduct = produtoRepository.findById(id).get();
        if (updateProduct == null){
            Map<String, String> responseSaldoInicialInvalido = new HashMap<>();
            responseSaldoInicialInvalido.put("mensagem:",MSG_USER_PRODUTO_SALDO_INICIAL);

            logger.error(MSG_USER_PRODUTO_SALDO_INICIAL);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseSaldoInicialInvalido);
        }
        if ( updateProduct.getSaldoInicial() < updateProduct.getQuantidadeMinima()){
            Map<String, String> responseSaldoInicialInvalido = new HashMap<>();
            responseSaldoInicialInvalido.put("mensagem:",MSG_USER_PRODUTO_SALDO_INICIAL);

            logger.error(MSG_USER_PRODUTO_SALDO_INICIAL);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseSaldoInicialInvalido);
        }

        BeanUtils.copyProperties(produto,updateProduct,"id");
        return ResponseEntity.status(HttpStatus.OK).body(produtoRepository.save(updateProduct));
    }

    @Transactional
    public ResponseEntity<Map<String, Boolean>> remover(Long id){
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(()->new ProdutoNaoEncontradoException("Produto não encontrado com id:"+id));
        produtoRepository.delete(produto);

        Map<String,Boolean>response = new HashMap<>();
        response.put("removido",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
