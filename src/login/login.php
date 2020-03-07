<?php

$uname = $_POST['username'];
$upass = $_POST['password'];

// echo "用户名:$uname,密码是：$upass"

$link = mysqli_connect('localhost','root','root','test2');

$sql = "SELECT * FROM `login` WHERE `username`='$uname' AND `password` = '$upass'";

$res = mysqli_query($link,$sql);

$row = mysqli_fetch_assoc($res);

mysqli_close($link);

// if($row){
//     echo '登录成功';
// }else{
//     echo '登录失败';
// }

if($row){
    $arr = array("message" => "登录成功", "code" => 1);
}else{
    $arr = array("message" => "登录失败", "code" => 0);
}

print_r(json_encode($arr));
?>