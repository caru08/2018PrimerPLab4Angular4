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

  
}