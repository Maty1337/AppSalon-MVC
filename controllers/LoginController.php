<?php

namespace Controllers;


class LoginController {
    public static function login() {
        echo "Desde el controlador de Login";
    }

    public static function logout() {
        echo "Cerrar Sesión";
    }

    public static function olvide() {
        echo "Recuperar Password";
    }

    public static function recuperar() {
        echo "Colocar nuevo password";
    }

    public static function crear() {
        echo "Crear una cuenta";
    }
}