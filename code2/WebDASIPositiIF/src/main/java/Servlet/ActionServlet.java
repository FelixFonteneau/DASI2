/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlet;

import Action.Action;
import Action.AfficherMediumsAction;
import Action.AfficherPerformanceAction;
import Action.AfficherPopulariteAction;
import Action.CloreConsultationAction;
import Action.ConnecterClientAction;
import Action.ConnecterEmployeAction;
import Action.ConsultationActuelleClientAction;
import Action.DeconnexionAction;
import Action.DemandeConsultationAction;
import Action.GenererPredictionAction;
import Action.InfoClientAction;
import Action.HistoriqueClientAction;
import Action.InscrireClientAction;
import Action.VoyanceEmployeAction;

import Serialisation.InfoClientSerialisation;
import Serialisation.ConnecterSerialisation;
import Serialisation.ConsultationActuelleClientSerialisation;
import Serialisation.GenererPredictionSerialisation;
import Serialisation.ListeConsultationsSerialisation;
import Serialisation.Serialisation;
import Serialisation.ListeMediumsSerialisation;
import Serialisation.PerformanceSerialisation;
import Serialisation.PopulariteSerialisation;
import Serialisation.ReponseVoyanceClientSerialisation;
import Serialisation.VoyanceEmployeSerialisation;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import fr.insalyon.dasi.positif.DAO.JpaUtil;
import fr.insalyon.dasi.positif.Metier.Service.Services;
import javax.servlet.http.HttpSession;

/**
 *
 * @author ffonteneau
 */
@WebServlet(name = "ActionServlet", urlPatterns = {"/ActionServlet"})
public class ActionServlet extends HttpServlet {

  @Override
  public void init() throws ServletException {
    super.init();
    JpaUtil.init();
  }

  @Override
  public void destroy() {
    JpaUtil.destroy();
    super.destroy();
  }
       
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession session = request.getSession();
        String todo = request.getParameter("todo");
        
        Action act = null;
        Serialisation serialisation = null;
        if( session.getAttribute("connexion") != null && (boolean) session.getAttribute("connexion") ){
            switch(todo) {
                case "afficherMediums":
                    act = new AfficherMediumsAction();
                    serialisation = new ListeMediumsSerialisation();
                break;
                case "afficherPopMediums":
                    act = new AfficherPopulariteAction();
                    serialisation = new PopulariteSerialisation();
                break;
                case "afficherPerformanceEmployes":
                    act = new AfficherPerformanceAction();
                    serialisation = new PerformanceSerialisation();
                break;
                case "afficherVoyance":
                    act = new VoyanceEmployeAction();
                    serialisation = new VoyanceEmployeSerialisation();
                break;
                case "genererPrediction":
                    act= new GenererPredictionAction();
                    serialisation = new GenererPredictionSerialisation();
                break;
                case "cloreConsultation":
                    act= new CloreConsultationAction();
                break;
                case "historiqueClient":
                    act = new HistoriqueClientAction();
                    serialisation = new ListeConsultationsSerialisation();
                break;
                case "infoClient":
                    act = new InfoClientAction();
                    serialisation = new InfoClientSerialisation();
                break;
                case "demandeVoyance":
                    act = new DemandeConsultationAction();
                    serialisation = new ReponseVoyanceClientSerialisation();
                break;
                case "demandeEnCours":
                    act = new ConsultationActuelleClientAction();
                    serialisation = new ConsultationActuelleClientSerialisation();
                break;
                case "deconnexion":
                    act = new DeconnexionAction();
                break;
            } 
        } else {
            switch(todo){
                case "connecterClient":
                    act = new ConnecterClientAction();
                    serialisation = new ConnecterSerialisation();
                break;
                case "connecterEmploye":
                    act = new ConnecterEmployeAction();
                    serialisation = new ConnecterSerialisation();
                break;
                case "inscrireClient":
                    act = new InscrireClientAction();
                    serialisation = new ConnecterSerialisation();
                break;                
            }
        }
       
        if(act == null) {
            response.sendError(400, "Bad Request (Wrong ToDo Parameter");
        } else {
            act.executer(request);
            if(serialisation != null) {
                serialisation.serialiser(request, response);
            }
        }
        
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
