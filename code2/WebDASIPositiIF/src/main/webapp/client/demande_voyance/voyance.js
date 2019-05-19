/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function remplirMediums(){
    $.ajax({

        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'afficherMediums'
        },
        dataType: 'json'        // Type de retour attendu

    }).done(function (response) {  // Appel OK => "response" contient le resultat JSON ;
        
        console.log("liste mediums : "+response.Mediums);
        
        if(response.Mediums !== null) {
            console.log("miaou");
            var aRemplir = document.getElementById("demande_medium");
           
            var tbl = document.createElement("table");
            var tblBody = document.createElement("tbody");
            var row = document.createElement("tr");
                
            var cell = document.createElement("th");
            var cellText = document.createTextNode("Nom");
            cell.appendChild(cellText);
            row.appendChild(cell);

            var cell = document.createElement("th");
            var cellText = document.createTextNode("Talent");
            cell.appendChild(cellText);
            row.appendChild(cell);

            var cell = document.createElement("th");
            var cellText = document.createTextNode("Description");
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);
            
            var cell = document.createElement("th");
            var cellText = document.createTextNode("Sélectionner");
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);

            for(var i = 0; i<response.Mediums.length; i++) {
                var row = document.createElement("tr");
                
                var cell = document.createElement("td");
                var cellText = document.createTextNode(response.Mediums[i].nom);
                cell.appendChild(cellText);
                row.appendChild(cell);
                
                var cell = document.createElement("td");
                var cellText = document.createTextNode(response.Mediums[i].talent);
                cell.appendChild(cellText);
                row.appendChild(cell);
                
                var cell = document.createElement("td");
                var cellText = document.createTextNode(response.Mediums[i].description);
                cell.appendChild(cellText);
                row.appendChild(cell);
                
                var bouton = document.createElement("button");
                var boutonText = document.createTextNode("Choisir ce voyant");
                bouton.appendChild(boutonText);
                bouton.setAttribute("onclick", "demandeVoyance('"+response.Mediums[i].nom+"')"); 
                bouton.setAttribute("class", "joli-bouton"); 
                
                var cell = document.createElement("td");
                cell.appendChild(bouton);
                row.appendChild(cell);
                
                tblBody.appendChild(row);
            }
            tbl.appendChild(tblBody);
 
            aRemplir.appendChild(tbl);
        }
        else
        {
            $('#demande_medium').html("<p>Tous nos mediums sont occupés merci de revenir plus tard. </p>");
        }
    }).fail( function (error) { // Appel KO => erreur a gérer
        //
        // Popup avec message d'erreur :
        alert('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
        // Message d'erreur dans la div #message :
        //$('#message').html('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));

    });
}

function demandeVoyance(voyant_var){
    $.ajax({

        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'demandeVoyance',
            voyant: voyant_var,
        },
        dataType: 'json'        // Type de retour attendu

    }).done(function (response) {  // Appel OK => "response" contient le resultat JSON ;
        
        console.log( response);
        if(response.Demande.demandeVoyance == "en cours") {
            alert("Une voyance a été demandée à un Medium");
            window.location = '../profil';
        }
        else
        {
            alert("Nos médiums sont indisponibles, veuillez réesayer plus tard.");
        }
    }).fail( function (error) { // Appel KO => erreur a gérer
        //
        // Popup avec message d'erreur :
        alert('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
        // Message d'erreur dans la div #message :
        //$('#message').html('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));

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

function enCours() {
    $.ajax({

        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'demandeEnCours'
        },
        dataType: 'json'        // Type de retour attendu

    }).done(function (response) {  // Appel OK => "response" contient le resultat JSON ;
        
        console.log(typeof response);
        if(response.Demande.demandeEnCours != null && response.Demande.demandeEnCours !== "en cours") {
            remplirMediums();
        }
        else
        {
            $('#demande_medium').html("<p> Une voyance est en cours avec votre guide Astral. </p>");
        }
    }).fail( function (error) { // Appel KO => erreur a gérer
        //
        // Popup avec message d'erreur :
        alert('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));
        // Message d'erreur dans la div #message :
        //$('#message').html('Erreur lors de l\'appel: HTTP Code ' + error.status + ' ~ ' + error.statusText + ' ~ ' + error.getResponseHeader('Content-Type'));

    });
    
}

    $(document).ready(function () {

        console.log('Page chargee => Debut du Script');
        enCours();

        
        $('#bouton-deconnexion').on('click', function() {

            // affichage pour debugage dans la console javascript du navigateur
            console.log('Click sur le bouton "Se Deconnecter"');

            // appel de la fonction deconnexion
            deconnexion();

        });

    });