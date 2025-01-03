<?php
$uploadDir = "uploads/";
if(!is_dir($uploadDir)){
	mkdir($uploadDir);
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$file = $_FILES['media'];
	$caption = $_POST['caption'];

	$fileName = basename($file['name']);
	$targetPath = $uploadDir.$fileName;

	if(move_uploaded_file($file['tmp_name'], $targetPath)){
		$pdo = new PDO("mysql:host=localhost;dbname=media_db", "root", "");
		$stmt = $pdo -> prepare("INSERT INTO media (file_path, caption) VALUES (?, ?)");
			$stmt -> execute([$targetPath, $caption]);

			echo "File uploaded successfully!";
	} else{
		echo "Failed to upload file.";
	}
}
?>