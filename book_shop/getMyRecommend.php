<?php
    // ������ϸ�Ĵ���
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //��mysql���������ļ��л�ȡ��ز���,�������ά��������ת�Ƶ��𵽷�������
    require_once 'mysql_connection_config.php';

    //��ȡ��������� user_id
    $user_id = $_GET['user_id'];
    //    echo $user_id;

    // �������ݿ�
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("���ݿ�����ʧ��!");
    }

    // ���ݿ����ӳɹ�
    // mysqli_query($conn, "set names 'utf8'");
    
    // ���´����������㷨�����Ƽ��鼮 = �����鼮 + ͣ��ʱ������鼮
    $arr = array();
    //�����鼮�б����� 5��
    $sql = "select * from hot_sale, good where hot_sale.good_id=good.id group by id limit 5";
    $res = mysqli_query($conn, $sql);
    if ( mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_array($res)) {
            array_push($arr,$row); 	#������¼�Ͱ������� �����У� ���������顱 ��
        }
    }
	
    //ͣ��ʱ����� ǰ5����
    $sql = "select * from stay_time, good where user_id='{$user_id}' and stay_time.good_id=good.id group by id,stay_time limit 5";
    $res = mysqli_query($conn, $sql);
    if ( mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_array($res)) {
            array_push($arr,$row); 	#������¼�Ͱ������� �����У� ���������顱 ��
        }
    }

    //���������ر����ݿ������
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    mysqli_close($conn);
?>