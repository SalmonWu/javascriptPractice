(function ( $ ) {
    $.fn.banner = function(action) {
        var closed = $('.banner').hasClass('closed');

        $('.btn').on('click', function() {
            closed = $('.banner').hasClass('closed');
            if (closed) {
                $('.banner').removeClass('closed');
                $('.banner').addClass('opened');
            } else {
                $('.banner').removeClass('opened');
                $('.banner').addClass('closed');
            }
        });
    };
}(jQuery));

$(function() {
    $('.banner').banner('open');
});

