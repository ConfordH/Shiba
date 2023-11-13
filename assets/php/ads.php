<?php
include 'dbConn.php';

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$campusID = $DecodedData['campusID'];

$query = "SELECT * FROM adverts INNER JOIN campuses ON adverts.campusID = campuses.campusID WHERE adverts.campusID = '$campusID'";

$results = mysqli_query($db_conn,$query);
if(mysqli_num_rows($results)>0){
while ($row[] = mysqli_fetch_assoc($results)){
    $jsonData = json_encode($row);
}

echo $jsonData;
}else{
    echo 'Failed Fetch';
}
