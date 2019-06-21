(function ($) {
    // action 就是下面傳進來的 open, close, 設定值, 或是什麼都不傳
    $.fn.banner = function (action) {
        if (typeof action == 'string') {
            // 傳進來是 字串 指令時 $('.banner').banner('open')

            if (action == 'open') {
                // 這邊就是下面 $('.banner')
            } else if (action == 'close') {
                // 這邊就是下面 $('.banner')
            } else if (action == 'toggle') {
                // 這邊就是下面 $('.banner')
            }
        } else if (typeof action == 'object') {
            /**
             *  傳進來是 設定值 $('.banner').banner({
             *      openAtStart: false
             *  })
             * */

        } else if (action == undefined) {
            // 什麼都不傳, 註冊 on click 事件
        }

        // var closed = $('.banner').hasClass('closed');
        // $('.btn').on('click', function() {
        //     closed = $('.banner').hasClass('closed');
        //     if (closed) {
        //         $('.banner').removeClass('closed');
        //         $('.banner').addClass('opened');
        //     } else {
        //         $('.banner').removeClass('opened');
        //         $('.banner').addClass('closed');
        //     }
        // });
    };
}(jQuery));

$(function () {
    $('.banner').banner({
        // 設定一開始是否為開或合
        openAtStart: true, // [boolean] true | false
        // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
        autoToggle: true, // [boolean|number] true | false | 3000
        // 設定收合展開按鈕
        button: {
            closeText: '收合', // [string]
            openText: '展開', // [string]
            class: 'btn' // [string]
        },
        // 設定模組在各狀態時的class
        class: {
            closed: 'closed', // [string]
            closing: 'closing', // [string]
            opened: 'opened', // [string]
            opening: 'opening' // [string]
        },
        // 是否要有transition效果
        transition: true,
        // 當有transition時，要執行的callback function
        whenTransition: function () {
            console.log('whenTransition');
        }
    });

    $('.banner').banner('toggle');

    $('.banner').banner('open');

    $('.banner').banner('close');
});

