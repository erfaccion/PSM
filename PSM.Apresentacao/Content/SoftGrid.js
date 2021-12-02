
var SoftGrid_SelectedIndex = -1;
var SoftGrid_dataSource;
var SoftGrid_Cols = {};
var SoftGrid_RemovedField = "";
var SoftGrid_RemovedValue = "";
var SoftGrid_Config = undefined;

//Versao 1
//SoftGrid_Cols = {
//    { "column": "Id", "label": "ID", "sort": true, "align": "left", "type": "int", "width": 100 },
//    { "column": "NOME", "label": "Nome", "sort": true, "align": "left", "type": "string", "width": 300 },
//    { "column": "Email", "label": "E-mail", "sort": true, "align": "left", "type": "string", "width": 300 },
//    { "column": "GRUPO", "label": "Grupo", "sort": true, "align": "left", "type": "string", "width": 150 },
//    { "column": "TIPO", "label": "Tipo", "sort": true, "align": "left", "type": "string", "width": 150 }
//};


//Versao 2
//SoftGrid_Config =
//{
//    "grid1": {
//        "SelectedIndex": -1,
//        "DataSource": undefined,
//        "RemovedField": "",
//        "RemovedValue": "",
//        "Width": 850,
//        "Height": 300,
//        "HeaderHeight": 30,
//        "RowHeight": 30,
//        "ViewIcon": false,
//        "EditIcon": true,
//        "RemoveIcon": true,
//        "ViewRow": undefined,
//        "EditRow": undefined,
//        "DeleteRow": undefined,
//        "ClickRow": undefined,
//        "DoubleClickRow": undefined,
//        "Columns": [
//            { "column": "PRODUTO_CODIGO", "label": "Código", "sort": true, "align": "left", "type": "string", "width": 150 },
//            { "column": "PRODUTO_DESCRICAO", "label": "Descrição", "sort": true, "align": "left", "type": "string", "width": 300 },
//            { "column": "QUANTIDADE", "label": "Qtdade", "sort": false, "align": "right", "type": "number", "decimals": 2, "width": 70 },
//            { "column": "PRECO", "label": "Preço", "sort": false, "align": "right", "type": "number", "decimals": 2, "width": 100 },
//            { "column": "TOTAL", "label": "Total", "sort": false, "align": "right", "type": "number", "decimals": 2, "width": 100 }
//        ],
//        "Sum": [
//            { "column": "TOTAL_PRODUTOS", "label": "Vl. Materiais", "align": "right", "type": "number", "decimals": 2, "width": 180, "value": 0 },
//            { "column": "TOTAL_SERVICOS", "label": "Vl. Mão Obra", "align": "right", "type": "number", "decimals": 2, "width": 180, "value": 0 },
//            { "column": "TOTAL", "label": "Total OS", "align": "right", "type": "number", "decimals": 2, "width": 180, "value": 0 }
//        ]
//    }
//}






function SoftGrid_ConstructObject() {

    if (SoftGrid_Config === undefined) {
        //Versão 1.0

        SoftGrid_ConfigCols("");
        SoftGrid_ShowData("");
    }
    else {
        //Versão 2.0

        for (var prop in SoftGrid_Config) {
            if (SoftGrid_Config.hasOwnProperty(prop)) {

                $("." + prop).css("width", SoftGrid_Config[prop]["Width"]);
                $("." + prop).css("height", SoftGrid_Config[prop]["Height"]);
                $("." + prop).empty();

                var oDivPanel = jQuery('<div style="width: 100%; height: 100%; overflow-x: hidden; overflow-y: hidden;"></div>');
                oDivPanel.append(jQuery('<div class="grid-header ' + prop + '-HD" style="width: 100%; height: ' + SoftGrid_Config[prop]["HeaderHeight"] + 'px;"></div>'));
                //oDivPanel.append(jQuery('<div class="grid-details ' + prop + '-DT" style="width: 100%; height: ' + (SoftGrid_Config[prop]["Height"] - SoftGrid_Config[prop]["HeaderHeight"] - 30) + 'px; overflow-x: hidden; overflow-y: auto; padding-top: 5px;"></div>'));
                //oDivPanel.append(jQuery('<div id="grid-footer-' + prop + '" style="display: inline-flex; height: 38px; width: 100%; position: relative; top: -10px; background-color: #f9f9f9; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"></div>'));


                oDivPanel.append(jQuery('<div class="grid-details ' + prop + '-DT" style="width: 100%; height: calc(100% - 70px); overflow-x: hidden; overflow-y: auto; padding-top: 5px;"></div>'));
                oDivPanel.append(jQuery('<div id="grid-footer-' + prop + '" style="display: inline-flex; height: 38px; width: 100%; position: relative; bottom: -2px; background-color: #f9f9f9; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"></div>'));
                $("." + prop).append(oDivPanel);


                SoftGrid_ConfigCols(prop);
                SoftGrid_ShowData(prop);
            }
        }
    }

}

function SoftGrid_FormatNumber(num, dec, curr) {

    var oNumObj = parseFloat(num);
    var arrNumObj = oNumObj.toFixed(dec).replace(".", ",").toString().split(",");

    if (arrNumObj[0].length>3) {
        var sFormated = "";
        for (var idx = 0; idx < arrNumObj[0].length; idx++) {
            if ((idx > 0) && ((idx % 3)==0))
                sFormated = "." + sFormated;
            sFormated = arrNumObj[0][arrNumObj[0].length - idx - 1] + sFormated;
        }
        return (curr + sFormated + "," + arrNumObj[1]);
    }

    return (curr + oNumObj.toFixed(dec).replace(".", ","));

}

