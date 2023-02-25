package com.jarmison.varejo.online.api.repository;

import com.jarmison.varejo.online.api.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin("http://localhost:4200")
public interface ProdutoRepository extends JpaRepository <Produto,Long> {
}
