package com.jarmison.varejo.online.api.model;

import lombok.Data;
import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @ManyToOne
    @JoinColumn(name = "perfil_id")
    private Perfil perfil;

}
