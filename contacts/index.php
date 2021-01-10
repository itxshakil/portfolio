<?php

define('CAN_ACCESS', TRUE);

$configs =  include('../config.php');

session_start();

if($_GET['secret'] === $configs['secret']){
    $_SESSION['can_access'] = true;
}

if($_SESSION['can_access']){
    $hostname = $configs['hostname'];
    $dbuser = $configs['dbusername'];
    $dbpassword = $configs['dbpassword'];
    $dbname = $configs['dbname'];

    $dsn = "mysql:host=$hostname;dbname=$dbname";
    $username = $dbuser;
    $password = $dbpassword;
    $options = [];
    try {
        $connection = new PDO($dsn, $username, $password, $options);

        $sql = 'SELECT * FROM contacts LIMIT 30';
        $statement = $connection->prepare($sql);
        if ($statement->execute()) {
            $contacts  = $statement->fetchAll(PDO::FETCH_ASSOC);
            $message = '';
            foreach($contacts as $contact){
                $contactName = $contact['name'];
                $contactEmail = $contact['email'];
                $contactMessage = $contact['message'];
                $contactCreatedAt = $contact['created_at'];
                $message .="<tr><td>$contactName</td><td>$contactEmail</td><td>$contactMessage</td><td>$contactCreatedAt</td></tr>";
            }
            $style ="<style>table, tr, th, td{border: 1px solid gray;text-align:center;padding:.3rem}table{border-collapse : collapse;width:100%}</style>";

            echo "$style<table><tr><th>Name</th><th>Email</th><th>Message</th><th>Created At</th></tr>$message</table>";

        } else {
            $statusMsg = 'Your contact request submission failed, please try again.';
            $msgClass = 'error';
        }
    } catch (PDOException $e) {
        $statusMsg = 'Some Error occurs, Please try again in some time.';
        $msgClass = 'error';
    }
}else{
    header('Location:../');
    exit();
}
