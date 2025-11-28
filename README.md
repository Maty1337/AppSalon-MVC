# 💇‍♂️ AppSalon MVC

Aplicación web desarrollada en **PHP con arquitectura MVC**, diseñada para la gestión de turnos en un salón de belleza.  
Incluye autenticación, gestión de servicios, validaciones, SCSS compilado con Gulp y conexión a MySQL.

---

## 🚀 Tecnologías utilizadas

- PHP 8+ (MVC)
- MySQL
- SCSS + Gulp
- JavaScript
- Composer
- Git / GitHub

---

## 🧩 Funcionalidades principales

- Autenticación de usuarios  
- Reserva de turnos por día y servicio  
- CRUD de servicios  
- Protección de rutas  
- Router propio en PHP  
- Validación y sanitización de datos  
- Compilación automática de SCSS  

---

## 📸 Capturas de pantalla

Agrega tus imágenes dentro de `readme-assets/` y enlazalas así:

Crear Cuenta
![Crear Cuenta](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/crear-cuenta.png)

Login
![Login](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/login.png)

Recuperar Contraseña
![Recuperar Contraseña](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/recuperar-contraseña.png)

Elegir Servicio
![Elegir Servicio](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/elegir-servicio.png)

Elegir Fecha
![Elegir Fecha](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/elegir-fecha.png)

Resumen Cita
![Resumen Cita](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/resumen-cita.png)

Vista Admin(Principal)
![Vista Admin](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/vista-admin.png)

Vista Admin(Servicios)
![Vista Admin 1](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/vista-admin1.png)

Vista Admin(Crear Servicios)
![Vista Admin 2](https://raw.githubusercontent.com/Maty1337/AppSalon-MVC/main/readme-assets/vista-admin2.png)

---

## ⚙️ Instalación y uso

1. Clonar repositorio:

```bash
git clone https://github.com/Maty1337/AppSalon-MVC.git
cd AppSalon-MVC
```

2. Instalar dependencias:

```bash
composer install
npm install
```

3. Crear base de datos:

```sql
CREATE DATABASE appsalon;
```

4. Configurar conexión en PHP:

```php
$host = 'localhost';
$user = 'root';
$password = '';
$db = 'appsalon';
```

5. Compilar SCSS:

```bash
gulp
```

6. Levantar servidor:

```bash
php -S localhost:3000
```

---

## 📂 Estructura del proyecto

```
controllers/
models/
views/
public/
src/
includes/
```

---

## 👨‍💻 Autor

**Matias Buenaventura**  
GitHub: https://github.com/Maty1337