function SoftGrid_SetPage(sKey, iPagina) {
    if (SoftGrid_Config[sKey]["Pagina"] === undefined) return;
    SoftGrid_Config[sKey]["Pagina"] = iPagina;

    if (window[SoftGrid_Config[sKey]["DataFunction"]] !== undefined)
        window[SoftGrid_Config[sKey]["DataFunction"]]();

}

function SoftGrid_PageDiv(sKey) {

    //<div style="position: relative; top: 0px; left: 100px; width: 100%; display: inline-flex; padding-left: 10px;">
    //    <a href="javascript: SoftGrid_SetPage('grid1', 1);"><span class="grid-page-button">1</span></a>
    //    <a href="javascript: SoftGrid_SetPage('grid1', 2);"><span class="grid-page-button">2</span></a>
    //    <a href="javascript: SoftGrid_SetPage('grid1', 3);"><span class="grid-page-button">3</span></a>
    //</div>



}

function SoftGrid_SetLoading(sKey, state) {
    if (state === true) {
        $("." + sKey + "-grid-loading").css("display", "block");
        //setTimeout(function () { $("." + sKey + "-grid-loading").css("display", "block"); }, 10);
    }
    else {
        setTimeout(function () { $("." + sKey + "-grid-loading").css("display", "none"); }, 3000);
        
    }
}

