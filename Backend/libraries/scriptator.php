<?php 

class Scriptator { 
   
    static public function encrypt($encrypt) { 
        $encrypt_method = "AES-256-CBC";
        $secret_key = 'This is my secret key';
        $secret_iv = 'This is my secret iv';
        $key = hash('sha256', $secret_key);
        $iv = substr(hash('sha256', $secret_iv), 0, 16);

        $jsonToEncript = json_encode($encrypt);

        $output = openssl_encrypt($jsonToEncript, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);
       
        return $output;
    } 
        
    static public function decrypt($tokenEncripted) { 
        $encrypt_method = "AES-256-CBC";
        $secret_key = 'This is my secret key';
        $secret_iv = 'This is my secret iv';
        $key = hash('sha256', $secret_key);
        $iv = substr(hash('sha256', $secret_iv), 0, 16);

        $output = openssl_decrypt(base64_decode($tokenEncripted), $encrypt_method, $key, 0, $iv);
        $jsonToEncript = json_decode($output);
        return $jsonToEncript; 
    } 

    static public function createToken($id){
        $tokenToEncrypt = [
                       "id"=>$id,
                       "create_date"=>date('d/m/Y H:i:s')
        ];
        $encripted = Scriptator::encrypt($tokenToEncrypt);        
        return $encripted;
    }

    static public function checkedToken($desncriptedToken){
        $dateNow = new DateTime(date('d/m/Y H:i:s'));
        $dateToken = new DateTime(date($desncriptedToken->create_date));
        $interval = date_diff($dateNow, $dateToken);
        $minutes = $interval->format('%i');

        if($minutes < 59){
            $encripted = Scriptator::createToken($desncriptedToken->id);
           return $encripted;
        }else{
            return null;
        }
    }

  
}