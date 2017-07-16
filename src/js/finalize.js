$(document).ready(function() {
    // initialize functions
    materialAPEX.datepicker.init();
    materialAPEX.select.init();
    materialAPEX.ir.init();
    materialAPEX.ig.init();
    materialAPEX.observe.toolbar();
    materialAPEX.observe.select();
    materialAPEX.observe.irDialog();
    Materialize.updateTextFields();

    // triggers a resize
    $(document).trigger("apexwindowresized");

    // making the page visible again
    // !important is required to overwrite what APEX already does
    $("html").attr('style', 'visibility: visible!important');

    // event handler for apexafterrefresh
    $('select').on('apexafterrefresh', function(){
        materialAPEX.debug.time("apexafterrefresh");
        materialAPEX.select.init();
        materialAPEX.debug.timeEnd("apexafterrefresh");
    });

    // event handler for interactive reports
    $(".a-IRR-container").closest(".ma-region").on("apexafterrefresh", function() {
        materialAPEX.debug.time("IRR-apexafterrefresh");
        materialAPEX.ir.init();
        materialAPEX.select.ir();
        materialAPEX.debug.timeEnd("IRR-apexafterrefresh");
    });

    // global apexafterrefresh handler
    $(document).on("apexafterrefresh", function() {
        materialAPEX.debug.time("apexafterrefresh");
        materialAPEX.items.init();
        materialAPEX.textarea.init();
        materialAPEX.debug.timeEnd("apexafterrefresh");
    });

    // event handler #1 for interactive grids
    $(document).on("gridpagechange", function(event, object) {
        materialAPEX.debug.time("gridpagechange");
        materialAPEX.ig.init();
        materialAPEX.items.init();
        materialAPEX.debug.timeEnd("gridpagechange");
    });

    // event handler #2 for interactive grids
    $(document).on("apexbeginrecordedit", function(event, object) {
        materialAPEX.debug.time("apexbeginrecordedit");
        materialAPEX.debug.timeEnd("apexbeginrecordedit");
    });

    // event handler #3 for interactive grids
    $(document).on("interactivegridselectionchange", function(event, object) {
        materialAPEX.debug.time("interactivegridselectionchange");
        materialAPEX.items.init(object.recordId);
        materialAPEX.debug.timeEnd("interactivegridselectionchange");
    });

    // modal interactive grid
    $(document).on("dialogopen", function(event, object) {
        materialAPEX.debug.time("dialogopen");
        materialAPEX.select.refresh("#" + event.target.id + " select");
        materialAPEX.items.init("#" + event.target.id);
        materialAPEX.items.utr();
        materialAPEX.debug.timeEnd("dialogopen");
    });

    // modal interactive grid
    $(document).on("dialogclose", function(event, object) {
        materialAPEX.debug.time("dialogclose");
        materialAPEX.debug.timeEnd("dialogclose");
    });
});
