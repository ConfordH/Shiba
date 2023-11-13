<?php
include 'dbConn.php';

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$email = $DecodedData['Email'];
$Pass = $DecodedData['Password'];

$Pass = md5($Pass);

$query = "SELECT users.*, campuses.name AS campName, campuses.regionSpecs FROM users INNER JOIN campuses ON users.campusID = campuses.campusID WHERE users.Email = '$email' AND users.Password='$Pass'";

$results = mysqli_query($db_conn,$query);
if(mysqli_num_rows($results)>0){
while ($row = mysqli_fetch_assoc($results)){
    $row;
    echo $jsonData = json_encode($row);
}}else{
    echo 'Failed to log In, Check your details';
}
?> 