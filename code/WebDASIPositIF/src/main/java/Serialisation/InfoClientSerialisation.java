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
public class InfoClientSerialisation extends Serialisation{
    @Override
    public void serialiser(HttpServletRequest request, HttpServletResponse response) {
        
        
        
 
        JsonObject jsonClient = new JsonObject();
        Client client = (Client) request.getAttribute("client");
        if(client != null){
            jsonClient.addProperty("nom", client.getNom());
            jsonClient.addProperty("prenom", client.getPrenom());
            jsonClient.addProperty("civilite", client.getCivilite());
            jsonClient.addProperty("dateNaissance", client.getDateNaissance().toString());
            jsonClient.addProperty("telephone", client.getNumTel());
            jsonClient.addProperty("mail", client.getAdresseMail());
            jsonClient.addProperty("adresse", client.getAdressePost());        
            jsonClient.addProperty("signeAstro", client.getSigneAstro());
            jsonClient.addProperty("couleur", client.getColBonheur());
            jsonClient.addProperty("animal", client.getAnimalTotem());
        }
        
        try (PrintWriter out = response.getWriter()) {
            JsonObject jayjay = new JsonObject();
            jayjay.add("Client", jsonClient);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(jayjay);
            out.println(json);
        } catch(IOException exc){
            exc.printStackTrace();
        }
    }
}
