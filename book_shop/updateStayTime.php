<?php
    // ������ϸ�Ĵ���
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //��mysql���������ļ��л�ȡ��ز���,�������ά��������ת�Ƶ��𵽷�������
    require_once 'mysql_connection_config.php';

    //��ȡ��������� user_id��
    $user_id = $_GET['user_id'];
    $good_id = $_GET['good_id'];
    $stay_time = $_GET['stay_time'];
    
    //    echo $user_id;

    // �������ݿ�
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("���ݿ�����ʧ��!");
    }

    // ���ݿ����ӳɹ�
    // mysqli_query($conn, "set names 'utf8'");
    $sql = 'insert into stay_time(user_id, good_id, stay_time)values(?,?,?)';
    $stmt=mysqli_prepare($conn,$sql);          
    $time = time();
    mysqli_stmt_bind_param($stmt,'ssi', $user_id, $good_id, $stay_time);

    //ִ�в����Ԥ���� sql��䡣
    mysqli_stmt_execute($stmt);
    if(mysqli_stmt_affected_rows($stmt) == 1){
        echo "insert success";
     }else{ 
         echo "insert fail";
     }      
    

    //�ر����ݿ������
    mysqli_close($conn);
?>