<?php
include 'dbConn.php';


$query = "SELECT * FROM campuses WHERE campusID = '1'";
$results = mysqli_query($db_conn,$query);

while($row = mysqli_fetch_assoc($results) ){
    echo $row['campusID'];
    echo $row['name'];
    echo $row['regionSpecs'];

}
