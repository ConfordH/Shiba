<?php
include 'dbConn.php';

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$hotelID = $DecodedData['hotelID'];

$query = "SELECT items.*, hotels.name AS hotel, Admin.phone FROM items INNER JOIN hotels ON items.hotelID = hotels.hotelID INNER JOIN Admin ON items.adminID = Admin.adminID WHERE items.hotelID = '$hotelID'";

$results = mysqli_query($db_conn,$query);
if(mysqli_num_rows($results)>0){
while ($row[] = mysqli_fetch_assoc($results)){
    $jsonData = json_encode($row);
}

echo $jsonData;
}else{
    echo 'Found nothing in this hotel';
}
