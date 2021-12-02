function ApplyFormatter() {
    $('.date-format').on('input', function () {
        var r = this.value.replace(/\D/g, "");

        if (r.length > 4) {
            r = r.replace(/^(\d{1,2})(\d{1,2})(\d{1,4})/, "$1/$2/$3");
        }
        else if (r.length > 2) {
            r = r.replace(/^(\d{1,2})(\d{1,2})/, "$1/$2");
        }

        this.value = r;

    });

    $('.date-format').on('blur', function () {
        var r = this.value;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        if (r == "") return;

        if (r.length <= 2) {
            r = String(r).padStart(2, '0');
            r = r + "/" + mm + "/" + yyyy;
        }
        else if (r.length <= 5) {
            var parts = String(r).split('/');
            dd = String(parts[0]).padStart(2, '0');
            mm = String(parts[1]).padStart(2, '0');

            r = dd + "/" + mm + "/" + yyyy;
        }
        else if (r.length == 8) {
            var parts = String(r).split('/');
            dd = String(parts[0]).padStart(2, '0');
            mm = String(parts[1]).padStart(2, '0');

            if (parts[2] <= 50)
                yyyy = "20" + String(parts[2]);
            else
                yyyy = "19" + String(parts[2]);


            r = dd + "/" + mm + "/" + yyyy;
        }

        if (!isValidDate(r))
            this.value = "";
        else
            this.value = r;

    });

    $('.inteiro-positivo').on('input', function () {
        this.value = this.value.match(/[1-9][0-9]*$/);
    });

    $('.inteiro-positivo').focusout('input', function () {
        if (this.value == "")
            this.value = "0";
    });

    $('.decimal-2').on('input', function () {
        this.value = this.value.match(/^\d+[\,\.]?\d{0,2}/).toString().replace(".", ",");
    });

    $('.decimal-2').focusout(function () {
        if (this.value == "")
            this.value = "0,00";

        var sValue = this.value;

        if (sValue.indexOf(',') > -1) {
            sValue = sValue.replace(".", "");
        }
        else {
            sValue = sValue.replace(".", ",");
        }

        sValue = sValue.match(/^\d+[\,\.]?\d{0,2}/).toString();


        var sArray = sValue.split(",");

        if (sValue == "")
            sValue = "0,00";
        else {
            if (sArray.length == 1)
                sValue = sValue + ",00";
            if (sArray.length == 2) {
                for (var i = 0; i < (2 - sArray[1].length); i++)
                    sValue = sValue + "0";
            }
        }

        this.value = sValue;


    });

    $('.decimal-4').on('input', function () {
        this.value = this.value.match(/^\d+[\,\.]?\d{0,4}/).toString().replace(".", ",");
    });

    $('.decimal-4').focusout(function () {
        if (this.value == "")
            this.value = "0,0000";

        var sValue = this.value.match(/^\d+[\,\.]?\d{0,4}/).toString().replace(".", ",");
        var sArray = sValue.split(",");

        if (sValue == "")
            sValue = "0,0000";
        else {
            if (sArray.length == 1)
                sValue = sValue + ",0000";
            if (sArray.length == 2) {
                for (var i = 0; i < (4 - sArray[1].length); i++)
                    sValue = sValue + "0";
            }
        }

        this.value = sValue;

    });

}

function baseUrl() {
    var basePath = "";
    var href = window.location.href.split('/');
    return href[0] + '//' + href[2] + basePath + "/";
}

