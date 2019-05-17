/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function connexion() {

    var champLogin = $('#champ-login').val();
    var champPassword = $('#champ-password').val();

    // Message d'information dans la div #message :
    $('#message').html('Connexion en cours...');

    // Requête AJAX
    $.ajax({

        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'connecterClient',
            login: champLogin,
            password: champPassword
        },
        dataType: 'json'        // Type de retour attendu

    }).done( function (response) {  // Appel OK => "response" contient le resultat JSON ;
        if(response.Connexion.connexion === "connecte")
        {
            window.location = "../profil";
            $('#message').html(' Reussite ' );     
        }
        else
        {
            $('#message').html('Echec de la connexion');
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

function inscription() {

    var champPrenom = $('#champ-prenom').val();
    var champNom = $('#champ-nom').val();
    var champAdresse = $('#champ-adresse').val();
    var champTelephone = $('#champ-tel').val();
    var champMail = $('#champ-mail').val();
    var champDate = $('#champ-date').val();
    var champPassword = $('#password').val();
    var champCivilite;
    
    if (document.getElementById("radioM").checked === true){
        champCivilite = "M.";
    } else if (document.getElementById("radioMme").checked === true){
        champCivilite = "Mme";
    } else if (document.getElementById("radioAutre").checked === true){
        champCivilite = "Autre";
    }
    
    if(champPrenom && champNom && champAdresse && champTelephone && champMail &&
            champDate && champPassword){
        
        // Message d'information dans la div #message :
        $('#message2').html('Connexion en cours...');

        // Requête AJAX
        $.ajax({

            url: '../../ActionServlet', // URL
            method: 'POST',         // Méthode
            data: {                 // Paramètres
                todo: 'inscrireClient',
                nom: champNom,
                prenom: champPrenom,
                adresse: champAdresse,
                telephone: champTelephone,
                mail: champMail,
                date: champDate,
                civilite: champCivilite,
                password: champPassword
            },
            dataType: 'json'        // Type de retour attendu

        }).done( function (response) {  // Appel OK => "response" contient le resultat JSON
            if(response.Connexion.connexion === "connecte")
            {
                alert("Inscription en cours, verifiez votre boîte mail!");
                window.location = "../profil";
                $('#message').html(' Reussite ' );
            }
            else
            {
                $('#message').html('Echec de la connexion');
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
            $('#message2').html('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
        });
    
    }else {
        $('#message2').html('Veuillez remplir tous les champs svp !');
    }

}

    $(document).ready(function () {

        console.log('Page chargee => Debut du Script');

        // ajout d'un "handler" sur le clic du bouton de connexion
        $('#bouton-connexion').on('click', function () {

            // affichage pour debugage dans la console javascript du navigateur
            console.log('Click sur le bouton "Se Connecter"');

            // appel de la fonction connexion
            connexion();

        });
        
        $('#bouton-inscription').on('click', function () {

            // affichage pour debugage dans la console javascript du navigateur
            console.log('Click sur le bouton "S inscrire "');
            // appel de la fonction connexion
            inscription();

        });

    });