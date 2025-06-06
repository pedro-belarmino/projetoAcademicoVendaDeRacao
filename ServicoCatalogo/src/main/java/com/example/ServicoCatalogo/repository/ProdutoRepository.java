package com.example.ServicoCatalogo.repository;

import com.example.ServicoCatalogo.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}

