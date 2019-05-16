/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Client;
import fr.insalyon.dasi.positif.Metier.Modele.Employe;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author ffonteneau
 */
public class InscrireClientAction extends Action {
    @Override
    public void executer(HttpServletRequest request){
        Services service = new Services();
        HttpSession session = request.getSession();
        String naissance = request.getParameter("date");
        Date dateNaissance = null;
        try {
            dateNaissance = new SimpleDateFormat("dd-MM-yyyy").parse(naissance);
        } catch (ParseException ex) {
            Logger.getLogger(InscrireClientAction.class.getName()).log(Level.SEVERE, null, ex);
        }

        
        Client client = new Client( request.getParameter("civilite"), request.getParameter("nom") ,  
                request.getParameter("prenom"),  (Date)
                        dateNaissance,  request.getParameter("adresse"), 
                request.getParameter("telephone"), request.getParameter("mail"), request.getParameter("password"));
        
        service.CreerClient(client);
        request.setAttribute("connexion",true);
        session.setAttribute("connexion",true);
        session.setAttribute("client", client);
    }
}