function SoftGrid_ConfigCols(sKey) {
    var classeHeader = "";
    var classeHeaderCell = "";

    if (sKey === "") {
        classeHeader = "grid-header";
        classeHeaderCell = "grid-header-cell";
    }
    else {
        classeHeader ="grid-header " + sKey + "-HD";
        classeHeaderCell = "grid-header-cell " + sKey + "-header-cell-HD";
    }

    $("." + classeHeader).empty();

    if (SoftGrid_Config === undefined) {
        //Versao 1
        if (SoftGrid_Cols.length !== undefined) {

            $("." + classeHeader).append(jQuery("<div class='" + classeHeaderCell + "' style='width: 30px;'></div>"));
            $("." + classeHeader).append(jQuery("<div class='" + classeHeaderCell + "' style='width: 25px;'></div>"));
            $("." + classeHeader).append(jQuery("<div class='" + classeHeaderCell + "' style='width: 25px;'></div>"));

            for (var iCol = 0; iCol < SoftGrid_Cols.length; iCol++) {
                //alert(SoftGrid_Cols[iCol]["column"]);
            
                var oDiv = jQuery("<div field='" + SoftGrid_Cols[iCol]["column"] + "' sortable='" + SoftGrid_Cols[iCol]["sort"] + "' />");
                oDiv.addClass(classeHeaderCell);
                oDiv.css("width", SoftGrid_Cols[iCol]["width"]);
                oDiv.append(jQuery("<span style='width: " + SoftGrid_Cols[iCol]["width"] + "px; text-align: " + SoftGrid_Cols[iCol]["align"] + ";'>" + SoftGrid_Cols[iCol]["label"] + "&nbsp;</span>"));
                
                
                $("." + classeHeader).append(oDiv);
            
            }

            $("." + classeHeaderCell).css("height", "50px");
            $("." + classeHeaderCell).css("line-height", "50px");
            //$("." + classeHeaderCell).css("vertical-align", "middle");

            

            SoftGrid_ConstructSortEvent(sKey);
        }
    }
    else {
        //Versao 2
        SoftGrid_SetLoading(sKey, true);

        if (SoftGrid_Config[sKey]["Columns"].length !== undefined) {
            $("." + sKey + "-HD").empty();

            if (SoftGrid_Config[sKey]["ViewIcon"] === true)
                $("." + sKey + "-HD").append(jQuery("<div class='" + classeHeaderCell + "' style='width: 30px;'></div>"));
            if (SoftGrid_Config[sKey]["EditIcon"] === true)
                $("." + sKey + "-HD").append(jQuery("<div class='" + classeHeaderCell + "' style='width: 25px;'></div>"));
            if (SoftGrid_Config[sKey]["RemoveIcon"] === true)
                $("." + sKey + "-HD").append(jQuery("<div class='" + classeHeaderCell + "' style='width: 25px;'></div>"));
            if (SoftGrid_Config[sKey]["TruckIcon"] === true)
                $("." + sKey + "-HD").append(jQuery("<div class='" + classeHeaderCell + "' style='width: 25px;'></div>"));
            if (SoftGrid_Config[sKey]["AddIcon"] === true)
                $("." + sKey + "-HD").append(jQuery("<div class='" + classeHeaderCell + "' style='width: 25px;'></div>"));

            var divColumnChooser = (jQuery("<div id='" + sKey + "-column-buttom-div" + "' style='position: absolute; top: 0px; right: 0px; width: 200px; height: 300px; background-color: #EFEFFF; border: solid 1px #0000FF; z-index: 1000; display: none; overflow: auto;'></div>"));
            divColumnChooser.append(jQuery("<div id='" + sKey + "-column-buttom-aplicar" + "' style='width: 100%; height: " + SoftGrid_Config[sKey]["HeaderHeight"] + "px; line-height: " + SoftGrid_Config[sKey]["HeaderHeight"] + "px; background-color: blue; text-align: center; color: #ffffff; font-weight: bold;'>Aplicar</div>"));

            for (var iCol = 0; iCol < SoftGrid_Config[sKey]["Columns"].length; iCol++) {
                divColumnChooser.append(jQuery("<input type='checkbox' id='ck" + sKey + "_" + iCol + "' class='" + sKey + "-column-checkbox' index='" + iCol + "' " + ((SoftGrid_Config[sKey]["Columns"][iCol]["Visible"] === true) ? "checked" : "") + "></input><span>" + SoftGrid_Config[sKey]["Columns"][iCol]["label"] + "</span><br>"))

                if ((SoftGrid_Config[sKey]["Columns"][iCol]["Visible"] === true) || (SoftGrid_Config[sKey]["Columns"][iCol]["Visible"] === undefined)) {

                    var oDiv = jQuery("<div field='" + SoftGrid_Config[sKey]["Columns"][iCol]["column"] + "' sortable='" + SoftGrid_Config[sKey]["Columns"][iCol]["sort"] + "' />");
                    oDiv.addClass(classeHeaderCell);
                    oDiv.css("width", SoftGrid_Config[sKey]["Columns"][iCol]["width"]);
                    oDiv.append(jQuery("<span style='width: " + SoftGrid_Config[sKey]["Columns"][iCol]["width"] + "px; height: " + SoftGrid_Config[sKey]["HeaderHeight"] + "px; line-height: " + SoftGrid_Config[sKey]["HeaderHeight"] + "px; display: inline-block; vertical-align: middle; text-align: " + SoftGrid_Config[sKey]["Columns"][iCol]["align"] + ";'>" + SoftGrid_Config[sKey]["Columns"][iCol]["label"] + "&nbsp;</span>"));
            
                    $("." + sKey + "-HD").append(oDiv);
                }
            }
            
            if (SoftGrid_Config[sKey]["ModifyColumn"] === true) {
                $("." + sKey + "-HD").append(jQuery("<div class='" + classeHeader + " " + sKey + "-column-buttom" + " grid-modify-column-buttom' style='width: 25px;'></div>"));

                $("." + sKey + "-HD").parent().parent().append(divColumnChooser);
                $("." + sKey + "-HD").parent().parent().append(jQuery("<div class='grid-loading " + sKey + "-grid-loading'></div>"));


                $("." + sKey + "-column-buttom, #" + sKey + "-column-buttom-aplicar").on("click", function () {
                     if ($("." + sKey + "-column-buttom").hasClass("selected")) {
                         SoftGrid_SetLoading(sKey, true);

                         var checks = document.getElementsByClassName(sKey + "-column-checkbox");
                         for (var iGridIndex = 0; iGridIndex < SoftGrid_Config[sKey]["Columns"].length; iGridIndex++) {
                             if (checks[iGridIndex].checked) {
                                 SoftGrid_Config[sKey]["Columns"][iGridIndex]["Visible"] = true;
                             }
                             else {
                                 SoftGrid_Config[sKey]["Columns"][iGridIndex]["Visible"] = false;
                             }
                         }
               
                         $("#" + sKey + "-column-buttom-div").css("display", "none");
                         $("." + sKey + "-column-buttom").removeClass("selected");
               
                         SoftGrid_ConfigCols(sKey);
                         SoftGrid_ShowData(sKey);
               
                     }
                     else {
                         $("#" + sKey + "-column-buttom-div").css("display", "block");
                         $("." + sKey + "-column-buttom").addClass("selected");
                     }
                });

            }



            SoftGrid_SetLoading(sKey, false);


            SoftGrid_ConstructSortEvent(sKey);
        }
    }

}

function SoftGrid_SetOverflowIcon() {
    return;

    var cells = document.getElementsByClassName("grid-item-cell");
    for (cell in cells) {
        for (var i = 0; i < cells[cell].childElementCount; i++) {
            if (cells[cell].offsetWidth < (cells[cell].children[i].offsetWidth + cells[cell].children[i].offsetLeft)) {
                cells[cell].classList.add("grid-item-overflow");
            }
            else {
                cells[cell].classList.remove("grid-item-overflow");
            }
        }
    }
}

