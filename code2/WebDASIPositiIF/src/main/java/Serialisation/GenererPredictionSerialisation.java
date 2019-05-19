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
 * @author Félix Fonteneau
 */
public class GenererPredictionSerialisation extends Serialisation{
    @Override
    public void serialiser(HttpServletRequest request, HttpServletResponse response) {
        JsonArray jsonArrayPrediction = new JsonArray();
        
        List<String> predictions = (List<String>) request.getAttribute("predictions");
        for(String prediction : predictions) {
            JsonObject jsonPrediction = new JsonObject();
            jsonPrediction.addProperty("prediction", prediction);
            
            jsonArrayPrediction.add(jsonPrediction);
        }
    
        try (PrintWriter out = response.getWriter()) {
            JsonObject jayjay = new JsonObject();
            jayjay.add("Predictions", jsonArrayPrediction);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(jayjay);
            out.println(json);
        } catch(IOException exc){
            exc.printStackTrace();
        }
    }
}
