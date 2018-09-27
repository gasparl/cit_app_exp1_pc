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

$file_name=('../../results/' . $_POST['filename_post']);
$subject_results = $_POST['results_post'];
$sid = $_POST['sid_post'];
$experiment_title = $_POST['exp_title_post'];
$subj_group = $_POST['cond_post'];
$dems = $_POST['dems_post'];

file_put_contents($file_name, $subject_results, FILE_APPEND);
file_put_contents('../../results/demographics_' . $experiment_title . '.txt', $dems, FILE_APPEND);

$con = mysqli_connect("lukacsg89.mysql.univie.ac.at","lukacsg89","choice12","lukacsg89");
// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL! Please do not close this page, but contact gaspar.lukacs@univie.ac.at, also copying the following error message: \n (End) " . mysqli_connect_error() ;
}

$sql="UPDATE cit_all_data SET finished = CURRENT_TIME(), demographics = '$dems', main_data = '$subject_results' WHERE subject_id = '$sid' ORDER BY all_data_id DESC LIMIT 1; INSERT INTO cit_screening_data (scr_data_id, ip, subject_id, group_code, created) VALUES ( NULL, '$subj_ip', '$sid','$subj_group', CURRENT_TIME() );";

if (!mysqli_multi_query($con,$sql))
{
    die('Failed to save data! Please do not close this page, but contact gaspar.lukacs@univie.ac.at, also copying the following error message: \n (End) ' . mysqli_error($con));
} else {
    if ( strlen($sid) > 5 AND  strlen($subject_results) > 9000) {
        echo 'rsWT59wf45f';
    } else {
        echo '_';
    }
}

mysqli_close($con);
?>
