package com.example.ServicoCatalogo.service;

import com.example.ServicoCatalogo.model.Produto;
import com.example.ServicoCatalogo.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public List<Produto> listar() {
        return repository.findAll();
    }

    public Produto salvar(Produto p) {
        return repository.save(p);
    }

    public Produto buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }
}

