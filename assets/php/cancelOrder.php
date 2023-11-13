<?php
include 'dbConn.php';

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$orderID = $DecodedData['orderID'];
$orders = $DecodedData['orders'];

if ($orders != 'Remove') {
    $query = "SELECT * FROM orders WHERE orderID = '$orderID' AND status = 'Active'";
    $results = mysqli_query($db_conn, $query);

    if (mysqli_num_rows($results) > 0) {
        $query2 = "UPDATE orders SET orders='$orders' WHERE orderID = '$orderID'";
        $results2 = mysqli_query($db_conn, $query2);

        echo 'Order cancelled';
    } else {
        echo 'Sry You can not cancel this order';
    }
} 
else {
        $query2 = "DELETE FROM orders WHERE orderID='$orderID'";
        $results2 = mysqli_query($db_conn, $query2);
echo 'Order Removed';
}
