package com.jarmison.varejo.online.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jarmison.varejo.online.api.Enums.Cargos;
import com.jarmison.varejo.online.api.Enums.TipoMovimentacao;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Lancamentos {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long codigolancamento;
    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;
    @Enumerated(EnumType.STRING)
    private Cargos cargo;
    @Enumerated(EnumType.ORDINAL)
    private TipoMovimentacao tipoMovimentacao;
    private Integer quantidade;

    private Double saldo;
    @CreationTimestamp
    @Column(nullable = false,updatable = false)
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date dataMovimentacao;
    private String motivoMovimentacao;
    private String documento;


}
