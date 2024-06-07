<?php
// Démarrer la session pour stocker les données
session_start();

// Vérifiez si les données sont déjà stockées dans la session
if (!isset($_SESSION['cargaisons'])) {
    $data = file_get_contents('/var/www/html/projetCargaisons/data/listCargo.json');
    $_SESSION['cargaisons'] = json_decode($data, true)['cargaisons'] ?? [];
}

// Ajoutez cette section pour traiter les données du formulaire
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['type']) && isset($_POST['dateDepart']) && isset($_POST['dateArrivee']) && isset($_POST['distance'])) {
    $newCargo = [
        'idcargo' => count($_SESSION['cargaisons']) + 1, // Génération d'un nouvel ID
        'type' => $_POST['type'],
        'dateDepart' => $_POST['dateDepart'],
        'dateArrivee' => $_POST['dateArrivee'],
        'distance' => $_POST['distance'],
        'etat' => 'En attente',
        'status' => 'Actif',
        'details' => '' // Ajoutez d'autres champs si nécessaire
    ];
    $_SESSION['cargaisons'][] = $newCargo;
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Cargaisons</title>
    <style>
        /* Ajoutez vos styles CSS ici */
    </style>
</head>

<body>
    <div class="p-4 mt-8 sm:ml-64">
        <div class="min-h-screen bg-gray-100 flex flex-col">
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-5xl font-bold text-center text-gray-900">
                        Gestion des Cargaisons
                    </h1>
                </div>
            </header>
            <main class="flex-1 p-6">
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div class="bg-white shadow rounded-lg p-6">
                        <div class="flex items-center">
                            <span class="block-shrink-0 bg-indigo-500 rounded-full p-5">
                                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                            </span>
                            <div class="ml-6">
                                <h3 class="text-2xl mb-2 font-bold text-gray-900 ">
                                    Cargaisons en cours</h3>
                                <p class="text-5xl font-bold text-gray-900" id="nbEnCours">24</p>
                                <div class="mt-6">
                                    <a href="#" class="inline-flex items-center px-3 py-3 text-lg font-bold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="allDetailsEnCOurs">
                                        Voir les détails
                                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="min-h-screen max-w-12xl bg-gray-100 py-6">
                        <div class="max-w-full mx-auto bg-white shadow rounded-lg p-6">
                            <span class="flex justify-between items-center">
                                <h2 class="text-2xl font-bold bg-b text-gray-900 mb-4">Liste des Cargaisons</h2>
                                <span>
                                    <button class="bg-blue-800 text-xl text-white font-bold px-4 py-2 rounded-lg" id="addCargoBtn" type="button">Add</button>
                                    <button class="bg-blue-800 text-xl text-white font-bold px-4 py-2 rounded-lg mb-2" id="viewCargoBtn">View</button>
                                </span>
                            </span>
                            <div class="mb-4">
                                <span class="flex gap-2 justify-center">
                                    <input class="border border-gray-300 p-3 rounded-lg w-full" type="text" placeholder="Rechercher..." id="searchInput">
                                    <button class="bg-blue-800 text-white px-6 py-2 font-bold text-xl rounded-lg" onclick="search()">Rechercher</button>
                                </span>
                            </div>
                            <table class="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th class="py-2 px-4 bg-gray-200 text-left">ID</th>
                                        <th class="py-2 px-4 bg-gray-200 text-left">Type</th>
                                        <th class="py-2 px-4 bg-gray-200 text-left">Date départ</th>
                                        <th class="py-2 px-4 bg-gray-200 text-left">Date d'arrivée</th>
                                        <th class="py-2 px-4 bg-gray-200 text-left">Distance(Km)</th>
                                        <th class="py-2 px-4 bg-gray-200 text-left">État</th>
                                        <th class="py-2 px-4 bg-gray-200 text-left">Status</th>
                                        <th class="py-2 px-4 bg-gray-200 text-left">Détails</th>
                                        <th class="py-2 px-4 bg-gray-200 text-left">Modifier</th>
                                    </tr>
                                </thead>
                                <tbody id="cargo-list">
                                    <?php foreach ($_SESSION['cargaisons'] as $cargaison) : ?>
                                        <tr>
                                            <td><?php echo htmlspecialchars($cargaison['idcargo']); ?></td>
                                            <td><?php echo htmlspecialchars($cargaison['type']); ?></td>
                                            <td><?php echo htmlspecialchars($cargaison['dateDepart']); ?></td>
                                            <td><?php echo htmlspecialchars($cargaison['dateArrivee']); ?></td>
                                            <td><?php echo htmlspecialchars($cargaison['distance']); ?></td>
                                            <td><?php echo htmlspecialchars($cargaison['etat']); ?></td>
                                            <td><?php echo htmlspecialchars($cargaison['status']); ?></td>
                                            <td><?php echo htmlspecialchars($cargaison['details']); ?></td>
                                            <td>
                                                <button class="editBtn" data-id="<?php echo htmlspecialchars($cargaison['idcargo']); ?>">Modifier</button>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                            <div id="pagination" class="flex justify-end mt-4 bg-gray-400"></div>
                        </div>
                    </div>

                   
                    <div id="addCargoModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50" style="display: none;">
                        <div class="bg-white rounded-lg p-4 relative w-full max-w-2xl">
                            <h1 class="text-4xl font-bold mb-6 flex items-center justify-center">Ajouter une Cargaison</h1>
                            <form id="addCargoForm" method="post" class="space-y-4">
                                <div>
                                    <div class="mt-2 space-y-2 text-xl" id="transportType">
                                        <label class="inline-flex items-center">
                                            <input type="radio" name="type" value="Maritime" class="form-radio" required>
                                            <span class="ml-2">Maritime</span>
                                        </label>
                                        <label class="inline-flex items-center">
                                            <input type="radio" name="type" value="Aérienne" class="form-radio">
                                            <span class="ml-2">Aérienne</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <input type="date" name="dateDepart" placeholder="Date de départ" class="form-input w-full text-xl border border-gray-300 rounded-lg px-4 py-2" required>
                                </div>
                                <div>
                                    <input type="date" name="dateArrivee" placeholder="Date d'arrivée" class="form-input w-full text-xl border border-gray-300 rounded-lg px-4 py-2" required>
                                </div>
                                <div>
                                    <input type="number" name="distance" placeholder="Distance" class="form-input w-full text-xl border border-gray-300 rounded-lg px-4 py-2" required>
                                </div>
                                <div class="flex justify-end">
                                    <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg" id="cancelAddBtn">Annuler</button>
                                    <button type="submit" class="bg-blue-800 text-white px-4 py-2 rounded-lg ml-2">Ajouter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script>
        // document.getElementById('addCargoBtn').addEventListener('click', function() {
        //     document.getElementById('addCargoModal').style.display = 'flex';
        // });

        // document.getElementById('cancelAddBtn').addEventListener('click', function() {
        //     document.getElementById('addCargoModal').style.display = 'none';
        // });

        // function search() {
        //     const input = document.getElementById('searchInput').value.toLowerCase();
        //     const table = document.getElementById('cargo-list');
        //     const rows = table.getElementsByTagName('tr');

        //     for (let i = 0; i < rows.length; i++) {
        //         const cells = rows[i].getElementsByTagName('td');
        //         let found = false;

        //         for (let j = 0; j < cells.length; j++) {
        //             if (cells[j].textContent.toLowerCase().includes(input)) {
        //                 found = true;
        //                 break;
        //             }
        //         }

        //         if (found) {
        //             rows[i].style.display = '';
        //         } else {
        //             rows[i].style.display = 'none';
        //         }
        //     }
        // }
    </script>
</body>

</html>