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

    var CloseText = Module.DEFAULTS.button.closeText;
    var OpenText = Module.DEFAULTS.button.openText;
    var ClassClosed = Module.DEFAULTS.class.closed;
    var ClassClosing = Module.DEFAULTS.class.closing;
    var ClassOpen = Module.DEFAULTS.class.opened;
    var ClassOpening = Module.DEFAULTS.class.opening;

    var TransitonOpen = function($ele, options){
        $ele
            .children('.' + options.button.class)
            .removeClass(ClassClosed)
            .addClass(ClassOpen)
            .text(CloseText);

        setTimeout(function(){
            $ele.removeClass(ClassClosed).addClass(ClassOpening);
            setTimeout(function() {
                $ele.addClass(ClassOpen).removeClass(ClassOpening);
            }, 300);
            options.whenTransition();
        });
    }
    var TransitonClose = function($ele, options){
        $ele
            .children('.' + options.button.class)
            .removeClass(ClassOpen)
            .addClass(ClassClosed)
            .text(OpenText);

        setTimeout(function(){
            $ele.removeClass(ClassOpen).addClass(ClassClosing);
            setTimeout(function() {
                $ele.addClass(ClassClosed).removeClass(ClassClosing);
            }, 300);
            options.whenTransition();
        });
    }

    Module.prototype.init = function () {
        var that = this;
        $(this.$ele).append('<button class="'+this.option.button.class+'"></button>');

        if (this.option.autoToggle === true) {
            that.toggle();
        }

        if (this.option.autoToggle !== isNaN(this.option.autoToggle)) {
            setTimeout(function() {
                that.toggle();
        }, this.option.autoToggle);
        }

        if (this.option.openAtStart) {
            this.open();
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
                .removeClass(ClassClosed)
                .addClass(ClassOpen)
                .text(CloseText);

            $(this.$ele)
                .removeClass(ClassClosed)
                .addClass(ClassOpen);
        }
	};

	Module.prototype.close = function () {
        if (this.option.transition == true) {
            TransitonClose(this.$ele, this.option);
        } else {
            $(this.$ele)
                .children('.' + this.option.button.class)
                .removeClass(ClassOpen)
                .addClass(ClassClosed)
                .text(OpenText);

            $(this.$ele)
                .removeClass(ClassOpen)
                .addClass(ClassClosed);
        }
    };
    
    Module.prototype.toggle = function () {
        var closed = $(this.$ele).hasClass(ClassClosed);
            if (closed) {
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
        autoToggle: 1500, // [boolean|number] true | false | 3000
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

    // $('.banner').banner('toggle');
    //
    // $('.banner').banner('open');
    //
    // $('.banner').banner('close');

    // $('.banner').banner();
});