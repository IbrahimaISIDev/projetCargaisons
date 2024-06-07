<?php
session_start();

// header('Content-Type: application/json');

// function readJSON($filename) {
//     if (!file_exists($filename)) {
//         return ["cargaisons" => []];
//     }
//     $json_data = file_get_contents($filename);
//     return json_decode($json_data, true);
// }

// function writeJSON($filename, $data) {
//     $json_data = json_encode($data, JSON_PRETTY_PRINT);
//     file_put_contents($filename, $json_data);
// }

// try {
//     if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
//         $action = $_POST['action'];

//         if ($action === 'addCargaison') {
//             $newCargaison = [
//                 'id' => uniqid('C'),
//                 'type' => $data['type'],
//                 'poids_max' => $data['poids_max'],
//                 'prix_total' => $data['prix_total'],
//                 'lieuDepart' => $data['lieuDepart'],
//                 'lieuArrivee' => $data['lieuArrivee'],
//                 'distance_km' => $data['distance_km'],
//                 'dateDepart' => $data['dateDepart'],
//                 'dateArrivee' => $data['dateArrivee'],
//                 'etat' => 'Ouvert',
//                 'statut' => 'En attente',
//                 "produits" => []
//             ];

//             $data = readJSON('cargaisons.json');
//             $data['cargaisons'][] = $newCargaison;
//             writeJSON('cargaisons.json', $data);

//             echo json_encode(["status" => "success", "message" => "Cargaison ajoutée avec succès"]);
//             exit;
//         } else if ($action === 'addProduct' && isset($_POST['idcargo'])) {
//             $idcargo = $_POST['idcargo'];
//             $newProduct = [
//                 "idproduit" => uniqid(),
//                 "nombre_colis" => $_POST['nombre'],
//                 "poids" => $_POST['poids'],
//                 "type_produit" => $_POST['typeProduit'],
//                 "prix_total" => $_POST['formToxicityInput'],
//                 "type_materiel" => $_POST['typeMateriel'] ?? null,
//                 "taux_toxicite" => $_POST['formDiscountInput'] ?? null,
//                 "client" => [
//                     "nom" => $_POST['clientNom'],
//                     "prenom" => $_POST['clientPrenom'],
//                     "telephone" => $_POST['clientTelephone'],
//                     "adresse" => $_POST['clientAdresse'],
//                     "email" => $_POST['clientEmail']
//                 ],
//                 "destinataire" => [
//                     "nom" => $_POST['destinataireNom'],
//                     "prenom" => $_POST['destinatairePrenom'],
//                     "telephone" => $_POST['destinataireTelephone'],
//                     "adresse" => $_POST['destinataireAdresse'],
//                     "email" => $_POST['destinataireEmail']
//                 ]
//             ];

//             $data = readJSON('cargaisons.json');
//             $found = false;
//             foreach ($data['cargaisons'] as &$cargaison) {
//                 if ($cargaison['idcargo'] === $idcargo) {
//                     $cargaison['produits'][] = $newProduct;
//                     writeJSON('cargaisons.json', $data);
//                     echo json_encode(["status" => "success", "message" => "Produit ajouté avec succès"]);
//                     $found = true;
//                     break;
//                 }
//             }
//             if (!$found) {
//                 echo json_encode(["status" => "error", "message" => "Cargaison non trouvée"]);
//             }
//             exit;
//         } else {
//             echo json_encode(["status" => "error", "message" => "Action non valide"]);
//             exit;
//         }
//     } else {
//         echo json_encode(["status" => "error", "message" => "Requête non valide"]);
//         exit;
//     }
// } catch (Exception $e) {
//     echo json_encode(["status" => "error", "message" => $e->getMessage()]);
//     exit;
// }
