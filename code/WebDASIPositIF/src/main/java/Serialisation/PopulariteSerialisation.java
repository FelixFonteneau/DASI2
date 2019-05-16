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
public class PopulariteSerialisation extends Serialisation {
    @Override
    public void serialiser(HttpServletRequest request, HttpServletResponse response) {
        JsonArray jsonArrayMediums = new JsonArray();
        
        Map<Medium, Integer> popMediums = (Map<Medium, Integer>) request.getAttribute("populariteMediums");
        System.out.println(popMediums);
        Set<Medium> coucou = popMediums.keySet();
        for(Medium medium : coucou) {
            JsonObject jsonMedium = new JsonObject();
            
            jsonMedium.addProperty("nom", medium.getNom());
            jsonMedium.addProperty("nombreVoyance", popMediums.get(medium));
            
            jsonArrayMediums.add(jsonMedium);
        }
        
        try (PrintWriter out = response.getWriter()) {
            JsonObject jayjay = new JsonObject();
            jayjay.add("populariteMediums", jsonArrayMediums);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(jayjay);
            out.println(json);
        } catch(IOException exc){
            exc.printStackTrace();
        }
    }
}
