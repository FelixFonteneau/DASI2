/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Consultation;
import fr.insalyon.dasi.positif.Metier.Modele.Employe;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author ffonteneau
 */
public class VoyanceEmployeAction extends Action {
    @Override
    public void executer(HttpServletRequest request){
        Services s = new Services();
        HttpSession session = request.getSession();
        Consultation voyanceEnCours = s.getConsultEnCours((Employe)session.getAttribute("employe"));
        
        request.setAttribute("voyanceEnCours", voyanceEnCours);
        if(voyanceEnCours != null) {
            request.setAttribute("client", voyanceEnCours.getClient());
        } else {
            request.setAttribute("client", null);
        }
    }
}
