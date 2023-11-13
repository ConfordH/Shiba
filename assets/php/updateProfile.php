<?php
include 'dbConn.php';

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$email = $DecodedData['Email'];
$Pass = $DecodedData['Password'];
$name = $DecodedData['Name'];
$Phone = $DecodedData['Phone'];
$inst = $DecodedData['Institution'];
// $Pass = md5($Pass);
$prevEmail = $DecodedData['prevEmail'];
$userID = $DecodedData['userID'];

$queryCamp = "SELECT * FROM campuses WHERE campusID = '$inst'";
$resultsCamp = mysqli_query($db_conn,$queryCamp);

while($row = mysqli_fetch_assoc($resultsCamp) ){
    $campName = $row['name'];
    $regionSpecs =  $row['regionSpecs'];

}

$query = "SELECT * FROM users WHERE Email = '$prevEmail'";
$results = mysqli_query($db_conn,$query);

if(mysqli_num_rows($results)>0){
$query2 = "UPDATE users SET Name='$name',Email='$email',Phone='$Phone',campusID='$inst' WHERE Email = '$prevEmail' AND Password = '$Pass'";
$results2 = mysqli_query($db_conn,$query2);
    
if($results2){
    $row = array('Name'=>$name,'Password'=>$Pass,'campusID'=>$inst,'Email'=>$email,'Phone'=>$Phone,'userID'=>$userID,'campName'=>$campName, 'regionSpecs'=>$regionSpecs);
    echo $jsonData = json_encode($row);
}else{
    echo 'something went wrong...';
}
}else{

    echo 'Email not found';
}
