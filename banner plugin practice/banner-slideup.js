(function($) {
'use strict';
	var ModuleName = 'banner';

	var Module = function ( ele, options ) {
		this.ele = ele;
		this.$ele = $(ele);
        this.option = options;
    };
    
	Module.DEFAULTS = {
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
        transition: false,
        whenTransition: function() {
            console.log('whenTransition');
        }
    };

    var TransitonOpen = function($ele, options) {
        $ele
            .children('.' + options.button.class)
            .removeClass(options.class.closed)
            .addClass(options.class.opened)
            .text(options.button.closeText);

        setTimeout(function(){
            $ele
                .removeClass(options.class.closed)
                .addClass(options.class.opening);
            setTimeout(function() {
                $ele
                    .addClass(options.class.opened)
                    .removeClass(options.class.opening);
            }, 500);

            options.whenTransition();
        },);
    }

    var TransitonClose = function($ele, options) {
        $ele
            .children('.' + options.button.class)
            .removeClass(options.class.opened)
            .addClass(options.class.closed)
            .text(options.button.openText);

        setTimeout(function(){
            $ele
                .removeClass(options.class.opened)
                .addClass(options.class.closing);

            setTimeout(function() {
                $ele
                    .addClass(options.class.closed)
                    .removeClass(options.class.closing);
            }, 500);

            options.whenTransition();
        },);
    }

    Module.prototype.init = function () {
        var that = this;
        $(this.$ele).append('<button class="'+this.option.button.class+'"></button>');

        if (this.option.openAtStart) {
            this.open();
        } else {
            this.close();
        }

        if (this.option.autoToggle === true) {
            that.toggle();
        }

        if (this.option.autoToggle !== isNaN(this.option.autoToggle)) {
            setTimeout(function() {
                that.toggle();
            }, this.option.autoToggle);
        }

        var ThisBtn = $(this.$ele).children('.' + this.option.button.class);
        ThisBtn.on('click', function() {
            that.toggle()
        });
    }

	Module.prototype.open = function () {
        if (this.option.transition == true) {
            TransitonOpen(this.$ele, this.option);
        } else {
            $(this.$ele)
                .children('.' + this.option.button.class)
                .removeClass(this.option.class.closed)
                .addClass(this.option.class.opened)
                .text(this.option.button.closeText);

            $(this.$ele)
                .removeClass('closed')
                .addClass('opened');
            $(this.$ele)
                .removeClass(this.option.class.closed)
                .addClass(this.option.class.opened);
        }
	};

	Module.prototype.close = function () {
        if (this.option.transition == true) {
            TransitonClose(this.$ele, this.option);
        } else {
            $(this.$ele)
                .children('.' + this.option.button.class)
                .removeClass(this.option.class.opened)
                .addClass(this.option.class.closed)
                .text(this.option.button.openText);

            $(this.$ele)
                .removeClass('opened')
                .addClass('closed');
            $(this.$ele)
                .removeClass(this.option.class.opened)
                .addClass(this.option.class.closed);
        }
    };
    
    Module.prototype.toggle = function () {
        if ($(this.$ele).hasClass(this.option.class.closed)) {
            this.open();
        } else {
            this.close();
        }
    };

    $.fn[ModuleName] = function ( methods, options ) {
		return this.each(function() {
			var $this = $(this);
			var module = $this.data( ModuleName );
            var opts = null;

			if ( !!module ) {
				if ( typeof options === 'string') {
                    module.open();
				} else if ( typeof methods === 'string') {
                    module[methods](options);
				} else {
					// console.log('unsupported options!');
					// throw 'unsupported options!';
				}
			} else {
                opts = $.extend( {}, Module.DEFAULTS,
                    ( typeof methods === 'object' && methods ),
                    ( typeof options === 'object' && options ) );

				module = new Module(this, opts);

                $this.data( ModuleName, module );

                module.init();
			}
		});
	};

})(jQuery);

$(function () {
    $('.banner').banner({
        // 設定一開始是否為開或合
        openAtStart: true, // [boolean] true | false
        // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
        autoToggle: 300, // [boolean|number] true | false | 3000
        // 設定收合展開按鈕
        // button: {
        //     closeText: '收', // [string]
        //     openText: '開', // [string]
        //     class: 'btn' // [string]
        // },
        // 設定模組在各狀態時的class
        // class: {
        //     closed: 'clo', // [string]
        //     closing: 'cloing', // [string]
        //     opened: 'op', // [string]
        //     opening: 'oping' // [string]
        // },
        // 是否要有transition效果
        transition: true,
        // 當有transition時，要執行的callback function
        // whenTransition: function () {

        // }
    });

    // $('.banner').banner('toggle');
    //
    // $('.banner').banner('open');
    //
    // $('.banner').banner('close');
});