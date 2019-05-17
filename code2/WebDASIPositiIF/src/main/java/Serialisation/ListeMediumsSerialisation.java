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
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ffonteneau
 */
public class ListeMediumsSerialisation extends Serialisation {
    @Override
    public void serialiser(HttpServletRequest request, HttpServletResponse response) {
        JsonArray jsonArrayMediums = new JsonArray();
        
        List<Medium> mediums = (List<Medium>) request.getAttribute("mediums");
        for(Medium medium : mediums) {
            JsonObject jsonMedium = new JsonObject();
            
            jsonMedium.addProperty("nom", medium.getNom());
            jsonMedium.addProperty("talent", medium.getTalent());
            jsonMedium.addProperty("description", medium.getDescription());
            
            jsonArrayMediums.add(jsonMedium);
        }
    
        try (PrintWriter out = response.getWriter()) {
            JsonObject jayjay = new JsonObject();
            jayjay.add("Mediums", jsonArrayMediums);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(jayjay);
            out.println(json);
        } catch(IOException exc){
            exc.printStackTrace();
        }
    }
}
