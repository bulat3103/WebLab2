package com.example.WebLab2;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        HttpSession session = req.getSession();
        long startTime = System.nanoTime();
        String xString = req.getParameter("xVal");
        String yString = req.getParameter("yVal");
        String rString = req.getParameter("rVal");
        boolean isValid = validate(yString, rString);
        if (isValid) {
            double xValue = Double.parseDouble(xString);
            double yValue = Double.parseDouble(yString);
            double rValue = Double.parseDouble(rString);
            boolean isHit = checkHit(xValue, yValue, rValue);
            long executionTime = System.nanoTime() - startTime;
            session.setAttribute(session.getId(), updateTable(xValue, yValue, rValue, new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime()), executionTime, isValid, isHit, session));
        }
        PrintWriter printWriter = resp.getWriter();
        printWriter.println(generateTable(session));
        printWriter.close();
    }

    private ArrayList<String> updateTable(double x, double y, double r, String currentTime, long executionTime, boolean isValid, boolean isHit, HttpSession session) {
        ArrayList<String> table = (ArrayList<String>) session.getAttribute(session.getId());
        if (table == null) {
            table = new ArrayList<>();
        }
        table.add(generateNewRow(x, y, r, currentTime, executionTime, isValid, isHit));
        return table;
    }

    private String generateNewRow(double x, double y, double r, String currentTime, long executionTime, boolean isValid, boolean isHit) {
        String pattern = "{\"x\": \"%s\", \"y\": \"%s\", \"r\": \"%s\", \"currentTime\": \"%s\", \"executionTime\": \"%s\", \"isValid\": \"%s\", \"isHit\": \"%s\"}";
        return String.format(pattern, x, y, r, currentTime, executionTime, isValid, isHit);
    }

    private String generateTable(HttpSession session) {
        String header = "<table id=\"resultTable\">" +
                "<tr class=\"table_header\">" +
                "<th class=\"coords_col\">X</th>" +
                "<th class=\"coords_col\">Y</th>" +
                "<th class=\"coords_col\">R</th>" +
                "<th class=\"time_col\">Current time</th>" +
                "<th class=\"time_col\">Execution time</th>" +
                "<th class=\"validate_col\">Validate</th>" +
                "<th class=\"hitres_col\">Hit result</th>" +
                "</tr>%s</table>";
        ArrayList<String> table = (ArrayList<String>) session.getAttribute(session.getId());
        if (table == null) {
            table = new ArrayList<>();
        }
        StringBuilder rows = new StringBuilder();
        for (String row : table) {
            JsonObject jsonObject = new Gson().fromJson(row, JsonObject.class);
            rows.append("<tr>" +
                    "<td>" + jsonObject.get("x").getAsString() + "</td>" +
                    "<td>" + jsonObject.get("y").getAsString() + "</td>" +
                    "<td>" + jsonObject.get("r").getAsString() + "</td>" +
                    "<td>" + jsonObject.get("currentTime").getAsString() + "</td>" +
                    "<td>" + jsonObject.get("executionTime").getAsString() + "</td>" +
                    "<td>" + jsonObject.get("isValid").getAsString() + "</td>" +
                    "<td class=\"hit\">" + jsonObject.get("isHit").getAsString() + "</td>" +
                    "</tr>");
        }
        return String.format(header, rows);
    }

    private boolean validate(String yString, String rString) {
        return validateY(yString) && validateR(rString);
    }

    private boolean validateR(String rString) {
        try {
            double rValue = Double.parseDouble(rString);
            return rValue > 2 && rValue < 5;
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    private boolean validateY(String yString) {
        try {
            double yValue = Double.parseDouble(yString);
            return yValue > -3 && yValue < 5;
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    private boolean checkHit(double xValue, double yValue, double rValue) {
        return checkTriangle(xValue, yValue, rValue) || checkCircle(xValue, yValue, rValue) || checkRectangle(xValue, yValue, rValue);
    }

    private boolean checkTriangle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue >= 0 && yValue <= -xValue / 2 + rValue / 2;
    }

    private boolean checkCircle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && yValue >= 0 && Math.sqrt(xValue * xValue + yValue * yValue) <= rValue / 2;
    }

    private boolean checkRectangle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && xValue >= -rValue / 2 && yValue <= 0 && yValue >= -rValue;
    }
}
