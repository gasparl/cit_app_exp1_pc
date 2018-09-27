<?php

// get IP
if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
{
  $subj_ip=$_SERVER['HTTP_CLIENT_IP'];
}
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
{
  $subj_ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
}
else
{
  $subj_ip=$_SERVER['REMOTE_ADDR'];
}

$sid = $_POST['sid_post'];
$dems = $_POST['dems_post'];
$lex_score = $_POST['lex_score_post'];
$lex_details = $_POST['lex_details_post'];

$con = mysqli_connect("lukacsg89.mysql.univie.ac.at","lukacsg89","choice12","lukacsg89");
// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL! Contact gaspar.lukacs@univie.ac.at, also copying the following error message: \n (LT)" . mysqli_connect_error() ;
}

$sql="INSERT INTO cit_lextale (lextale_id, ip, lextale_score, lex_details, subject_id, demographics, created) VALUES (NULL, '$subj_ip', '$lex_score', '$lex_details', '$sid', '$dems', CURRENT_TIME() );";

if (!mysqli_query($con,$sql))
{
    echo "Failed to save data! Please do not close this page, but contact gaspar.lukacs@univie.ac.at, also copying the following error message: \n (LT)" . mysqli_error($con);
    die('Error: ' . mysqli_error($con));
}
mysqli_close($con);

?>
