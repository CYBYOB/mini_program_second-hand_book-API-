<?php
    // ������ϸ�Ĵ���
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //��mysql���������ļ��л�ȡ��ز���,�������ά��������ת�Ƶ��𵽷�������
    require_once 'mysql_connection_config.php';

    //��ȡ��������� user_id
    $user_id = $_GET['user_id'];
    $deleteItemsId = explode(',', $_GET['deleteItemsId']);
    
    //print_r(explode(',', $deleteItemsId));
    //var_dump($deleteItemsId);
    //echo $user_id;

    // �������ݿ�
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("���ݿ�����ʧ��!");
    }
    


    // ���ݿ����ӳɹ�
    // mysqli_query($conn, "set names 'utf8'");
    //���ϵ�ѭ��ȥɾ�� �ղ��б�
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

    //�ر����ݿ������
    mysqli_close($conn);
?>