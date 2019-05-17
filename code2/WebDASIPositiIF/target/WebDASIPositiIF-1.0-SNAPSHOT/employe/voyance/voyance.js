/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function afficherVoyance() {
    
    $.ajax({
        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'afficherVoyance'
        },
        dataType: 'json'        // Type de retour attendu
        
    }).done(function (response) {
        if(response.client != null) {
            var aRemplir = document.getElementById("voyance");
            
            if(response.client.hasOwnProperty("nom")) {
                
                var head = document.createElement("h2");
                var headText = document.createTextNode(response.client.civilite +" "+ response.client.nom +" "+ response.client.prenom);
                head.appendChild(headText);
            
                var profilClient = document.createElement("ul");
                var zodiac = document.createElement("li");
                var zodiacText = document.createTextNode(response.client.signeAstro);
                zodiac.appendChild(zodiacText);
            
                var couleur = document.createElement("li");
                var couleurText = document.createTextNode(response.client.couleurPorteBonheur);
                zodiac.appendChild(couleurText);
            
                var animal = document.createElement("li");
                var animalText = document.createTextNode(response.client.animalTotem);
                zodiac.appendChild(animalText);
            
                profilClient.appendChild(zodiac);
                profilClient.appendChild(couleur);
                profilClient.appendChild(animal);
            
                aRemplir.appendChild(head);
                aRemplir.appendChild(profilClient);
                console.log('Réussite');
                
                var bouton = document.createElement("button");
                bouton.setAttribute("class", "joli-bouton");
                var textBouton = document.createTextNode("Accepter la demande de voyance");
                bouton.appendChild(textBouton);
                profilClient.appendChild(bouton);

            } else {
                aRemplir.innerHTML = "Vous n'avez pas de voyance en cours";
            }
        }
        else
        {
            console.log('Echec de l\'affichage de la voyance en cours');
        }
        // ici votre code...
        // 
        // si connexion ok, aller sur la page suivante :
        //window.location = "maPageSuivante.html";
        // si connexion pas ok afficher un texte dans la div #message :
        //$('#message').html('Echec de la connexion');

    }).fail( function (error) { // Appel KO => erreur a gérer

        // Popup avec message d'erreur :
        alert('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
        // Message d'erreur dans la div #message :
        $('#message').html('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
    });
}

function acceptation() {
    
    $.ajax({

        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'deconnexion'
        },
        dataType: 'text'        // Type de retour attendu

    }).done(function () {  // Appel OK => "response" contient le resultat ;
        window.location= "../voyance/voyanceAcceptee.html";
    }).fail( function (error) { // Appel KO => erreur a gérer
        //
        // Popup avec message d'erreur :
        alert('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
        // Message d'erreur dans la div #message :
        $('#message').html('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));

    });
}

$(document).ready(function () {

        console.log('Page chargee => Debut du Script');
        afficherVoyance();
        
        $('#bouton-acceptation').on('click', function() {

            // affichage pour debugage dans la console javascript du navigateur
            console.log('Click sur le bouton "Accepter la demande"');

            // appel de la fonction deconnexion
            acceptation();
            
        });
    });
