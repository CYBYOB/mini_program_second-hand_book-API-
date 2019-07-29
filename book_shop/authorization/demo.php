<?php

include_once "wxBizDataCrypt.php";


$appid = 'wx468a8bf22a59ac97';


$sessionKey = 'tiihtNczf5v6AKRyjwEUhQ==';

//
//$iv = 'r7BXXKkLb8qrSNn05n0qiA==';
$encryptedData =$_GET['encryptedData'];
$iv = $GET['iv'];


$pc = new WXBizDataCrypt($appid, $sessionKey);
$errCode = $pc->decryptData($encryptedData, $iv, $data );

if ($errCode == 0) {
    print($data . "\n");
} else {
    print($errCode . "\n");
}
