/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Serialisation;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import fr.insalyon.dasi.positif.Metier.Modele.Client;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ffonteneau
 */

public class VoyanceEmployeSerialisation extends Serialisation {
    @Override
    public void serialiser(HttpServletRequest request, HttpServletResponse response) {
        JsonObject jsonVoyance = new JsonObject();
        
        if((Client)request.getAttribute("client") != null) {
            jsonVoyance.addProperty("civilite", ((Client)request.getAttribute("client")).getCivilite());
            jsonVoyance.addProperty("nom", ((Client)request.getAttribute("client")).getNom());
            jsonVoyance.addProperty("prenom", ((Client)request.getAttribute("client")).getPrenom());
            jsonVoyance.addProperty("signeAstro", ((Client)request.getAttribute("client")).getSigneAstro());
            jsonVoyance.addProperty("couleurPorteBonheur", ((Client)request.getAttribute("client")).getColBonheur());
            jsonVoyance.addProperty("animalTotem", ((Client)request.getAttribute("client")).getAnimalTotem());
        }
        
        try (PrintWriter out = response.getWriter()) {
            JsonObject jayjay = new JsonObject();
            jayjay.add("client", jsonVoyance);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(jayjay);
            out.println(json);
        } catch(IOException exc){
            exc.printStackTrace();
        }
    }
}
