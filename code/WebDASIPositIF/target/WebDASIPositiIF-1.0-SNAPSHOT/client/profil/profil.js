/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function historique() {

    // Requête AJAX
    $.ajax({

        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'historiqueClient'
        },
        dataType: 'json'        // Type de retour attendu

    }).done( function (response) {  // Appel OK => "response" contient le resultat JSON ;
        if(response.Consultations.consultations != null) {
            var tab = document.getElementById("table");
            for(var i = 0; i<response.consultations.length; i++) {
                tab.innerHTML += "<tr>\n\
                            <td>" + response.Consultations.consultations[i].medium.nom + "</td>\n\
                            <td>" + response.Consultations.consultations[i].date + "</td>\n\
                        </tr>";
            }
            $('#message').html(' Reussite ');
        }
        else
        {
            $('#message').html('Echec de l\'historique');
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

function profil() {
    
    
    $.ajax({

        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'infoClient',
        },
        dataType: 'json'        // Type de retour attendu

    }).done( function (response) {  // Appel OK => "response" contient le resultat JSON ;
        if(response.Client != null) {
            $('#SigneZodiaque').html("Signe Astrologique : " + response.Client.signeAstro);
            $('#Couleur').html("Couleur Porte-Bonheur : " + response.Client.couleur);
            $('#Animal').html("Animal Totem : " + response.Client.animal);
            $('#message').html(' Reussite ');
        }
        else
        {
            $('#message').html('Echec de l\'historique');
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

    }).done(function () {  // Appel OK => "response" contient le resultat JSON ;
        window.location= "../..";
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
        historique();
        profil();
        
        $('#bouton-deconnexion').on('click', function() {

            // affichage pour debugage dans la console javascript du navigateur
            console.log('Click sur le bouton "Se Deconnecter"');

            // appel de la fonction deconnexion
            deconnexion();

        });
    });