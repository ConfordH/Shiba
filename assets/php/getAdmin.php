<?php
include 'dbConn.php';

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$hotelID = $DecodedData['hotelID'];

$query = "SELECT items.*, hotels.name AS hotel FROM items INNER JOIN hotels ON items.hotelID = hotels.hotelID WHERE items.hotelID = '$hotelID'";

$results = mysqli_query($db_conn,$query);
if(mysqli_num_rows($results)>0){
while ($row[] = mysqli_fetch_assoc($results)){
    $jsonData = json_encode($row);
}

echo $jsonData;
}else{
    echo 'No admin found!';
}
