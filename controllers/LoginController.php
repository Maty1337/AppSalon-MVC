<?php

namespace Controllers;

use Model\Usuario;
use MVC\Router;
use Classes\Email;



class LoginController
{
    public static function login(Router $router)
    {
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Crear una nueva instancia de usuario
            // debuguear($_POST);
        }

        $router->render('auth/login', [
            'alertas' => $alertas
        ]);
    }

    public static function logout()
    {
        echo "Cerrar Sesión";
    }

    public static function olvide(Router $router)
    {
        $router->render('auth/olvide-password', []);
    }

    public static function recuperar()
    {
        echo "Colocar nuevo password";
    }

    public static function crear(Router $router)
    {

        $usuario = new Usuario($_POST);

        //Alertas vacías
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);//uso de sincronizar para llenar el objeto usuario con los datos del  formulario   
            $alertas = $usuario->validarNuevaCuenta(); 
            
            //Revisar que alertas esté vacío
            if (empty($alertas)) {
                $resultado = $usuario->existeUsuario();

                if($resultado->num_rows) {
                    $alertas = Usuario::getAlertas();
                }else{
                    //Hashear el password
                    $usuario->hashPassword();

                    //Generar un token único
                    $usuario->crearToken();

                    //Email de confirmación
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);

                    //Enviar el email
                    $email->enviarConfirmacion();

                    //Crear el usuario
                    $resultado = $usuario->guardar();

                    if ($resultado) {
                        header('Location: /mensaje');
                    }
                }
            }
        }


        $router->render('auth/crear-cuenta', [
            'usuario'=>$usuario,
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router){
        $router->render('auth/mensaje', []);
    }

    public static function confirmar(Router $router){
        $alertas = [];

        $token = s($_GET['token']);
        
        $usuario = Usuario::where('token', $token);
        
        if(empty($usuario)){
            //Mostrar mensaje de error
            Usuario::setAlerta('error', 'Token no válido');
        }else{
            //Modificar a usuario confirmado
            $usuario->confirmado = "1";
            $usuario->token = null;
            $usuario->guardar();    
            Usuario::setAlerta('exito', 'Cuenta comprobada correctamente');
        }
        //Obtener alertas
        $alertas = Usuario::getAlertas();


        //Renderizar la vista
        $router->render('auth/confirmar-cuenta', [
            'alertas' => $alertas
        ]);
    }
}