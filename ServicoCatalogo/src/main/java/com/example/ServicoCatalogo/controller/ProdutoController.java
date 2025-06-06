package com.example.ServicoCatalogo.controller;

import com.example.ServicoCatalogo.model.Produto;
import com.example.ServicoCatalogo.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Produto> listar() {
        return service.listar();
    }

    @PostMapping
    public Produto salvar(@RequestBody Produto p) {
        return service.salvar(p);
    }

    @GetMapping("/{id}")
    public Produto buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }
}

