/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Employe;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author ffonteneau
 */
public class AfficherPerformanceAction extends Action {
    @Override
    public void executer(HttpServletRequest request){
        Services s = new Services();
        Map<Employe, Integer> performanceEmployes = s.repartitionEmploye();
        request.setAttribute("performanceEmployes", performanceEmployes);
    }
}
