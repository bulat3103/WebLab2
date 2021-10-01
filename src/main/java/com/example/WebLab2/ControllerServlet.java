package com.example.WebLab2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getParameter("xVal") != null && req.getParameter("yVal") != null && req.getParameter("rVal") != null) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, resp);
        } else if (req.getParameter("clear") != null && req.getParameter("clear").equals("true")) {
            getServletContext().getNamedDispatcher("ClearTableServlet").forward(req, resp);
        } else if (req.getParameter("start") != null && req.getParameter("start").equals("true")){
            getServletContext().getNamedDispatcher("LoadSessionDataServlet").forward(req, resp);
        } else if (req.getParameter("loadPoints") != null && req.getParameter("loadPoints").equals("true")) {
            getServletContext().getNamedDispatcher("LoadPointsServlet").forward(req, resp);
        } else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }
}
