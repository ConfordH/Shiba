<?php
include 'dbConn.php';

$query = "SELECT items.*, hotels.name AS hotel FROM items INNER JOIN hotels ON items.hotelID = hotels.hotelID";

$results = mysqli_query($db_conn,$query);
if(mysqli_num_rows($results)>0){
while ($row[] = mysqli_fetch_assoc($results)){
    $jsonData = json_encode($row);
}

echo $jsonData;
}else{
    echo 'Failed Fetch';
}
