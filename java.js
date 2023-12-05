/*
File: java.js
GUI Assignment: HW4 part1
Ryan Trinh, UMass Lowell Computer Science,
Ryan_Trinh@cs.uml.edu
Copyright (c) 2023 by Ryan Trinh. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
*/
$(document).ready(function () {
    $.validator.addMethod("checkMinMax", function (value, element, params) {
        var min = parseInt($("#" + params[0]).val(), 10);
        var max = parseInt(value, 10);
        return min => max;
    });

    $("#tableForm").validate({
        rules: {
            minRows: {
                required: true,
                checkMinMax: ["maxRows"]
            },
            minCols: {
                required: true,
                checkMinMax: ["maxCols"]
            },
            maxRows: {
                required: true,
            },
            maxCols: {
                required: true,
            }
        },
        messages: {
            minRows: {
                required: "Please enter the minimum number of rows.",
                checkMinMax: "Minimum Rows cannot be larger than Maximum Rows."
            },
            minCols: {
                required: "Please enter the minimum number of columns.",
                checkMinMax: "Minimum Columns cannot be larger than Maximum Columns."
            },
            maxRows: {
                required: "Please enter the maximum number of rows.",
            },
            maxCols: {
                required: "Please enter the maximum number of columns.",
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.next(".error-message"));
        }
    });
});

function generateTable() {
    if ($("#tableForm").valid()) {
        // Clear previous table content
        $("#tableContainer").empty();

        // Get values
        var minRows = parseInt($("#minRows").val());
        var minCols = parseInt($("#minCols").val());
        var maxRows = parseInt($("#maxRows").val());
        var maxCols = parseInt($("#maxCols").val());

        // Check if minRow or minCol is larger than maxRow or maxCol
        if (minRows > maxRows || minCols > maxCols) {
            $("#errorMessage").text("Error: Minimum value cannot be larger than Maximum value.");
            return;
        }

        // Generate the table content
        var tableContent = '<table class="generated-table">';
        for (var i = minRows - 1; i <= maxRows; i++) {
            tableContent += '<tr>';
            for (var j = minCols - 1; j <= maxCols; j++) {
                if (i === minRows - 1 && j === minCols - 1) {
                    tableContent += '<th></th>';
                } else if (i === minRows - 1) {
                    tableContent += '<th>' + j + '</th>';
                } else if (j === minCols - 1) {
                    tableContent += '<th>' + i + '</th>';
                } else {
                    tableContent += '<td>' + (i * j) + '</td>';
                }
            }
            tableContent += '</tr>';
        }
        tableContent += '</table>';

        $("#tableContainer").append(tableContent);
        $("#errorMessage").text(""); 
    }
}