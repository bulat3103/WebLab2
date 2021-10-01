package com.example.WebLab2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;

public class LoadPointsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
        HttpSession session = req.getSession();
        PrintWriter printWriter = resp.getWriter();
        printWriter.println(generateJSON(session));
        printWriter.close();
    }

    private String generateJSON(HttpSession session) {
        ArrayList<String> table = (ArrayList<String>) session.getAttribute(session.getId());
        if (table == null) {
            table = new ArrayList<>();
        }
        String jsonArray[] = new String[table.size()];
        int i = 0;
        for (String row : table) {
            jsonArray[i] = row;
            i++;
        }
        return String.format("{\"points\": %s}", Arrays.toString(jsonArray));
    }
}
