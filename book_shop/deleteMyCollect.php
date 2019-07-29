<?php
    // 报告详细的错误
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //从mysql连接配置文件中获取相关参数,方便后期维护，数据转移到别到服务器上
    require_once 'mysql_connection_config.php';

    //获取请求的数据 user_id
    $user_id = $_GET['user_id'];
    $deleteItemsId = explode(',', $_GET['deleteItemsId']);
    
    //print_r(explode(',', $deleteItemsId));
    //var_dump($deleteItemsId);
    //echo $user_id;

    // 连接数据库
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("数据库连接失败!");
    }
    


    // 数据库连接成功
    // mysqli_query($conn, "set names 'utf8'");
    //不断地循环去删除 收藏列表
    for($i=0; $i < count($deleteItemsId); $i++) {
echo $deleteItemsId[$i];
        $sql = "delete from collect where user_id='{$user_id}' and good_id='{$deleteItemsId[$i]}'";
echo $sql;        
$res = mysqli_query($conn, $sql);
        $arr = array();
echo $res;
        if (!$res) {
            echo 'delete fail';
        }
        else {
            echo 'delete success';  
         }
    }

    //关闭数据库的连接
    mysqli_close($conn);
?>