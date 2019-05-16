/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Client;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author ffonteneau
 */

public class ConnecterClientAction extends Action {
    @Override
    public void executer(HttpServletRequest request){
        Services s = new Services();
        Client client = s.connecterClient(request.getParameter("login"), request.getParameter("password"));
        HttpSession session = request.getSession();
        if(client != null){
            request.setAttribute("connexion", true);
            session.setAttribute("connexion", true);
            session.setAttribute("client", client);
        }else{
            request.setAttribute("connexion", false);
            session.setAttribute("connexion", false);
        }        
    }
}
