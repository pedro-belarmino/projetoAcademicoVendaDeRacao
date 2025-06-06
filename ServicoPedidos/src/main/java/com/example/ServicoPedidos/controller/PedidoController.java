package com.example.ServicoPedidos.controller;

import com.example.ServicoPedidos.model.Pedido;
import com.example.ServicoPedidos.service.PedidoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @PostMapping
    public Pedido criar(@RequestBody Pedido p) {
        return service.criar(p);
    }

    @GetMapping("/usuario/{id}")
    public List<Pedido> listarPorUsuario(@PathVariable Long id) {
        return service.listarPorUsuario(id);
    }
}

