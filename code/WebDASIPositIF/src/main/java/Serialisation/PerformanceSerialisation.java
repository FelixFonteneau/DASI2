/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Serialisation;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import fr.insalyon.dasi.positif.Metier.Modele.Employe;
import fr.insalyon.dasi.positif.Metier.Modele.Medium;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ffonteneau
 */
public class PerformanceSerialisation extends Serialisation {
    @Override
    public void serialiser(HttpServletRequest request, HttpServletResponse response) {
        JsonArray jsonArrayPerformance = new JsonArray();
        
        Map<Employe, Integer> perfEmployes = (Map<Employe, Integer>) request.getAttribute("performanceEmployes");
        System.out.println(perfEmployes);
        Set<Employe> employes = perfEmployes.keySet();
        for(Employe employe : employes) {
            JsonObject jsonPerformance = new JsonObject();
            
            jsonPerformance.addProperty("nom", employe.getNom());
            jsonPerformance.addProperty("nombreVoyances", perfEmployes.get(employe));
            
            jsonArrayPerformance.add(jsonPerformance);
        }
        
        try (PrintWriter out = response.getWriter()) {
            JsonObject jayjay = new JsonObject();
            jayjay.add("performanceEmployes", jsonArrayPerformance);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(jayjay);
            out.println(json);
        } catch(IOException exc){
            exc.printStackTrace();
        }
    }
}
