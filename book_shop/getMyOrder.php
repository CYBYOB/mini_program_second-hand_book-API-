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
$sql = "select * from my_order,my_order_detail,good where my_order.user_id = '{$user_id}' and my_order.order_id=my_order_detail.my_order_id and my_order_detail.good_id=good.id";

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