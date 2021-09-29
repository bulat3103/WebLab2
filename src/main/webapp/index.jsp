<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="img/titleIcon.png">
    <link rel="stylesheet" href="styles/style.css">
    <title>Web lab №2</title>
</head>
<body>
<table id="main">
    <tr>
        <td id="header" colspan="2">
            <span class="leftItem">Khafizov Bulat Lenarovich (P3213)</span>
            <span class="rightItem">№42516</span>
        </td>
    </tr>
    <tr>
        <td class="content" id="graph">
            <div class="plate_top">
                <h2 class="plate_top_title">Graph</h2>
            </div>
            <div class="graph_image">
                <img src="img/areas.png">
            </div>
        </td>
        <td class="content" id="values" rowspan="1">
            <div class="plate_top">
                <h2 class="plate_top_title">Values</h2>
            </div>
            <form id="input_form" action="" method="GET">
                <table id="input">
                    <tr>
                        <td class="input_label">
                            <label>X</label>
                        </td>
                        <td class="input_value">
                            <select id="x_select" name="xVal">
                                <option value="-3" selected>-3</option>
                                <% for (int i = -3; i <= 5; i++) { %>
                                <option value="<%=i%>"><%=i%></option>
                                <% } %>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="input_label">
                            <label for="y_input">Y</label>
                        </td>
                        <td class="input_value">
                            <input id="y_input" type="text" name="yVal" maxlength="10" autocomplete="off" placeholder="Number from -3 to 5...">
                        </td>
                    </tr>
                    <tr>
                        <td class="input_label">
                            <label>R</label>
                        </td>
                        <td class="input_value">
                            <input id="r_input" type="text" name="rVal" maxlength="10" autocomplete="off" placeholder="Number from 2 to 5...">
                        </td>
                    </tr>
                </table>
            </form>
            <div class="buttons">
                <input id= "checkButton" class="button" type="submit" onclick="submit()" value="Submit">
                <input id= "clearButton" class="button" type="submit" onclick="clearTable()" value="Clear">
            </div>
        </td>
    </tr>
    <tr>
        <td class="content" id="table" colspan="2">
            <div class="plate_top">
                <h2 class="plate_top_title">Table</h2>
            </div>
            <div id="scroll" class="scroll_container">
                <table id="resultTable">
                    <tr class="table_header">
                        <th class="coords_col">X</th>
                        <th class="coords_col">Y</th>
                        <th class="coords_col">R</th>
                        <th class="time_col">Current time</th>
                        <th class="time_col">Execution time</th>
                        <th class="validate_col">Validate</th>
                        <th class="hitres_col">Hit result</th>
                    </tr>
                </table>
            </div>
        </td>
    </tr>
</table>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>