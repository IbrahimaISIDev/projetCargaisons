<?php
header('Content-Type: application/json');

// Fonction pour lire le fichier JSON
function readJSON($filename)
{
    if (!file_exists($filename)) {
        return ["tabCargaisons" => []];
    }
    $json_data = file_get_contents($filename);
    $data = json_decode($json_data, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return ["tabCargaisons" => []];
    }
    return $data;
}

// Fonction pour écrire dans le fichier JSON
function writeJSON($filename, $data)
{
    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return false;
    }
    return file_put_contents($filename, $json_data) !== false;
}

// Lire le fichier JSON existant
$data = readJSON('listCargo.json');

// Initialiser les compteurs pour chaque type de cargaison
$counters = [
    'Maritime' => 0,
    'Terrestre' => 0,
    'Aerien' => 0
];

// Définir les compteurs en analysant les cargaisons existantes
if (isset($data['tabCargaisons']) && is_array($data['tabCargaisons'])) {
    foreach ($data['tabCargaisons'] as $cargaison) {
        $type = $cargaison['type'];
        if (array_key_exists($type, $counters)) {
            $counters[$type]++;
        }
    }
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
        $action = $_POST['action'];
        if ($action === 'addCargaison') {
            // Vérifier que toutes les données requises sont présentes
            $requiredFields = ['type', 'dateDepart', 'dateArrivee', 'etat', 'statut', 'stopCriteria', 'criteriaValue', 'countryName', 'arrivalCountry', 'distance'];
            foreach ($requiredFields as $field) {
                if (!isset($_POST[$field])) {
                    echo json_encode(["status" => "error", "message" => "Données manquantes pour le champ '$field'"]);
                    exit;
                }
            }

            $type = $_POST['type'];
            if (!array_key_exists($type, $counters)) {
                echo json_encode(["status" => "error", "message" => "Type de cargaison invalide"]);
                exit;
            }

            $counters[$type]++;
            $idPrefix = strtoupper($type[0]);
            $idNumber = str_pad($counters[$type], 3, '0', STR_PAD_LEFT);
            $id = $idPrefix . $idNumber;

            $newCargaison = [
                "id" => $id,
                "type" => $_POST['type'],
                "dateDepart" => $_POST['dateDepart'],
                "dateArrivee" => $_POST['dateArrivee'],
                "etat" => $_POST['etat'],
                "statut" => $_POST['statut'],
                "stopCriteria" => $_POST['stopCriteria'],
                "criteriaValue" => $_POST['criteriaValue'],
                "countryName" => $_POST['countryName'],
                "arrivalCountry" => $_POST['arrivalCountry'],
                "distance" => $_POST['distance'],
                "produits" => []
            ];

            $data['tabCargaisons'][] = $newCargaison;
            if (writeJSON('listCargo.json', $data)) {
                echo json_encode(["status" => "success", "message" => "Cargaison ajoutée avec succès", "id" => $id]);
            } else {
                echo json_encode(["status" => "error", "message" => "Erreur lors de l'écriture du fichier JSON"]);
            }
            exit;
        } else {
            echo json_encode(["status" => "error", "message" => "Action non valide"]);
            exit;
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
        $action = $_GET['action'];
        if ($action === 'getCargaisons') {
            echo json_encode(["status" => "success", "cargaisons" => $data['tabCargaisons']]);
            exit;
        } else {
            echo json_encode(["status" => "error", "message" => "Action non valide"]);
            exit;
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Requête non valide"]);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    exit;
}
