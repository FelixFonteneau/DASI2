/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function genererPrediction(){
    
    var valeurAmour = document.getElementById("pointsAmour").value;
    var valeurSante = document.getElementById("pointsSante").value;
    var valeurTravail = document.getElementById("pointsTravail").value;
    $.ajax({
        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'genererPrediction',
            niveauAmour: valeurAmour,
            niveauSante: valeurSante,
            niveauTravail: valeurTravail
        },
        dataType: 'json'        // Type de retour attendu
        
    }).done(function (response) {
        if(response.Predictions != null) {
            document.getElementById("resultatAmour").innerHTML = response.Predictions[0].prediction;
            document.getElementById("resultatSante").innerHTML = response.Predictions[1].prediction;
            document.getElementById("resultatTravail").innerHTML = response.Predictions[2].prediction;
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

function cloreConsultation(){
    var commentaire = document.getElementById("commentaire").innerHTML;
    $.ajax({
        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'cloreConsultation',
            commentaire: commentaire
        },
        dataType: 'text'        // Type de retour attendu
    }).done(function () {  // Appel OK => "response" contient le resultat ;
        alert("La consultation a bien été terminée.")
        window.location= "../profil";
    }).fail( function (error) { // Appel KO => erreur a gérer
        //
        // Popup avec message d'erreur :
        alert('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
        // Message d'erreur dans la div #message :
        $('#message').html('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
    });
}
function afficherVoyance(boutton) {
    
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
                var zodiacText = document.createTextNode("Signe du zodiaque : "+response.client.signeAstro);
                zodiac.appendChild(zodiacText);
            
                var couleur = document.createElement("li");
                var couleurText = document.createTextNode("Couleur porte-bonheur : "+response.client.couleurPorteBonheur);
                couleur.appendChild(couleurText);
            
                var animal = document.createElement("li");
                var animalText = document.createTextNode("Animal-Totems : "+response.client.animalTotem);
                animal.appendChild(animalText);
            
                profilClient.appendChild(zodiac);
                profilClient.appendChild(couleur);
                profilClient.appendChild(animal);
            
                aRemplir.appendChild(head);
                aRemplir.appendChild(profilClient);
                console.log('Réussite');
                if(boutton){                                  
                    var bouton = document.createElement("button");
                    bouton.setAttribute("class", "joli-bouton");
                    bouton.setAttribute("id", "bouton-acceptation");
                    bouton.setAttribute("onclick","accepter()");
                    var textBouton = document.createTextNode("Accepter la demande de voyance");
                    bouton.appendChild(textBouton);
                    aRemplir.appendChild(bouton);
                }

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


function deconnexion() {
    
    $.ajax({

        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'deconnexion'
        },
        dataType: 'text'        // Type de retour attendu

    }).done(function () {  // Appel OK => "response" contient le resultat ;
        window.location= "../..";
    }).fail( function (error) { // Appel KO => erreur a gérer
        //
        // Popup avec message d'erreur :
        alert('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
        // Message d'erreur dans la div #message :
        $('#message').html('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));

    });
}

function accepter(){
    console.log('Click sur le bouton "Accepter la demande"');
    window.location= "voyance_en_cours.html";
}