function SoftGrid_ShowData(sKey) {
    //'$' + new Number(settings.value).toFixed(2);   //Formatação numérica

    var classeDetails = "";
    var classeDetailsCell = "";

    if (sKey === "") {
        classeDetails = "grid-item";
        classeDetailsCell = "grid-item-cell";
    }
    else {
        classeDetails = "grid-item " + sKey + "-HD";
        classeDetailsCell = "grid-item-cell " + sKey + "-item-cell-DT";
    }


    if (SoftGrid_Config === undefined) {
        //Versao 1
        $(".grid-details").empty();

        if (SoftGrid_Cols.length !== undefined) {

            for (var index = 0; index < SoftGrid_dataSource.length; index++) {
                var oDivRow = jQuery("<div index='" + index + "' class='grid-item' style='width: 100%; height: 50px; overflow: hidden;' />");

                if ((SoftGrid_RemovedField !== "") && (SoftGrid_dataSource[index][SoftGrid_RemovedField] === SoftGrid_RemovedValue))
                    oDivRow.addClass("grid-item-removed");

                oDivRow.append(jQuery("<div class='grid-item-cell grid-item-view-buttom' style='width: 30px;'></div>"));
                oDivRow.append(jQuery("<div class='grid-item-cell grid-item-edit-buttom' style='width: 25px;'></div>"));
                oDivRow.append(jQuery("<div class='grid-item-cell grid-item-remove-buttom' style='width: 25px;'></div>"));

                for (var iCol = 0; iCol < SoftGrid_Cols.length; iCol++) {
                    //alert(SoftGrid_dataSource[index][SoftGrid_Cols[iCol]["column"]]);

                    var oDivCell = jQuery("<div />");
                    oDivCell.addClass("grid-item-cell");
                    oDivCell.css("width", SoftGrid_Cols[iCol]["width"]);
                    oDivCell.css("line-height", "50px");

                    if (SoftGrid_Cols[iCol]["align"] == "right") {
                        oDivCell.css("text-align", "right");
                    }

                    if (SoftGrid_Cols[iCol]["type"] === "image") {
                        oDivCell.append(jQuery("<img src='" + baseUrl() + SoftGrid_dataSource[index][SoftGrid_Cols[iCol]["column"]] + "' width='40' height='40' style='border-radius: 20px; position: relative; top: 5px;'></img>"));
                    }
                    else if (SoftGrid_Cols[iCol]["type"] === "date") {
                        //SoftGrid_dataSource[index][SoftGrid_Cols[iCol]["column"]]

                        if (SoftGrid_dataSource[index][SoftGrid_Cols[iCol]["column"]] !== null) {
                            var oGridDate = (parseJsonDate(SoftGrid_dataSource[index][SoftGrid_Cols[iCol]["column"]]));

                            if (isValidDate(oGridDate)) {
                                oGridDate = convertToDate(SoftGrid_dataSource[index][SoftGrid_Cols[iCol]["column"]]);
                            }

                            oDivCell.append(jQuery("<span style='width: " + SoftGrid_Cols[iCol]["width"] + "px; text-align: " + SoftGrid_Cols[iCol]["align"] + ";'>" + formatDate(oGridDate) + "</span>"));
                        }
                        else {
                            oDivCell.append(jQuery("<span style='width: " + SoftGrid_Cols[iCol]["width"] + "px; text-align: " + SoftGrid_Cols[iCol]["align"] + ";'>&nbsp;</span>"));
                        }
                    }
                    else if (SoftGrid_Cols[iCol]["type"] === "number") {
                        var iDecimals = 0;
                        if (SoftGrid_Cols[iCol]["decimals"] !== undefined) {
                            iDecimals = parseInt(SoftGrid_Cols[iCol]["decimals"]);
                        }

                        var sCurrency = "";
                        if (SoftGrid_Cols[iCol]["currency"] !== undefined) {
                            sCurrency = SoftGrid_Cols[iCol]["currency"];
                        }

                        oDivCell.append(jQuery("<span style='width: " + SoftGrid_Cols[iCol]["width"] + "px; text-align: " + SoftGrid_Cols[iCol]["align"] + ";'>" + SoftGrid_FormatNumber(SoftGrid_dataSource[index][SoftGrid_Cols[iCol]["column"]], iDecimals, sCurrency).toString() + "</span>"));
                    }
                    else {
                        oDivCell.append(jQuery("<span style='width: " + SoftGrid_Cols[iCol]["width"] + "px; text-align: " + SoftGrid_Cols[iCol]["align"] + ";'>" + SoftGrid_dataSource[index][SoftGrid_Cols[iCol]["column"]] + "</span>"));
                    }
                    oDivRow.append(oDivCell);

                }
                $(".grid-details").append(oDivRow);
            }

        }

    }
    else {
        //Versão 2
        $("." + sKey + "-DT").empty();

        SoftGrid_SetLoading(sKey, true);

        SoftGrid_Config[sKey]["SelectedCellIndex"] = -1;
        SoftGrid_Config[sKey]["TotalCellNumber"] = 0;

        if ((SoftGrid_Config[sKey]["Columns"].length !== undefined) && (SoftGrid_Config[sKey]["DataSource"] !== undefined)) {

            //Inicializar Totalizadores
            if (SoftGrid_Config[sKey]["Sum"] !== undefined) {
                for (var iCol = 0; iCol < SoftGrid_Config[sKey]["Sum"].length; iCol++) {
                    SoftGrid_Config[sKey]["Sum"][iCol]["value"] = 0;
                }
            }

            for (var index = 0; index < SoftGrid_Config[sKey]["DataSource"].length; index++) {
                var oDivRow = jQuery("<div index='" + index + "' class='" + classeDetails + "' style='width: 100%; height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; overflow: hidden;' />");

                if ((SoftGrid_Config[sKey]["RemovedField"] !== "") && (SoftGrid_Config[sKey]["DataSource"][index][SoftGrid_Config[sKey]["RemovedField"]] === SoftGrid_Config[sKey]["RemovedValue"]))
                    oDivRow.addClass("grid-item-removed");

                if (SoftGrid_Config[sKey]["ViewIcon"] === true)
                    oDivRow.append(jQuery("<div class='" + classeDetailsCell + " grid-item-view-buttom' style='width: 30px;'></div>"));
                if (SoftGrid_Config[sKey]["EditIcon"] === true)
                    oDivRow.append(jQuery("<div class='" + classeDetailsCell + " grid-item-edit-buttom' style='width: 25px;'></div>"));
                if (SoftGrid_Config[sKey]["RemoveIcon"] === true)
                    oDivRow.append(jQuery("<div class='" + classeDetailsCell + " grid-item-remove-buttom' style='width: 25px;'></div>"));
                if (SoftGrid_Config[sKey]["TruckIcon"] === true)
                    oDivRow.append(jQuery("<div class='" + classeDetailsCell + " grid-item-truck-buttom' style='width: 25px;'></div>"));
                if (SoftGrid_Config[sKey]["AddIcon"] === true)
                    oDivRow.append(jQuery("<div class='" + classeDetailsCell + " grid-item-add-buttom' style='width: 25px;'></div>"));

                for (var iCol = 0; iCol < SoftGrid_Config[sKey]["Columns"].length; iCol++) {

                    if ((SoftGrid_Config[sKey]["Columns"][iCol]["Visible"] === true) || (SoftGrid_Config[sKey]["Columns"][iCol]["Visible"] === undefined)) {

                        var oDivCell = jQuery("<div />");
                        oDivCell.addClass(classeDetailsCell);
                        oDivCell.addClass(sKey + "-cell-" + SoftGrid_Config[sKey]["TotalCellNumber"]);     //identificar célula pelo número
                        oDivCell.css("width", SoftGrid_Config[sKey]["Columns"][iCol]["width"]);
                        oDivCell.css("line-height", "50px");

                        if (SoftGrid_Config[sKey]["Columns"][iCol]["align"] == "right") {
                            oDivCell.css("text-align", "right");
                        }

                        //Aplicar CSS customizado à célula
                        if (SoftGrid_Config[sKey]["Columns"][iCol]["css"] !== undefined) {
                            for (var iCss = 0; iCss < SoftGrid_Config[sKey]["Columns"][iCol]["css"].length; iCss++) {
                                oDivCell.css(SoftGrid_Config[sKey]["Columns"][iCol]["css"][iCss]["attr"], SoftGrid_Config[sKey]["Columns"][iCol]["css"][iCss]["value"]);
                            }
                        }

                        var sValor = SoftGrid_Config[sKey]["DataSource"][index][SoftGrid_Config[sKey]["Columns"][iCol]["column"]];

                        if (window[SoftGrid_Config[sKey]["Columns"][iCol]["CellRender"]] !== undefined) {
                            window[SoftGrid_Config[sKey]["Columns"][iCol]["CellRender"]](oDivCell, index, iCol, sValor);
                        }
                        else {


                            //Aplicação de Máscara
                            if ((SoftGrid_Config[sKey]["Columns"][iCol]["mask"]) !== undefined) {
                                sValor = window[SoftGrid_Config[sKey]["Columns"][iCol]["mask"]](sValor);
                                //alert(sValor);
                            }

                            if (SoftGrid_Config[sKey]["Columns"][iCol]["type"] === "image") {
                                //oDivCell.append(jQuery("<img src='" + window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + SoftGrid_Config[sKey]["DataSource"][index][SoftGrid_Config[sKey]["Columns"][iCol]["column"]] + "' width='" + SoftGrid_Config[sKey]["RowHeight"] + "' height='" + SoftGrid_Config[sKey]["RowHeight"] + "' style='border-radius: 20px; line-height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; display: inline-block; vertical-align: middle;'></img>"));
                                oDivCell.append(jQuery("<img src='" + baseUrl() + SoftGrid_Config[sKey]["DataSource"][index][SoftGrid_Config[sKey]["Columns"][iCol]["column"]] + "' width='" + SoftGrid_Config[sKey]["RowHeight"] + "' height='" + SoftGrid_Config[sKey]["RowHeight"] + "' style='border-radius: 20px; line-height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; display: inline-block; vertical-align: middle;'></img>"));
                            }
                            else if (SoftGrid_Config[sKey]["Columns"][iCol]["type"] === "date") {
                                //var oGridDate = (parseJsonDate(SoftGrid_Config[sKey]["DataSource"][index][SoftGrid_Config[sKey]["Columns"][iCol]["column"]]));
                                var oGridDate = formatDate(parseJsonDate(sValor));


                                if (isValidDate(oGridDate)) {
                                    //oGridDate = convertToDate(sValor);
                                    oDivCell.append(jQuery("<span style='width: " + SoftGrid_Config[sKey]["Columns"][iCol]["width"] + "px; height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; line-height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; display: inline-block; vertical-align: middle; text-align: " + SoftGrid_Config[sKey]["Columns"][iCol]["align"] + ";'>" + oGridDate + "</span>"));
                                }
                                else {
                                    oDivCell.append(jQuery("<span style='width: " + SoftGrid_Config[sKey]["Columns"][iCol]["width"] + "px; height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; line-height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; display: inline-block; vertical-align: middle; text-align: " + SoftGrid_Config[sKey]["Columns"][iCol]["align"] + ";'></span>"));
                                    //alert(formatDate(oGridDate));
                                }
                            }
                            else if (SoftGrid_Config[sKey]["Columns"][iCol]["type"] === "number") {
                                var iDecimals = 0;
                                if (SoftGrid_Config[sKey]["Columns"][iCol]["decimals"] !== undefined) {
                                    iDecimals = parseInt(SoftGrid_Config[sKey]["Columns"][iCol]["decimals"]);
                                }

                                var sCurrency = "";
                                if (SoftGrid_Config[sKey]["Columns"][iCol]["currency"] !== undefined) {
                                    sCurrency = SoftGrid_Config[sKey]["Columns"][iCol]["currency"];
                                }

                                oDivCell.append(jQuery("<span style='width: " + SoftGrid_Config[sKey]["Columns"][iCol]["width"] + "px; height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; line-height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; display: inline-block; vertical-align: middle; text-align: " + SoftGrid_Config[sKey]["Columns"][iCol]["align"] + ";'>" + SoftGrid_FormatNumber(SoftGrid_Config[sKey]["DataSource"][index][SoftGrid_Config[sKey]["Columns"][iCol]["column"]], iDecimals, sCurrency).toString() + "</span>"));
                            }
                            else {
                                oDivCell.append(jQuery("<span style='width: " + SoftGrid_Config[sKey]["Columns"][iCol]["width"] + "px; height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; line-height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; display: inline-block; vertical-align: middle; text-align: " + SoftGrid_Config[sKey]["Columns"][iCol]["align"] + ";'>" + sValor + "</span>"));
                            }
                        }

                        oDivRow.append(oDivCell);

                        //Contar celulas
                        SoftGrid_Config[sKey]["TotalCellNumber"] = SoftGrid_Config[sKey]["TotalCellNumber"] + 1;
                    }

                }
                $("." + sKey + "-DT").append(oDivRow);


                //Totalizadores
                if (SoftGrid_Config[sKey]["Sum"] !== undefined) {
                    for (var iCol = 0; iCol < SoftGrid_Config[sKey]["Sum"].length; iCol++) {
                        if (((SoftGrid_Config[sKey]["Sum"][iCol]["funcao"]) === undefined) || ((SoftGrid_Config[sKey]["Sum"][iCol]["funcao"]) === "SUM"))
                            SoftGrid_Config[sKey]["Sum"][iCol]["value"] = SoftGrid_Config[sKey]["Sum"][iCol]["value"] + SoftGrid_Config[sKey]["DataSource"][index][SoftGrid_Config[sKey]["Sum"][iCol]["column"]];
                        if ((SoftGrid_Config[sKey]["Sum"][iCol]["funcao"]) === "COUNT")
                            SoftGrid_Config[sKey]["Sum"][iCol]["value"] = SoftGrid_Config[sKey]["Sum"][iCol]["value"] + 1;
                    }
                }

            }

            //Plotar Combo Páginas
            if ((SoftGrid_Config[sKey]["Pagina"] !== undefined) && (SoftGrid_Config[sKey]["RegistrosPagina"] !== undefined) && (SoftGrid_Config[sKey]["RegistrosPagina"] > 0) && (SoftGrid_Config[sKey]["TotalRegistros"] !== undefined)) {

                var sDivPag = jQuery('<div style="position: relative; top: calc(50% - 10px); left: 10px; width: 100%; display: inline-flex; padding-left: 10px;" />');

                var iTotalPag = (SoftGrid_Config[sKey]["TotalRegistros"] / SoftGrid_Config[sKey]["RegistrosPagina"]) + 1;
                //alert(SoftGrid_Config[sKey]["TotalRegistros"]);

                for (var iIndexPag = 1; iIndexPag <= iTotalPag; iIndexPag++) {

                    if (SoftGrid_Config[sKey]["Pagina"] === iIndexPag)
                        sDivPag.append('<a href="javascript: SoftGrid_SetPage(' + "'" + sKey + "'" + ', ' + iIndexPag + ');"><span class="grid-page-button-selected">' + iIndexPag + '</span></a>');
                    else
                        sDivPag.append('<a href="javascript: SoftGrid_SetPage(' + "'" + sKey + "'" + ', ' + iIndexPag + ');"><span class="grid-page-button">' + iIndexPag + '</span></a>');
                }

                $("#grid-footer-" + sKey).append(sDivPag);
            }


            //Plotar Totalizadores
            $(".grid-footer-" + sKey).empty();
            if (SoftGrid_Config[sKey]["Sum"] !== undefined) {
                for (var iCol = 0; iCol < SoftGrid_Config[sKey]["Sum"].length; iCol++) {

                    var oDivCell = jQuery("<div />");
                    oDivCell.css("width", SoftGrid_Config[sKey]["Sum"][iCol]["width"]);
                    oDivCell.css("line-height", (SoftGrid_Config[sKey]["Sum"][iCol]["height"] + "px"));
                    oDivCell.css("display", "inline-flex");
                    oDivCell.css("white-space", "nowrap");
                    oDivCell.css("padding-left", "10px");
                    oDivCell.css("font-weight", "bold");
                    //oDivCell.css("color", "#3b4fd2");

                    if (SoftGrid_Config[sKey]["Sum"][iCol]["align"] == "right") {
                        oDivCell.css("text-align", "right");
                    }

                    var iDecimals = 0;
                    if (SoftGrid_Config[sKey]["Sum"][iCol]["decimals"] !== undefined) {
                        iDecimals = parseInt(SoftGrid_Config[sKey]["Sum"][iCol]["decimals"]);
                    }

                    var sCurrency = "";
                    if (SoftGrid_Config[sKey]["Sum"][iCol]["currency"] !== undefined) {
                        sCurrency = SoftGrid_Config[sKey]["Sum"][iCol]["currency"];
                    }

                    oDivCell.append(jQuery("<span style='height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; line-height: " + SoftGrid_Config[sKey]["RowHeight"] + "px; display: inline-block; vertical-align: middle; text-align: right;'>" + SoftGrid_Config[sKey]["Sum"][iCol]["label"] + ": <span style='color: #3b4fd2;'>" + SoftGrid_FormatNumber(SoftGrid_Config[sKey]["Sum"][iCol]["value"], iDecimals, sCurrency).toString() + "</span></span>"));

                    $("#grid-footer-" + sKey).append(oDivCell);
                    
                }
            }



        }


        //Rodar evento OnShowData
        if (window[SoftGrid_Config[sKey]["OnShowData"]] !== undefined)
            window[SoftGrid_Config[sKey]["OnShowData"]]();


    }

    SoftGrid_SetOverflowIcon();
    SoftGrid_ConstructClickEvent(sKey);

    SoftGrid_SetLoading(sKey, false);

}

