/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Serialisation;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ffonteneau
 */
public class ConnecterSerialisation extends Serialisation{
    @Override
    public void serialiser(HttpServletRequest request, HttpServletResponse response) {
        JsonObject jayjay = new JsonObject();
        boolean connecte = (boolean)request.getAttribute("connexion");
        
        if(connecte) {
            jayjay.addProperty("connexion", "connecte");
        } else {
            jayjay.addProperty("connexion", "non");
        }
        try (PrintWriter out = response.getWriter()) {
            JsonObject container = new JsonObject();
            container.add("Connexion", jayjay);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(container);
            out.println(json);
        } catch(IOException exc){
            exc.printStackTrace();
        }
    }
}
