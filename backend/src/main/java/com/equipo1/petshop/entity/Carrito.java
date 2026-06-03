package com.equipo1.petshop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "carrito")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    @PrePersist // Esto asigna la fecha actual automáticamente antes de guardar
    public void prePersist() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public Carrito() {}
    // TODO: Generar Getters y Setters con STS
}