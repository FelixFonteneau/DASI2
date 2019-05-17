/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Client;
import fr.insalyon.dasi.positif.Metier.Modele.Consultation;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author ffonteneau
 */
public class ConsultationActuelleClientAction extends Action{
    @Override
    public void executer(HttpServletRequest request){
        HttpSession session = request.getSession();
        Services service = new Services();
        Client client = (Client) session.getAttribute("client");
        
        // vérification que la dernière consultation n'ai pas de commentaire
        // si c'est le cas, le client a une consultation en cours
        if(client != null){
           List<Consultation> consultations = service.genererHistoriqueClient(client);
           if (consultations != null && consultations.size() > 0){
               Consultation consultationRecente = consultations.get(0);
               if(consultationRecente.getDateFin() == null){
                   request.setAttribute("demandeEnCours", "en cours");
               } else{
                   request.setAttribute("demandeEnCours", "termine");
               }
           } else {
               request.setAttribute("demandeEnCours", "pas de demande");
           }
        } 
    }
}
