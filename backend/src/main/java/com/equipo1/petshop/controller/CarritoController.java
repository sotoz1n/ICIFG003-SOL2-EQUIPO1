package com.equipo1.petshop.controller;

import com.equipo1.petshop.entity.Carrito;
import com.equipo1.petshop.repository.CarritoRepository;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class CarritoController {

    @Autowired
    private CarritoRepository carritoRepository;

    @PostMapping("/carrito")
    public ResponseEntity<?> registrarCompraReal(@RequestBody Map<String, Object> payloadPedido) {
        try {
            Integer total = (Integer) payloadPedido.get("total");
            List<?> items = (List<?>) payloadPedido.get("items");

            System.out.println("====== PROCESANDO ORDEN DE COMPRA REAL ======");
            System.out.println("Monto Neto Capturado: $" + total);
            System.out.println("Items a registrar: " + items.size());
            System.out.println("=============================================");

            Carrito nuevoCarrito = new Carrito();
            
            com.equipo1.petshop.entity.Cliente clienteSimulado = new com.equipo1.petshop.entity.Cliente();
            clienteSimulado.setId(1); 
            nuevoCarrito.setCliente(clienteSimulado);

            Carrito carritoGuardado = carritoRepository.save(nuevoCarrito);

            return new ResponseEntity<>(Map.of(
                "status", "success", 
                "message", "Compra registrada en la base de datos con el ID: " + carritoGuardado.getId()
            ), HttpStatus.CREATED);
            
        } catch (Exception e) {
            System.err.println("Error crítico al persistir la compra: " + e.getMessage());
            return new ResponseEntity<>(Map.of(
                "status", "error", 
                "message", "Error interno al procesar la inserción en la base de datos"
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}