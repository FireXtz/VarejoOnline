package com.jarmison.varejo.online.api.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigoDeBarra;
    private String nome;
    private Integer quantidadeMinima;
    private Double saldoInicial;

}
