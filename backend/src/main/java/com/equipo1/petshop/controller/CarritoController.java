package com.equipo1.petshop.controller;

import com.equipo1.petshop.entity.Carrito;
import com.equipo1.petshop.entity.Cliente;
import com.equipo1.petshop.entity.DetalleCarrito;
import com.equipo1.petshop.entity.Producto;
import com.equipo1.petshop.repository.CarritoRepository;
import com.equipo1.petshop.repository.DetalleCarritoRepository;

import java.math.BigDecimal;
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
@CrossOrigin(origins = "*")
public class CarritoController {

    @Autowired
    private CarritoRepository carritoRepository;

    // Inyectamos el repo del detalle
    @Autowired
    private DetalleCarritoRepository detalleCarritoRepository;

    @PostMapping("/carrito")
    public ResponseEntity<?> registrarCompraReal(@RequestBody Map<String, Object> payloadPedido) {
        try {
            Integer total = (Integer) payloadPedido.get("total");
            
            // Transformamos la lista genérica a una lista de Mapas para leer cada producto
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> items = (List<Map<String, Object>>) payloadPedido.get("items");

            System.out.println("====== PROCESANDO ORDEN DE COMPRA REAL ======");
            System.out.println("Monto Neto Capturado: $" + total);
            System.out.println("Items a registrar: " + items.size());
            System.out.println("=============================================");

            // 1. Guardar el Encabezado (Carrito)
            Carrito nuevoCarrito = new Carrito();
            Cliente clienteSimulado = new Cliente();
            clienteSimulado.setId(1); 
            nuevoCarrito.setCliente(clienteSimulado);

            Carrito carritoGuardado = carritoRepository.save(nuevoCarrito);

            // 2. Guardar el Detalle (Productos)
            for (Map<String, Object> item : items) {
                DetalleCarrito detalle = new DetalleCarrito();
                
                Integer idProducto = Integer.parseInt(item.get("productoId").toString());
                Integer cantidad = Integer.parseInt(item.get("cantidad").toString());
                Integer subtotal = Integer.parseInt(item.get("subtotal").toString());

                // Calculamos el precio unitario (subtotal dividido en la cantidad)
                BigDecimal precioUnitario = new BigDecimal(subtotal / cantidad);

                // Enlazamos el carrito recién creado
                detalle.setCarrito(carritoGuardado);
                
                // Enlazamos el producto (Solo necesitamos pasarle el ID)
                Producto producto = new Producto();
                producto.setId(idProducto);
                detalle.setProducto(producto);
                
                // Seteamos valores
                detalle.setCantidad(cantidad);
                detalle.setPrecioUnitario(precioUnitario);

                // Guardamos en la tabla intermedia
                detalleCarritoRepository.save(detalle);
            }

            return new ResponseEntity<>(Map.of(
                "status", "success", 
                "message", "Compra y detalles registrados con éxito. ID: " + carritoGuardado.getId()
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