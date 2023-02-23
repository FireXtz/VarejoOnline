package com.jarmison.varejo.online.api.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ProdutoNaoEncontradoException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public ProdutoNaoEncontradoException(String message){
        super(message);
    }

}