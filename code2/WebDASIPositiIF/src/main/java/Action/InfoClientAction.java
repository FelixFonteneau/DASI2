/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author ffonteneau
 */
public class InfoClientAction extends Action{
    @Override
    public void executer(HttpServletRequest request){
        HttpSession session = request.getSession();
        request.setAttribute("client", session.getAttribute("client"));
    }
}
