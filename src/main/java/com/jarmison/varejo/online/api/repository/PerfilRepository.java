package com.jarmison.varejo.online.api.repository;

import com.jarmison.varejo.online.api.model.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil,Long> {

}
