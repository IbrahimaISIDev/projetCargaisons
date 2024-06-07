<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: none;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1001;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    #addProductModal {
        display: none;
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    #addProductModal .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        width: 80%;
        max-width: 600px;
    }
</style>

<div class="p-4 mt-8 sm:ml-64">
    <!-- Dashboard  Start-->
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
                <!-- Statistiques Clés -->
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

                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-green-500 rounded-full p-5">
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                        <div class="ml-6">
                            <h3 class="text-2xl mb-2 font-bold text-gray-900">Cargaisons terminées</h3>
                            <p class="text-5xl font-bold text-gray-900" id="terminés">120</p></span>
                            <a href="#" class="inline-flex items-center px-3 py-3 text-lg font-bold mt-6 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="allFinishDetails">
                                Voir les détails
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-red-500 rounded-full p-5">
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                        <div class="ml-6">
                            <h3 class="text-2xl font-bold mb-2 text-gray-900">Notifications</h3>
                            <p class="text-5xl font-bold text-gray-900" id="nbNotifications">5</p>
                            <a href="#" class="inline-flex items-center px-3 py-3 text-lg mt-6 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
                                <th class="py-2 px-4 bg-gray-200 text-left">Ajouter</th>
                            </tr>
                        </thead>
                        <?php
                        $jsonData = file_get_contents('../data/listCargo.json');

                        // Convertir le fichier JSON en un tableau PHP
                        $datas = json_decode($jsonData, true);
                        ?>
                        <tbody id="cargo-list">
                            <!-- Les lignes seront ajoutées dynamiquement -->
                            <?php if ($datas && isset($datas['tabCargaisons']) && !empty($datas['tabCargaisons'])) : ?>
                                <?php foreach ($datas['tabCargaisons'] as $index => $data) : ?>
                                    <tr>
                                        <td class="py-2 px-4"><?= $data['id'] ?></td>
                                        <td class="py-2 px-4"><?= $data['type'] ?></td>
                                        <td class="py-2 px-4"><?= $data['dateDepart'] ?></td>
                                        <td class="py-2 px-4"><?= $data['dateArrivee'] ?></td>
                                        <td class="py-2 px-4"><?= isset($data['distance']) && is_string($data['distance']) ? $data['distance'] : '' ?></td>
                                        <td class="py-2 px-4"><button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg"><?= isset($data['etat']) ? $data['etat'] : 'Ouvert' ?></td>
                                        <td class="py-2 px-4"><button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg"><?= isset($data['statut']) ? $data['statut'] : 'En attente' ?></td>
                                        <td class="py-2 px-4">
                                            <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">Voir</button>
                                        </td>
                                        <td class="py-2 px-4">
                                            <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg" id="editCargoBtn">Modifier</button>
                                        </td>
                                        <td class="py-2 px-4">
                                            <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg" id="btnAddProduct">+ Produit</button>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>

                        </tbody>
                    </table>
                    <div id="pagination" class="flex justify-end mt-4 bg-gray-400"></div>
                </div>
            </div>
            <div id="statusModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 items-center justify-center" style="display:none;">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-xl mb-4">Changer le statut</h2>
                    <form id="statusForm">
                        <select id="newStatus" class="w-full p-2 mb-4 border rounded">
                            <option value="En attente">En attente</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option>
                        </select>
                        <button type="submit" id="applyStatusChange" class="bg-blue-500 text-white px-4 py-2 rounded">Appliquer</button>
                        <button type="button" id="cancelStatusChange" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">Annuler</button>
                    </form>
                </div>
            </div>


            <!-- Modal pour ajouter une cargaison -->
            <div id="addCargoModal" class="fixed modal-backdrop" style="display:none;">
                <div class="bg-white rounded-lg p-4 relative w-full max-w-2xl">
                    <h1 class="text-4xl font-bold mb-6 flex items-center justify-center">Ajouter une Cargaison</h1>
                    <form id="addCargoForm" class="space-y-4">
                        <div>
                            <div class="mt-2 space-y-2 text-xl" id="transportType">
                                <label class="inline-flex items-center">
                                    <input type="radio" name="type" value="Maritime" class="form-radio">
                                    <span class="ml-4 mr-4 font-bold">Maritime</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" name="type" value="Terrestre" class="form-radio">
                                    <span class="ml-4 mr-4 font-bold">Terrestre</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" name="type" value="Aerien" class="form-radio">
                                    <span class="ml-4 mr-4 font-bold">Aérienne</span>
                                </label>
                            </div>
                            <span id="typeError" class="text-red-500"></span>
                        </div>
                        <div class="flex justify-between">
                            <span>
                                <label class="block text-lg font-medium text-gray-700">Date de Départ</label>
                                <input type="date" id="departureDate" name="dateDepart" class="mt-1 block w-72 border-gray-300 rounded-md mb-3 shadow-lg p-3">
                                <span id="dateDepartError" class="text-red-500"></span>
                            </span>
                            <span>
                                <label class="block text-lg font-medium text-gray-700">Date d'Arrivée</label>
                                <input type="date" id="arrivalDate" name="dateArrivee" class="mt-1 block w-72 border-gray-300 rounded-md shadow-lg p-3">
                                <span id="dateArriveeError" class="text-red-500"></span>
                            </span>
                        </div>
                        <div>
                            <label class="block text-xl mb-2 font-medium text-gray-700">Limite du chargement</label>
                            <select id="stopCriteria" class="mt-1 block w-full border-gray-300 rounded-md shadow-lg p-3">
                                <option value="nombre" id="maxProducts">Nombre Total de Produits</option>
                                <option value="masse" id="maxWeight">Masse Totale des Produits</option>
                                <span id="optionError" class="text-red-500"></span>
                            </select>
                            <input type="number" id="criteriaValue" class="mt-4 block w-full border-gray-300 rounded-md shadow-lg p-3" placeholder="Entrez la valeur">
                            <span id="criteriaValueError" class="text-red-500"></span>
                        </div>
                        <div id="mapModal" class="hidden fixed z-10 inset-0 overflow-y-auto">
                            <div class="flex items-center justify-center min-h-screen">
                                <div class="bg-white rounded-lg shadow-lg p-6">
                                    <div id="mapContainer" class="h-96 w-96"></div>
                                    <button id="closeMapModal" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="mapSection">
                            <label class="block text-xl mb-2 font-medium text-gray-700">Choisir le Trajet</label>
                            <div id="map" class="w-full h-64 bg-gray-200"></div>
                            <span class="flex justify-between mb-2">
                                <input type="text" id="countryName" class="mt-1 w-72 border-gray-300 rounded-md shadow-lg" readonly>
                                <input type="text" id="arrivalCountry" class="mt-1 w-72 border-gray-300 rounded-md shadow-lg" readonly>
                            </span>
                            <span id="mapError" class="text-red-500"></span>
                        </div>
                        <div>
                            <label class="block text-lg font-medium text-gray-700">Distance(Km)</label>
                            <input type="text" id="distance" name="distance" class="mt-1 block w-full border-gray-300 rounded-md shadow-lg" readonly>
                        </div>
                        <div id="message" class="text-red-500"></div>

                        <div class="flex justify-between">
                            <button type="button" class="bg-red-500 text-white px-4 py-2 rounded" id="cancelBtn">Annuler</button>
                            <button id="addCargoModalBtn" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
                        </div>

                    </form>
                </div>
            </div>

            <!-- Ajout Produit : Début -->
            <div id="addProductModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 items-center justify-center" style="display:none;">
                <div class="modal-content bg-white p-6 rounded-lg shadow-lg relative">
                    <button class="closeModal absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
                    <h1 class="text-2xl font-bold mb-8">Ajouter un Produit</h1>
                    <form id="addProductForm">
                        <!-- Infos du produit -->
                        <fieldset id="step1" class="mb-8">
                            <legend class="text-xl font-semibold mb-4">Infos du produit</legend>
                            <div class="mb-4">
                                <label for="libelle" class="block text-sm font-medium text-gray-700">Libellé :</label>
                                <input type="text" id="libelle" name="libelle" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="prix" class="block text-sm font-medium text-gray-700">Prix du produit :</label>
                                <input type="number" id="prix" name="prix" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="poids" class="block text-sm font-medium text-gray-700">Poids du produit :</label>
                                <input type="number" id="poids" name="poids" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="type" class="block text-sm font-medium text-gray-700">Type de produit :</label>
                                <select id="type" name="type" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                                    <option value="alimentaire">Alimentaire</option>
                                    <option value="materiel">Matériel</option>
                                    <option value="chimique">Chimiques</option>
                                </select>
                            </div>
                            <div id="chimiqueFields" class="mb-4 hidden">
                                <label for="toxicite" class="block text-sm font-medium text-gray-700">Degré de toxicité :</label>
                                <input type="text" id="toxicite" name="toxicite" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            </div>
                            <div id="materielFields" class="mb-4 hidden">
                                <label for="etat" class="block text-sm font-medium text-gray-700">État du produit :</label>
                                <select id="etat" name="etat" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="fragile">Fragile</option>
                                    <option value="incassable">Incassable</option>
                                </select>
                            </div>
                            <button type="button" id="nextToStep2" class="bg-blue-500 text-white p-2 rounded">Suivant</button>
                        </fieldset>

                        <!-- Infos du client -->
                        <fieldset id="step2" class="mb-8 hidden">
                            <legend class="text-xl font-semibold mb-4">Infos du client</legend>
                            <div class="mb-4">
                                <label for="nomClient" class="block text-sm font-medium text-gray-700">Nom :</label>
                                <input type="text" id="nomClient" name="nomClient" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="prenomClient" class="block text-sm font-medium text-gray-700">Prénom :</label>
                                <input type="text" id="prenomClient" name="prenomClient" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="telClient" class="block text-sm font-medium text-gray-700">Téléphone :</label>
                                <input type="tel" id="telClient" name="telClient" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="adresseClient" class="block text-sm font-medium text-gray-700">Adresse :</label>
                                <input type="text" id="adresseClient" name="adresseClient" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="emailClient" class="block text-sm font-medium text-gray-700">Email :</label>
                                <input type="email" id="emailClient" name="emailClient" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            </div>
                            <div class="flex justify-between">
                                <button type="button" id="backToStep1" class="bg-gray-500 text-white p-2 rounded">Retour</button>
                                <button type="button" id="nextToStep3" class="bg-blue-500 text-white p-2 rounded">Suivant</button>
                            </div>
                        </fieldset>

                        <!-- Infos de la cargaison -->
                        <fieldset id="step3" class="mb-8 hidden">
                            <legend class="text-xl font-semibold mb-4">Infos de la cargaison</legend>
                            <div class="mb-4">
                                <label for="lieuDepart" class="block text-sm font-medium text-gray-700">Lieu de départ :</label>
                                <input type="text" id="lieuDepart" name="lieuDepart" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="lieuArrivee" class="block text-sm font-medium text-gray-700">Lieu d'arrivée :</label>
                                <input type="text" id="lieuArrivee" name="lieuArrivee" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="dateDepart" class="block text-sm font-medium text-gray-700">Date de départ :</label>
                                <input type="date" id="dateDepart" name="dateDepart" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="mb-4">
                                <label for="dateArrivee" class="block text-sm font-medium text-gray-700">Date d'arrivée :</label>
                                <input type="date" id="dateArrivee" name="dateArrivee" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            </div>
                            <div class="flex justify-between">
                                <button type="button" id="backToStep2" class="bg-gray-500 text-white p-2 rounded">Retour</button>
                                <button type="submit" id="btnAddProductInsideModal" class="bg-green-500 text-white p-2 rounded">Ajouter le produit</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>




            <!-- Je veux dés l'instant que je click au niveau du bouton se trouvant au  niveau de 
            la colonne "Statut" que j'ai la possibilité à l'aide d'un modal de changer le contenu du bouton 
            par : En attente, En cours, Terminé avec changement aussi du background du bouton ! 
            Et de meme pour l'état par : Ouvert et Fermé !
            -->

            <!-- Modal pour la modification de cargaison -->
            <div id="editCargoModal" class="flex fixed inset-0 bg-gray-900 bg-opacity-75 items-center justify-center z-50" style="display: none;">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="bg-white rounded-lg p-6 w-96 max-w-3xl">
                        <h3 class="text-2xl font-bold mb-4">Modifier la cargaison</h3>
                        <form id="editCargoForm">
                            <input type="hidden" id="editCargoId">
                            <div class="mb-4">
                                <label for="editType" class="block text-sm font-bold mb-2">Type:</label>
                                <input type="text" id="editType" class="border p-2 rounded-lg w-full">
                            </div>
                            <div class="mb-4">
                                <label for="editDateDepart" class="block text-sm font-bold mb-2">Date de
                                    départ:</label>
                                <input type="date" id="editDateDepart" class="border p-2 rounded-lg w-full">
                            </div>
                            <div class="mb-4">
                                <label for="editDateArrivee" class="block text-sm font-bold mb-2">Date
                                    d'arrivée:</label>
                                <input type="date" id="editDateArrivee" class="border p-2 rounded-lg w-full">
                            </div>
                            <div class="mb-4">
                                <label for="editEtat" class="block text-sm font-bold mb-2">État:</label>
                                <select id="editEtat" class="border p-2 rounded-lg w-full">
                                    <option value="">Veuillez choisir un état</option>
                                    <option value="Ouvert">Ouvert</option>
                                    <option value="Fermé">Fermé</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label for="editStatus" class="block text-sm font-bold mb-2">Status:</label>
                                <select id="editStatus" class="border p-2 rounded-lg w-full">
                                    <option value="">Veuillez choisir un status</option>
                                    <option value="En attente">En attente</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Terminé">Terminé</option>
                                </select>
                            </div>

                            <div class="flex justify-between">
                                <button type="button" id="cancelEditBtn" class="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Annuler</button>
                                <button type="submit" class="bg-blue-800 text-white px-4 py-2 rounded-lg">Enregistrer</button>
                            </div>
                            <button id="deleteCargoBtn" class="bg-red-800 text-lg font-bold text-white px-4 py-2 rounded-lg mt-6 w-full">Supprimer</button>
                        </form>
                    </div>
                </div>
            </div>
    </div>
    <!-- <script src="../dist/addCargaison.js"></script> -->
    <script src="../dist/jsondata.js"></script>
    <!-- <script src="../dist/jsondata2.js"></script> -->
    <script src="../dist/addProduct.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js" integrity="sha512-WpK/HU8oG0I5KFQ7xOpi7zpF+U9vOB+N4u1+Q6kLOp6dhXtl1nFUVHvA/P/V0kmvR4J2y3WqK0rDmiIvTb1gIQ==" crossorigin=""></script>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>