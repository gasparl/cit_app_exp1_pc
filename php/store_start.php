<?php

$sid = $_POST['sid_post'];
$dems = $_POST['dems_post'];
$subj_group = $_POST['subj_group_post'];
$experiment_title = $_POST['exp_title_post'];

file_put_contents('../../results/dems_lextale_' . $experiment_title . '.txt', $dems, FILE_APPEND);

$con = mysqli_connect("lukacsg89.mysql.univie.ac.at", "lukacsg89", "choice12", "lukacsg89");
// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL! Contact gaspar.lukacs@univie.ac.at, also copying the following error message: \n (Start)" . mysqli_connect_error() ;
}

$sql="INSERT INTO cit_all_data (all_data_id, group_code, subject_id, began, finished, demographics, main_data) VALUES (NULL, '$subj_group', '$sid', CURRENT_TIME(), NULL, '$dems', NULL);";

if (!mysqli_query($con,$sql))
{
    echo "Failed to save data! Please do not close this page, but contact gaspar.lukacs@univie.ac.at, also copying the following error message: \n (Start)" . mysqli_error($con);
    die('Error: ' . mysqli_error($con));
}
mysqli_close($con);

?>
