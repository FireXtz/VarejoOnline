package com.jarmison.varejo.online.api.model;

import lombok.Data;
import javax.persistence.*;
@Entity
@Data
public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String nome;

}