function SoftGrid_ConstructClickEvent(sKey) {

    var classeDetails = "";
    var classeDetailsCell = "";

    if (sKey === "") {
        classeDetails = "grid-item";
        classeDetailsCell = "grid-item-cell";
    }
    else {
        classeDetails = "grid-item " + sKey + "-HD";
        classeDetailsCell = "grid-item-cell " + sKey + "-item-cell-DT";
    }


    //View Click
    var view_btn = document.getElementsByClassName(classeDetailsCell + " grid-item-view-buttom");
    for (var i = 0; i < view_btn.length; i++) {

        view_btn[i].addEventListener("click", function () {
            //alert(this.parentNode.getAttribute('index'));


            if (SoftGrid_Config === undefined) {
                //Versão 1
                if (typeof ViewRow !== "undefined") {
                    // safe to use the function
                    ViewRow(this.parentNode.getAttribute('index'));
                }
            }
            else {
                //Versão 2

                if (window[SoftGrid_Config[sKey]["ViewRow"]] !== undefined)
                    window[SoftGrid_Config[sKey]["ViewRow"]](this.parentNode.getAttribute('index'));

            }



        });
    }

    //Edit Click
    var edit_btn = document.getElementsByClassName(classeDetailsCell + " grid-item-edit-buttom");
    for (i = 0; i < edit_btn.length; i++) {

        edit_btn[i].addEventListener("click", function () {
            //alert(this.parentNode.getAttribute('index'));

            if (SoftGrid_Config === undefined) {
                //Versão 1
                if (typeof EditRow !== "undefined") {
                    // safe to use the function
                    EditRow(this.parentNode.getAttribute('index'));
                }
            }
            else {
                //Versão 2

                if (window[SoftGrid_Config[sKey]["EditRow"]] !== undefined)
                    window[SoftGrid_Config[sKey]["EditRow"]](this.parentNode.getAttribute('index'));

            }


        });
    }

    //Truck Click
    var truck_btn = document.getElementsByClassName(classeDetailsCell + " grid-item-truck-buttom");
    for (i = 0; i < truck_btn.length; i++) {

        truck_btn[i].addEventListener("click", function () {
            //alert(this.parentNode.getAttribute('index'));

            if (SoftGrid_Config !== undefined) {
                //Versão 2

                if (window[SoftGrid_Config[sKey]["TruckRow"]] !== undefined)
                    window[SoftGrid_Config[sKey]["TruckRow"]](this.parentNode.getAttribute('index'));

            }


        });
    }

    //Add Click
    var add_btn = document.getElementsByClassName(classeDetailsCell + " grid-item-add-buttom");
    for (i = 0; i < add_btn.length; i++) {

        add_btn[i].addEventListener("click", function () {
            //alert(this.parentNode.getAttribute('index'));

            if (SoftGrid_Config !== undefined) {
                //Versão 2

                if (window[SoftGrid_Config[sKey]["AddRow"]] !== undefined)
                    window[SoftGrid_Config[sKey]["AddRow"]](this.parentNode.getAttribute('index'));

            }


        });
    }

    //Delete Click
    var delete_btn = document.getElementsByClassName(classeDetailsCell + " grid-item-remove-buttom");
    for (i = 0; i < delete_btn.length; i++) {

        delete_btn[i].addEventListener("click", function () {
            //alert(this.parentNode.getAttribute('index'));
            var grid_index = this.parentNode.getAttribute('index');

            var prompt = new YesNoBox();
            prompt.show("Deseja remover o registro selecionado?", "Remover Registro", "yesno", 500, 200)
                .waitForUser()
                .then(function () {
                    //Retorno YES
                    if (SoftGrid_Config === undefined) {
                        //Versão 1
                        if (typeof DeleteRow !== "undefined") {
                            // safe to use the function
                            DeleteRow(grid_index);
                        }
                    }
                    else {
                        //Versão 2

                        if (window[SoftGrid_Config[sKey]["DeleteRow"]] !== undefined)
                            window[SoftGrid_Config[sKey]["DeleteRow"]](grid_index);

                    }

                })
                .catch(function () {
                    //Retorno NO
                    
                })
                .finally(function () {
                    prompt.hide();
                });

        });
    }


    //Row Click
    var grid_rows = document.getElementsByClassName(classeDetails);
    for (i = 0; i < grid_rows.length; i++) {
        grid_rows[i].addEventListener("click", function () {
            if (sKey === "") {
                classeDetails = "grid-item";
                classeDetailsCell = "grid-item-cell";
            }
            else {
                classeDetails = "grid-item " + sKey + "-HD";
                classeDetailsCell = "grid-item-cell " + sKey + "-item-cell-DT";
            }

            var current = document.getElementsByClassName(classeDetails + " grid-item-active");
            var grid_index = this.getAttribute('index');

            if (current.length > 0) {
                current[0].className = current[0].className.replace(" grid-item-active", "");
            }

            this.className += " grid-item-active";

            if (SoftGrid_Config === undefined) {
                //Versão 1
                SoftGrid_SelectedIndex = grid_index;
                if (typeof ClickRow !== "undefined") {
                    // safe to use the function
                    ClickRow(grid_index);
                }
            }
            else {
                //Versão 2

                SoftGrid_Config[sKey]["SelectedIndex"] = grid_index;
                if (window[SoftGrid_Config[sKey]["ClickRow"]] !== undefined)
                    window[SoftGrid_Config[sKey]["ClickRow"]](grid_index);

            }


        });
    }


    //Row DoubleClick
    grid_rows = document.getElementsByClassName(classeDetails);
    for (i = 0; i < grid_rows.length; i++) {
        grid_rows[i].addEventListener("dblclick", function () {
            var current = document.getElementsByClassName("grid-item-active");
            var grid_index = this.getAttribute('index');

            if (current.length > 0) {
                current[0].className = current[0].className.replace(" grid-item-active", "");
            }

            this.className += " grid-item-active";

            if (SoftGrid_Config === undefined) {
                //Versão 1
                SoftGrid_SelectedIndex = grid_index;
                if (typeof DoubleClickRow !== "undefined") {
                    // safe to use the function
                    DoubleClickRow(grid_index);
                }
            }
            else {
                //Versão 2

                SoftGrid_Config[sKey]["SelectedIndex"] = grid_index;
                if (window[SoftGrid_Config[sKey]["DoubleClickRow"]] !== undefined)
                    window[SoftGrid_Config[sKey]["DoubleClickRow"]](grid_index);

            }



        });
    }



    //****** teste *****

    //Cell Click
    for (i = 0; i < SoftGrid_Config[sKey]["TotalCellNumber"]; i++ ) {
        var add_btn = document.getElementsByClassName(sKey + "-cell-" + i);
        add_btn[0].setAttribute("cell_number", i);
        //alert(add_btn[0].className);

        add_btn[0].addEventListener("click", function () {
            //alert(this.className);
            //alert(this.getAttribute("cell_number"));

            if (SoftGrid_Config !== undefined) {
                //Versão 2
            
                if (window[SoftGrid_Config[sKey]["ClickCell"]] !== undefined)
                    window[SoftGrid_Config[sKey]["ClickCell"]](this.getAttribute("cell_number"));
            
            }
        
        
        });

    }

    //var add_btn = document.getElementsByClassName(classeDetailsCell);
    //for (i = 0; i < add_btn.length; i++) {
    //
    //    add_btn[i].addEventListener("click", function () {
    //        //alert(this.parentNode.getAttribute('index'));
    //
    //        if (SoftGrid_Config !== undefined) {
    //            //Versão 2
    //
    //            //if (window[SoftGrid_Config[sKey]["AddRow"]] !== undefined)
    //            //    window[SoftGrid_Config[sKey]["AddRow"]](this.parentNode.getAttribute('index'));
    //
    //        }
    //
    //
    //    });
    //}



    //******************

}

