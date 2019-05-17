/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Client;
import fr.insalyon.dasi.positif.Metier.Modele.Consultation;
import fr.insalyon.dasi.positif.Metier.Modele.Medium;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author ffonteneau
 */
public class DemandeConsultationAction extends Action{
     @Override
    public void executer(HttpServletRequest request){
        Services service = new Services();
        HttpSession session = request.getSession();
        List<Medium> mediums = service.recupererMediums();
        Medium mediumChoisit = null;
        
        for (Medium m : mediums){
            if (m.getNom().equals(request.getParameter("voyant"))){
                mediumChoisit = m;
                break;
            }
        }
        
        if (mediumChoisit != null){
            Consultation consultation = service.creerConsultation(
                (Client) session.getAttribute("client"), mediumChoisit);
            if(consultation != null){
                request.setAttribute("demandeVoyance", "en cours");
            } else {
                request.setAttribute("demandeVoyance", "echec");
            }
        } else {
            request.setAttribute("demandeVoyance", "echec");
        }
        
        
    }
}
