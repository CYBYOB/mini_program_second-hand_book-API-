<?php
    // 报告详细的错误
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //从mysql连接配置文件中获取相关参数,方便后期维护，数据转移到别到服务器上
    require_once 'mysql_connection_config.php';

    //获取请求的数据 user_id
    $user_id = $_GET['user_id'];
    //    echo $user_id;

    // 连接数据库
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("数据库连接失败!");
    }

    // 数据库连接成功
    // mysqli_query($conn, "set names 'utf8'");
    
    // “仿大数据推送算法”。推荐书籍 = 热销书籍 + 停留时间最长的书籍
    $arr = array();
    //热销书籍列表，限制 5条
    $sql = "select * from hot_sale, good where hot_sale.good_id=good.id group by id limit 5";
    $res = mysqli_query($conn, $sql);
    if ( mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_array($res)) {
            array_push($arr,$row); 	#多条记录就把它放入 数组中， “对象数组” 。
        }
    }
	
    //停留时间最长的 前5本书
    $sql = "select * from stay_time, good where user_id='{$user_id}' and stay_time.good_id=good.id group by id,stay_time limit 5";
    $res = mysqli_query($conn, $sql);
    if ( mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_array($res)) {
            array_push($arr,$row); 	#多条记录就把它放入 数组中， “对象数组” 。
        }
    }

    //输出结果并关闭数据库的连接
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    mysqli_close($conn);
?>