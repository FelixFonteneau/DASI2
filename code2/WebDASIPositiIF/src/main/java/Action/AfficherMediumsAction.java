/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import fr.insalyon.dasi.positif.Metier.Modele.Medium;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 *
 * @author ffonteneau
 */
public class AfficherMediumsAction extends Action {
    @Override
    public void executer(HttpServletRequest request){
        Services s = new Services();
        List<Medium> mediums = s.recupererMediums();
        request.setAttribute("mediums", mediums);
    }
}
