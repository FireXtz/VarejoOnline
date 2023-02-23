package com.jarmison.varejo.online.api.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(value = HttpStatus.CONFLICT)
public class SaldoException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public SaldoException(String message){
        super(message);
    }

}