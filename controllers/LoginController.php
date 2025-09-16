<?php

namespace Controllers;

use MVC\Router;

class LoginController {
    public static function login(Router $router) {
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Crear una nueva instancia de usuario
            // debuguear($_POST);
        }

        $router->render('auth/login', [
            'alertas' => $alertas
        ]);
        
    }

    public static function logout() {
        echo "Cerrar Sesión";
    }

    public static function olvide(Router $router) {
        $router->render('auth/olvide-password', [
            
        ]);
    }

    public static function recuperar() {
        echo "Colocar nuevo password";
    }

    public static function crear(Router $router) {
        $router->render('auth/crear-cuenta', [
            
        ]);
    }
}