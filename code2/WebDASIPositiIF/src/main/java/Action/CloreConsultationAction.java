/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Consultation;
import fr.insalyon.dasi.positif.Metier.Modele.Employe;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Félix Fonteneau
 */
public class CloreConsultationAction extends Action{
    @Override
    public void executer(HttpServletRequest request){
        Services service = new Services();
        HttpSession session = request.getSession();
        Employe employe = (Employe) session.getAttribute("employe");
        String commentaire = request.getParameter("commentaire");
        if(employe != null){
            Consultation consultation = service.getConsultEnCours(employe);
            service.finirConsultation(consultation, commentaire);
        }
    }
}
