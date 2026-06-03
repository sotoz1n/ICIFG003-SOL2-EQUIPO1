package com.equipo1.petshop.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "veterinario")
public class Veterinario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellido;

    @Column(length = 100)
    private String especialidad;

    @Column(length = 150)
    private String correo;

    @Column(length = 20)
    private String telefono;

    public Veterinario() {}
    // TODO: Generar Getters y Setters con STS
}