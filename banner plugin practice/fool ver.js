(function ($) {
    // action 就是下面傳進來的 open, close, 設定值, 或是什麼都不傳
    $.fn.banner = function (action) {
        var settings = $.extend({
            openAtStart: true,
            autoToggle: true,
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
        var TransitonOpen = function(){ 
            setTimeout(function(){
                ThisBanner.removeClass(ClassClosed).addClass(ClassOpening);
                setTimeout(() => {
                    ThisBanner.addClass(ClassOpen).removeClass(ClassOpening);
                }, 500);
                settings.whenTransition();
            });
        }
        var TransitonClose = function(){ 
            setTimeout(function(){
                ThisBanner.removeClass(ClassOpen).addClass(ClassClosing);
                setTimeout(() => {
                    ThisBanner.addClass(ClassClosed).removeClass(ClassClosing);
                }, 500);
                settings.whenTransition();
            });
        }
        var BannerOpen = function(){
            ThisBtn.removeClass(ClassClosed).addClass(ClassOpen).text(CloseText);
            if (settings.transition == true) {
                TransitonOpen();
            } else {
                ThisBanner.removeClass(ClassClosed).addClass(ClassOpen);
            }

        };

        var BannerClose = function(){
            ThisBtn.removeClass(ClassOpen).addClass(ClassClosed).text(OpenText);
            if (settings.transition == true) { 
                TransitonClose();
            } else {
                ThisBanner.removeClass(ClassOpen).addClass(ClassClosed);
            }
        };
        var BannerToggle = function(){
            var closed = ThisBanner.hasClass(ClassClosed);
            if (closed) {
                BannerOpen();
            } else {
                BannerClose();
            }
        };
        
        return this.each(function(){
            if (typeof action == 'string') {
                if (action == 'open') {
                    BannerOpen();
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
                ThisBanner.append('<button class="'+settings.button.class+'"></button>');
                $(this).children('button').on('click', function() {
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
        transition: false,
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

