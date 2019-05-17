/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Employe;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author ffonteneau
 */
public class ConnecterEmployeAction extends Action {
    @Override
    public void executer(HttpServletRequest request){
        HttpSession session = request.getSession();
        Services service = new Services();
        Employe employe = service.connecterEmploye(request.getParameter("login"), request.getParameter("password"));
        
        if(employe != null){
            request.setAttribute("connexion", true);
            session.setAttribute("connexion", true);
            session.setAttribute("employe", employe);
        } else {
            request.setAttribute("connexion", false);
            session.setAttribute("connexion", false);
        }
    }
}
