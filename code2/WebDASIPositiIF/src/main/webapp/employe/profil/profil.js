/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function afficherListeMediums() {
    
    $.ajax({
        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'afficherMediums'
        },
        dataType: 'json'        // Type de retour attendu
        
    }).done(function (response) {
        if(response.Mediums != null) {
            var aRemplir = document.getElementById("liste_mediums");
            
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
            
            for(var i = 0; i<response.Mediums.length; i++) {
                console.log(response.Mediums[i].nom);
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
                
                /* var bouton = document.createElement("button");
                bouton.setAttribute("onclick", "choisirCeMedium('"+response.Mediums[i].nom+"')"); 
                bouton.setAttribute("class", "joli-bouton");
                
                var cell = document.createElement("td");
                cell.appendChild(bouton);
                row.appendChild(cell); */
                
                tblBody.appendChild(row);
            }
            tbl.appendChild(tblBody);
 
            aRemplir.appendChild(tbl);
            console.log('Réussite');

        }
        else
        {
            console.log('Echec de l\'affichage des mediums');
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

function afficherPopulariteMediums() {
    
    $.ajax({
        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'afficherPopMediums'
        },
        dataType: 'json'        // Type de retour attendu
        
    }).done(function (response) {
        if(response.populariteMediums != null) {
            var aRemplir = document.getElementById("graphe_Popularite_Mediums");
            
            var ul = document.createElement("ul");
            
            for(var i = 0; i<response.populariteMediums.length; i++) {
                console.log(response.populariteMediums[i].nom);
                var li = document.createElement("li");
                var liText = document.createTextNode(response.populariteMediums[i].nombreVoyance + ":" + response.populariteMediums[i].nom);
                li.appendChild(liText);
                ul.appendChild(li);
            }
            aRemplir.appendChild(ul);
            console.log('Réussite');
        }
        else
        {
            console.log('Echec de l\'affichage de la popularitéd des mediums');
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

function afficherPerfomanceEmployes() {
    
    $.ajax({
        url: '../../ActionServlet', // URL
        method: 'POST',         // Méthode
        data: {                 // Paramètres
            todo: 'afficherPerformanceEmployes'
        },
        dataType: 'json'        // Type de retour attendu
        
    }).done(function (response) {
        console.log(response);
        if(response.performanceEmployes != null) {
            var aRemplir = document.getElementById("graphe_Performance_Employes");
            aRemplir 
            var ul = document.createElement("ul");
            
            for(var i = 0; i<response.performanceEmployes.length; i++) {
                console.log("i");
                var li = document.createElement("li");
                var liText = document.createTextNode(response.performanceEmployes[i].nombreVoyances + ":" + response.performanceEmployes[i].nom);
                li.appendChild(liText);
                ul.appendChild(li);
            }
            aRemplir.appendChild(ul);
            console.log('Réussite');
        }
        else
        {
            console.log('Echec de l\'affichage des performances des employes');
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

function makeGraph() {
            var container = document.getElementById("graphe_Popularite_Mediums");
            var labels = document.getElementById("labelsM");
            var dnl = container.getElementsByTagName("li");
            for(var i = 0; i < dnl.length; i++) {
                var item = dnl.item(i);
                var value = item.innerHTML;
                var content = value.split(":");
                value = content[0];
                item.style.height=value + "px";
                item.style.top=(199 - value) + "px";
                item.style.left = (i * 50 + 20) + "px";
                item.style.height = value + "px";
                item.innerHTML = value;
                item.style.visibility="visible";	
                left = new String(i * 50 + 58) + "px";
                labels.innerHTML = labels.innerHTML + 
                "<span style='position:absolute;top:-16px;left:"+ 
                left+";background:"+ color+"'>" + year + "</span>";
            }	
        }

    $(document).ready(function () {

        console.log('Page chargee => Debut du Script');
        afficherListeMediums();
        afficherPopulariteMediums();
        afficherPerfomanceEmployes();
        makeGraph();
        window.onload=makeGraph;
        $('#bouton-deconnexion').on('click', function() {

            // affichage pour debugage dans la console javascript du navigateur
            console.log('Click sur le bouton "Se Deconnecter"');

            // appel de la fonction deconnexion
            deconnexion();
            
        });
    });