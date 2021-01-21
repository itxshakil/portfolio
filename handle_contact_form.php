<?php

define('CAN_ACCESS', TRUE);

$configs =  include('config.php');

$statusMsg = '';
$msgClass = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    if (!empty($email) && !empty($name) && !empty($message)) {

        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $statusMsg = 'Please enter your valid email.';
            $msgClass = 'error';
        } else {
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

                $sql = 'INSERT INTO contacts(name, email, message) VALUES(:name, :email, :message)';
                $statement = $connection->prepare($sql);
                if ($statement->execute([':name' => $name, ':email' => $email, ':message' => $message])) {
                    $statusMsg = 'Your message has been submitted successfully !';
                    $msgClass = 'success';
                } else {
                    $statusMsg = 'Your contact request submission failed, please try again.';
                    $msgClass = 'error';
                }
            } catch (PDOException $e) {
                $statusMsg = 'Some Error occurs, Please try again in some time.';
                $msgClass = 'error';
            }
        }
    } else {
        $statusMsg = 'Please fill all the fields.';
        $msgClass = 'error';
    }

    $response = ['message' =>  $statusMsg, 'class' => $msgClass];

    print json_encode($response);
}
