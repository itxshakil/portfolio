<?php

if(!defined('CAN_ACCESS')){
    header('Location:/');
    exit();
}

return array(
    'hostname' => 'localhost',
    'dbusername' => 'root',
    'dbpassword' => '',
    'dbname' => 'portfolio',
);
