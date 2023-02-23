package com.jarmison.varejo.online.api.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String codigoDeBarra;
    private String nome;
    private Integer quantidadeMinima;
    private Double saldoInicial;

}
