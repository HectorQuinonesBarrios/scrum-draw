$(function () {
    var kanbanCol = $('.panel-body');
    kanbanCol.css('max-height', (window.innerHeight - 150) + 'px');

    var kanbanColCount = parseInt(kanbanCol.length);
    $('.container-fluid').css('min-width', (kanbanColCount * 350) + 'px');

    draggableInit();

    $('.panel-heading').click(function() {
        var $panelBody = $(this).parent().children('.panel-body');
        $panelBody.slideToggle();
    });
});

function draggableInit() {
    let sourceId;

    $('[draggable=true]').bind('dragstart', function (ev) {
        sourceId = $(this).parent().attr('id');
        ev.originalEvent.dataTransfer.setData("text", ev.target.id);
    });

    $('.panel-body').bind('dragover', function (ev) {
        ev.preventDefault();
    });

    $('.panel-body').bind('drop', function (ev) {
        var children = $(this).children();
        var targetId = children.attr('id');

        if (sourceId != targetId) {
            let elementId = ev.originalEvent.dataTransfer.getData("text");

            $('#processing-modal').modal('toggle'); //before post

            $.post('/tarjetas?_method=PUT', {_id: elementId, backlog: targetId}, function(data) {
              console.log(data);
              let element = document.getElementById(elementId);
                children.prepend(element);
            }).always(function() {
              $('#processing-modal').modal('toggle');
            });
        }

        ev.preventDefault();
    });
}
