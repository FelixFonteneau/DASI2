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
public class HistoriqueClientAction extends Action{
    @Override
    public void executer(HttpServletRequest request){
        HttpSession session = request.getSession();
        Services service = new Services();
        List<Consultation> listeConsultations = service.genererHistoriqueClient((Client) session.getAttribute("client"));
        
        request.setAttribute("listeConsultations", listeConsultations);
    }
}
