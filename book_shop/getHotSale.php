<?php
    // ������ϸ�Ĵ���
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //��mysql���������ļ��л�ȡ��ز���,�������ά��������ת�Ƶ��𵽷�������
    require_once 'mysql_connection_config.php';

    //��ȡ��������ݣ���ȡ���� �����鼮�������ݴ��롣

    // �������ݿ�
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("���ݿ�����ʧ��!");
    }

    // ���ݿ����ӳɹ�
    // mysqli_query($conn, "set names 'utf8'");
    $sql = "select * from hot_sale, good where hot_sale.good_id=good.id group by id";
    $res = mysqli_query($conn, $sql);
    $arr = array();
    if ( mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_array($res)) {
            array_push($arr,$row); 	#������¼�Ͱ������� �����У� ���������顱 ��
        }
    }

    //���������ر����ݿ������
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    mysqli_close($conn);
?>