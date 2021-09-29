package com.example.WebLab2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

public class ClearTableServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        HttpSession session = req.getSession();
        session.removeAttribute(session.getId());
        PrintWriter printWriter = resp.getWriter();
        printWriter.println(generateNewTable());
        printWriter.close();
    }

    private String generateNewTable() {
        return "<table id=\"resultTable\">" +
                "<tr class=\"table_header\">" +
                "<th class=\"coords_col\">X</th>" +
                "<th class=\"coords_col\">Y</th>" +
                "<th class=\"coords_col\">R</th>" +
                "<th class=\"time_col\">Current time</th>" +
                "<th class=\"time_col\">Execution time</th>" +
                "<th class=\"validate_col\">Validate</th>" +
                "<th class=\"hitres_col\">Hit result</th>" +
                "</tr>" +
                "</table>";
    }
}
