<?php
include 'dbConn.php';

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$email = $DecodedData['Email'];
$Pass = $DecodedData['Password'];
$name = $DecodedData['Name'];
$Phone = $DecodedData['Phone'];
$inst = $DecodedData['Institution'];

$Pass = md5($Pass);


$query = "SELECT * FROM users WHERE Email = '$email'";
$results = mysqli_query($db_conn,$query);


$query1 = "SELECT * FROM users";
$results1 = mysqli_query($db_conn,$query1);


$query3 = "SELECT * FROM campuses WHERE campusID = '$inst'";
$results3 = mysqli_query($db_conn,$query3);

while($row0 = mysqli_fetch_assoc($results3)){
    $campName = $row0['name'];
    $regionSpecs = $row0['regionSpecs'];
}
$userID = mysqli_num_rows($results1);
$userID = $userID + 1;
// echo mysqli_num_rows($results);
if(mysqli_num_rows($results)>0){
    echo 'Email already used';
}else{
    $query2= "INSERT INTO users(Name,Email,Phone,Institution, Password) VALUES('$name','$email','$Phone','$inst','$Pass')";
    $results2 = mysqli_query($db_conn, $query2);

if($results2){
    $row = array('Name'=>$name,'Password'=>$Pass,'Institution'=>$inst,'Email'=>$email,'Phone'=>$Phone,'userID'=>$userID,'campName'=>$campName, 'regionSpecs'=>$regionSpecs);
    echo $jsonData = json_encode($row);
}else{
    echo 'something went wrong...';
}
}
?>