(function ($) {
    // action 就是下面傳進來的 open, close, 設定值, 或是什麼都不傳
    $.fn.banner = function (action) {
        return this.each(function(){
            var settings = $.extend({
                openAtStart: true,
                autoToggle: 1000,
                button: {
                    closeText: '收合', // [string]
                    openText: '展開', // [string]
                    class: 'btn' // [string]
                },
                class: {
                    closed: 'closed', // [string]
                    closing: 'closing', // [string]
                    opened: 'opened', // [string]
                    opening: 'opening' // [string]
                },
                transition: true,
                whenTransition: function() {
                    console.log('whenTransition');
                }
            });
            var CloseText = settings.button.closeText;
            var OpenText = settings.button.openText;
            var ClassClosed = settings.class.closed;
            var ClassClosing = settings.class.closing;
            var ClassOpen = settings.class.opened;
            var ClassOpening = settings.class.opening;
            var ThisBanner = $(this);
            var ThisBtn = $(this).children('button');
            var BannerOpen = function(){
                ThisBtn.removeClass(ClassClosed).addClass(ClassOpen).text(CloseText);
                ThisBanner.removeClass(ClassClosed).addClass(ClassOpen);
            };
            var BannerClose = function(){
                ThisBtn.removeClass(ClassOpen).addClass(ClassClosed).text(settings.button.openText);
                ThisBanner.removeClass(ClassOpen).addClass(ClassClosed);
            };
            var BannerToggle = function(){
                var closed = ThisBanner.hasClass(ClassClosed);
                if (closed) {
                    ThisBanner.removeClass(ClassClosed).addClass(ClassOpen);
                    ThisBtn.text(CloseText);
                } else {
                    ThisBanner.removeClass(ClassOpen).addClass(ClassClosed);
                    ThisBtn.text(OpenText);
                }
            };

            if (typeof action == 'string') {
                if (action == 'open') {
                    BannerOpen();
                    for(i = 0; i < 5; i++) {
                        setTimeout(() => {
                            console.log(i);
                        }, 1000)
                    }
                } else if (action == 'close') {
                    BannerClose();
                } else if (action == 'toggle') {
                    if ($('.banner').hasClass(ClassClosed)) {
                        BannerOpen();
                    } else {
                        BannerClose();
                    }
                }
            } else if (typeof action == 'object') {
                $(function(){
                    if (settings.openAtStart == true) {
                        BannerOpen();
                    }

                    if (settings.autoToggle == true) {
                        BannerToggle();
                    }

                    if (settings.autoToggle != isNaN(settings.autoToggle)) {
                        setTimeout(() => {
                            BannerToggle(); 
                        }, settings.autoToggle);
                    }

                    if (settings.transition == true) {
                        
                    }
                });

            } else if (action == undefined) {
                ThisBtn.on('click', function() {
                    BannerToggle();
                });  
            }
        });
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

    $('.banner').banner();
});

