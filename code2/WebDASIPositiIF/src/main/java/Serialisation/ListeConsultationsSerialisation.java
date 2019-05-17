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
import fr.insalyon.dasi.positif.Metier.Modele.Consultation;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ffonteneau
 */
public class ListeConsultationsSerialisation extends Serialisation {
    @Override
    public void serialiser(HttpServletRequest request, HttpServletResponse response) {
        JsonArray jsonArrayConsult = new JsonArray();
        
        List<Consultation> consultations = (List<Consultation>) request.getAttribute("consultations");
        if(consultations != null){
            for(Consultation consult : consultations) {
                JsonObject jsonConsult = new JsonObject();

                jsonConsult.addProperty("medium", consult.getMedium().getNom());
                jsonConsult.addProperty("date", consult.getDateConsultation().toString());
                jsonConsult.addProperty("commentaire", consult.getCommentaire());

                jsonArrayConsult.add(jsonConsult);
            }
        }
        
    
        try (PrintWriter out = response.getWriter()) {
            JsonObject jayjay = new JsonObject();
            jayjay.add("Consultations", jsonArrayConsult);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(jayjay);
            out.println(json);
        } catch(IOException exc){
            exc.printStackTrace();
        }
    }
}
