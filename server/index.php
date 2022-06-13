<?php
// session_start();

function cors() {
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: *');
        header('Access-Control-Max-Age: 1728000');
        header("Content-Length: 0");
        header("Content-Type: text/plain"); 
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept, Bear-Token");

        exit(0);
    }
}
cors();

require_once("db.php");

// Định nghĩa hằng Path của file index.php
define('PATH_ROOT', __DIR__);

// // Autoload class trong PHP
spl_autoload_register(function (string $class_name) {
    $class_name = str_replace('\\', '/', $class_name);
    include_once PATH_ROOT . '/' . $class_name . '.php';
});

#include_once PATH_ROOT . '/Core/Http/Route.php';
$router = new Core\Http\Route();

// load class Route
// $router = new core/http/Route;

include_once PATH_ROOT . '/Routers/admin.php';
include_once PATH_ROOT . '/Routers/user.php';
include_once PATH_ROOT . '/Routers/authentication.php';

include_once PATH_ROOT . '/Models/dish_model.php';
include_once PATH_ROOT . '/Models/blog_model.php';
include_once PATH_ROOT . '/Models/reservation_model.php';
include_once PATH_ROOT . '/Models/user_model.php';
include_once PATH_ROOT . '/Models/comment_model.php';

include_once PATH_ROOT . '/Middlewares/AuthMiddleware.php';
include_once PATH_ROOT . '/Middlewares/FormValidator.php';

// Lấy url hiện tại của trang web. Mặc định la /
$request_url = !empty($_GET['url']) ? '/' . $_GET['url'] : '/';

// Lấy phương thức hiện tại của url đang được gọi. (GET | POST). Mặc định là GET.
$method_url = !empty($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
$router->map($request_url, $method_url);

?>
