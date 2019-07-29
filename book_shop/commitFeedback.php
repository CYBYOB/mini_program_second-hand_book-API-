<?php
    // ������ϸ�Ĵ���
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //��mysql���������ļ��л�ȡ��ز���,�������ά��������ת�Ƶ��𵽷�������
    require_once 'mysql_connection_config.php';

    //��ȡ��������� user_id
    $user_id = $_GET['user_id'];
    $type = $_GET['type'];
    $content = $_GET['content'];
    $phone = $_GET['phone'];
     
    //    echo $user_id;

    // �������ݿ�
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("���ݿ�����ʧ��!");
    }

    // ���ݿ����ӳɹ���Ԥ����ȥ���룬��ֹ sqlע�� �Ȱ�ȫ���⣡��
    // mysqli_query($conn, "set names 'utf8'");
    $sql = 'insert into feedback(user_id, type, content, phone, timestamp)values(?,?,?,?,?)';
    $stmt=mysqli_prepare($conn,$sql);          
    $time = time();
    mysqli_stmt_bind_param($stmt,'sssss', $user_id, $type, $content, $phone, $time);

    //ִ�в����Ԥ���� sql��䡣
    mysqli_stmt_execute($stmt);
    if(mysqli_stmt_affected_rows($stmt)==1){
        echo "insert success";
     }else{ 
         echo "insert fail";
     }      

    //�ر����ݿ������
    mysqli_close($conn);
?>