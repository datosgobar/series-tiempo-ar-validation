function makeRequest() {
    const catalog_url = $("input[name=catalog_url]").val();
    const distribution_id = $("input[name=distribution_id]").val().toString();
    const format = $("input[name=format]").val() || "json";
    
    const $errorsContainer = $(".errors-container");
    $errorsContainer.append("<h4>Validando catálogo...</h4>");

    $.ajax({
        type: "POST",
        url: "http://192.168.62.11/series/api/validate/",
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "catalog_url": catalog_url,
            "distribution_id": distribution_id,
            "format": format,
        }),
        success: function(data){
            const issuesCount = data.found_issues;
            $errorsContainer.empty()
            if (issuesCount < 1) {
                $errorsContainer.append("<h4>El catálogo subido no tiene errores</h4>");
            }
            else {
                issuesDetails = data.detail;
                $errorsContainer.append("<h4>Se encontraron los siguientes errores de validación:</h4>");
                issuesDetails.forEach(issue => {
                    $errorsContainer.append(`<p>${issue}<p>`);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert(jqXHR.statusText);
        },

    });
}