<?php

namespace Controllers;
use MVC\Router;
use Model\Cita; 


class CitaController {
    public static function index(Router $router) {

        session_start();


        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'],
            'id' => $_SESSION['id']
        ]);
    }
}