function SoftGrid_ConstructSortEvent(sKey) {
    var classeHeader = "";
    var classeHeaderCell = "";
    
    if (sKey === "") {
        classeHeader = "grid-header";
        classeHeaderCell = "grid-header-cell";
    }
    else {
        classeHeader = "grid-header " + sKey + "-HD";
        classeHeaderCell = "grid-header-cell " + sKey + "-header-cell-HD";
    }

    //Header Cell Click
    var grid_cols = document.getElementsByClassName(classeHeaderCell);
    for (var i = 0; i < grid_cols.length; i++) {
        grid_cols[i].addEventListener("click", function () {

            if (this.getAttribute('sortable') !== 'true') return;

            var current = document.getElementsByClassName("grid-sort-active-asc");
            var sortField = this.getAttribute('field');

            if (current.length > 0) {
                current[0].className = current[0].className.replace(" grid-sort-active-asc", "");
            }

            //Versao 1
            if (SoftGrid_Config === undefined) {
                SoftGrid_dataSource = SoftGrid_dataSource.sort(function (a, b) {

                    if (a[sortField] < b[sortField]) return -1;
                    if (a[sortField] === b[sortField]) return 0;
                    if (a[sortField] > b[sortField]) return 1;

                });
            }
            else {

                //Classificar DataSource
                SoftGrid_Config[sKey]["DataSource"] = SoftGrid_Config[sKey]["DataSource"].sort(function (a, b) {

                    if (a[sortField] < b[sortField]) return -1;
                    if (a[sortField] === b[sortField]) return 0;
                    if (a[sortField] > b[sortField]) return 1;

                });
            }

            SoftGrid_ShowData(sKey);

            this.className += " grid-sort-active-asc";




        });
    }

}

