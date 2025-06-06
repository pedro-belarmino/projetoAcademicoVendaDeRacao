package com.example.ServicoPagamento.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping("/pagamento")
public class PagamentoController {

    @PostMapping("/{pedidoId}")
    public String processar(@PathVariable Long pedidoId) {
        boolean sucesso = new Random().nextBoolean();
        return sucesso ? "Pagamento aprovado para pedido " + pedidoId : "Pagamento recusado para pedido " + pedidoId;
    }
}

