package com.equipo1.petshop.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "mascota")
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 50)
    private String especie;

    @Column(length = 100)
    private String raza;

    @Column(length = 1)
    private String sexo;

    private LocalDate fechaNacimiento;

    @Column(precision = 5, scale = 2)
    private BigDecimal peso;

    // Relación N..1 (Muchas mascotas pertenecen a 1 cliente)
    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    public Mascota() {}
    // TODO: Generar Getters y Setters con STS
}