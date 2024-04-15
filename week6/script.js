document.addEventListener("DOMContentLoaded", function() {
    // Function to handle sorting by column
    $(".sortIcon").click(function() {
        const column = $(this).parent().index();
        const sortOrder = $(this).hasClass("asc") ? -1 : 1;
        const rows = $("#employeesTable tbody tr").toArray();

        rows.sort((a, b) => {
            const aValue = $(a).find("td").eq(column).text();
            const bValue = $(b).find("td").eq(column).text();
            return sortOrder * (aValue < bValue ? -1 : 1);
        });

        $("#employeesTable tbody").empty().append(rows);

        // Toggle sorting icon
        $(".sortIcon").removeClass("asc desc");
        $(this).toggleClass("asc", sortOrder === 1).toggleClass("desc", sortOrder === -1);
    });

    // Function to handle changing the number of entities displayed
    $("#showEntities").change(function() {
        const numEntities = $(this).val();
        const rows = $("#employeesTable tbody tr").toArray();

        // Hide all rows
        rows.forEach(row => $(row).hide());

        // Show the first 'numEntities' rows
        for (let i = 0; i < numEntities; i++) {
            $(rows[i]).show();
        }
    });

    // Function to handle opening modal when a row is clicked
    $("#employeesTable tbody tr").click(function() {
        const employeeData = $(this).find("td").map(function() {
            return $(this).text();
        }).get();

        const pictureUrl = "icon.png"

        const modalContent = `
            <img src=${pictureUrl} alt="picture">
            <h2>${employeeData[0]}</h2>
            <p>Position: ${employeeData[1]}</p>
            <p>Office: ${employeeData[2]}</p>
            <p>Age: ${employeeData[3]}</p>
            <p>Start Date: ${employeeData[4]}</p>
            <p>Salary: ${employeeData[5]}</p>
        `;

        $("#modalContent").html(modalContent);
        $("#employeeModal").css("display", "block");
    });

    // Function to close modal when close button is clicked
    $(".close").click(function() {
        $("#employeeModal").css("display", "none");
    });

    // Function to close modal when clicking outside of it
    $(window).click(function(event) {
        if (event.target == $("#employeeModal")[0]) {
            $("#employeeModal").css("display", "none");
        }
    });
});
