package com.jarmison.varejo.online.api.model;

import com.jarmison.varejo.online.api.Enums.Cargos;
import com.jarmison.varejo.online.api.Enums.TipoMovimentacao;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

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
    private BigDecimal quantidade;
    @CreationTimestamp
    @Column(nullable = false,updatable = false)
    private Date dataMovimentacao;
    private String motivoMovimentacao;
    private String documento;

}
