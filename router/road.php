<?php

$page = isset($_GET['page']) ? $_GET['page'] : 'newDashboard';
$file = "$page.php";

if (file_exists($file)) {
    include 'sidebar.php';
    $data = ["tabCargaisons"];
    include $file;
} else {
    echo "Page non trouvée";
}

// Chemin vers le fichier JSON
$file_path = 'data/listCargo.json';
