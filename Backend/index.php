<?php

require_once 'vendor/autoload.php';
require_once 'libraries/scriptator.php';


$app = new \Slim\Slim();

$db = new mysqli('localhost', 'root', '', 'primer_parcial_lab4');

date_default_timezone_set('America/Argentina/Buenos_Aires');

//CONFIGURACION DE CABECERAS
header('Access-Control-Allow-Origin: *'); //permite cros domain
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

$app->get("/pruebas", function() use($app, $db){
    echo "hola mundo";
    var_dump($db);
});

//GUARDAR PERSONAS
$app->post('/personas', function() use($app, $db){
    try{
        $json = $app->request->post('json');
        $data = json_decode($json, true);
    
        if(!isset($data['name'])){
            $data['name']=null;
        }
        if(!isset($data['email'])){
            $data['email']=null;
        }
        if(!isset($data['sex'])){
            $data['sex']=null;
        }
        if(!isset($data['image'])){
            $data['image']=null;
        }
    
        $query = "INSERT INTO personas VALUES(NULL,".
                "'{$data['name']}',".
                "'{$data['email']}',".
                "'{$data['sex']}',".
                "'{$data['image']}'".
                ");";
        
        $insert = $db->query($query);
        $result = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'No se inserto la persona'
        );
    
        if($insert){
            $result = array(
                'status' => 'success',
                'code' => 200,
                'message' => 'Persona se creo correctamente'
            );
        }
        echo json_encode($result);
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        echo json_encode($result);    
    }
});

//LISTAR TODAS LAS PERSONAS
$app->get('/personas', function() use($app, $db){
    try{
        $sql = 'SELECT * FROM personas ORDER BY id DESC;';
        $query = $db->query($sql);
    
        $persons = array();
        while($person = $query->fetch_assoc()){
            $persons[] = $person;
        }
        $result = array(
            'status' => 'success',
            'code' => 200,
            'data' => $persons
        );
        echo json_encode($result);
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        echo json_encode($result);    
    }    
});

//DEVOLVER UNA PERSONA
$app->get('/personas/:id', function($id) use($app, $db){
    try{
        $sql = "SELECT * FROM personas WHERE id=".$id.";";
        $query = $db->query($sql);
    
        $result = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'No existe la persona'
        );
    
        if($query->num_rows == 1){
            $person = $query->fetch_assoc();
            $result = array(
                'status' => 'success',
                'code' => 200,
                'data' => $person
            );
        }
        echo json_encode($result);

    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        echo json_encode($result);    
    }
});

//ELIMINAR UNA PERSONA
$app->get('/personas/:id/delete', function($id) use($app, $db){
    try{
        $sql = "DELETE FROM personas WHERE id=".$id.";";
        $query = $db->query($sql);
        $result = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'No se elimino la persona o no existe'
        );
        var_dump($query);
        if($query){
            $result = array(
                'status' => 'success',
                'code' => 200,
                'message' => "La persona se elimino correctamente"
            );
        }
        echo json_encode($result);
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        echo json_encode($result);    
    }   
   
});

//ACTUALIZAR PERSONA
$app->post('/personas/:id/update', function($id) use($app, $db){
    try{
        $json = $app->request->post('json');
        $data = json_decode($json, true);
        $sql = "UPDATE personas SET ".
                "name = '{$data['name']}', ".
                "email = '{$data["email"]}', ".
                "sex = '{$data["sex"]}'".
                "WHERE id = ".$id.";";
    
        $query = $db->query($sql);
        var_dump($sql);
    
        $result = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'No se pudo actualizar la persona o no existe'
        );
        if($query){
            $result = array(
                'status' => 'success',
                'code' => 200,
                'message' => 'Se actualizo la persona'
            );
        }
        echo json_encode($result);
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        echo json_encode($result);    
    }   

   
});

//SUBIR UNA IMAGEN A UN PRODUCTO
$app->post('/upload-file', function() use($app, $db){
    try{
        //seccion 12 video 70
        $result = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'La imagen no ha podido subirse'
        );
        if(isset($_FILES['uploads'])){
            $piramideUploader = new PiramideUploader();
            $upload = $piramideUploader->upload('image', 'uploads', 'uploads', array('image/jpeg', 'image/png', 'image/gif'));
            $file = $piramideUploader->getInfoFile();
            $file_name = $file['complete_name'];
            var_dump($file);
            echo "llegan los datos";
        }
        echo json_encode($result);
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        echo json_encode($result);    
    }   
    
});

$app->get('/login', function() use($app, $db){
    try{
        $user = $app->request->get('user');
        $pass = $app->request->get('pass');
        $md5Pass = md5($pass);
    
        $query = "SELECT * FROM usuarios WHERE ".
                "name = '$user' AND ".
                "password = '$md5Pass'";
        $row = $db->query($query)->fetch_assoc();
    
        if($row){
            $encripted = Scriptator::createToken($row['id']);
            $result = array(
                'status' => 'sucess',
                'code' => 201,
                'data' => $encripted
            );
        }else{
            $result = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'No existe el usuario'
            );
        } 
        echo json_encode($result);    
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        echo json_encode($result);    
    }   
    
});

$app->get('/login/check', function() use($app, $db){
    try{
        $user = $app->request->get('token');
        $result = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'No hay usuarios logueados'
        );

        if($user != null){
            $descriptedToken = Scriptator::decrypt($user);
            $newToken = Scriptator::checkedToken($descriptedToken);
            if($newToken){
                $result = array(
                    'status' => 'sucess',
                    'code' => 201,
                    'data' => $newToken
                );
            }
        }
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
    }     
      
    echo json_encode($result);
});




$app->run();

