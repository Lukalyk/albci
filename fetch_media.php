<?php
$pdo = new PDO("mysql:host=localhost;dbname=media_db", "root", "");
$stmt = $pdo -> query("SELECT * FROM media ORDER BY id DESC");

$media = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo json_encode($media);
?>

<!--For Deleting-->
<?php
if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$id = $_POST['id'];

	//fetch file path
	$stmt = $pdo -> prepare("SELECT file_path FROM media WHERE id = ?");
	$stmt -> execute([$id]);
	$filePath = $stmt -> fetchColumn();

	if($filePath && unlink($filePath)){
		$stmt = $pdo -> preapre("DELETE FROM media WHERE id = ?");
		$stmt -> execute([id]);
		echo "File deleted successfully.";
	} else{
		echo "Failed to delete file.";
	}
}
?>