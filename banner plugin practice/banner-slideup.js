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
        transition: true,
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
    var TransitonOpen = function(){ 
        setTimeout(function(){
            $(this.$ele).removeClass(ClassClosed).addClass(ClassOpening);
            setTimeout(() => {
                $(this.$ele).addClass(ClassOpen).removeClass(ClassOpening);
            }, 500);
            Module.DEFAULTS.whenTransition();
        });
    }
    var TransitonClose = function(){ 
        setTimeout(function(){
            $(this.$ele).removeClass(ClassOpen).addClass(ClassClosing);
            setTimeout(() => {
                $(this.$ele).addClass(ClassClosed).removeClass(ClassClosing);
            }, 500);
            Module.DEFAULTS.whenTransition();
        });
    }

    Module.prototype.init = function () {
        $(this.$ele).append('<button class="'+Module.DEFAULTS.button.class+'"></button>');
    }

	Module.prototype.open = function () {
        console.log($(this.$ele));
        $(this.$ele).children('button').removeClass(ClassClosed).addClass(ClassOpen).text(CloseText);
        if (Module.DEFAULTS.transition == true) {
            TransitonOpen();
        } else {
            $(this.$ele).removeClass(ClassClosed).addClass(ClassOpen);
        }
	};

	Module.prototype.close = function () {
		$(this.$ele).children('button').removeClass(ClassOpen).addClass(ClassClosed).text(OpenText);
        if (Module.DEFAULTS.transition == true) { 
            TransitonClose();
        } else {
            $(this.$ele).removeClass(ClassOpen).addClass(ClassClosed);
        }
    };
    
    Module.prototype.toggle = function () {
        var closed = $(this.$ele).hasClass(ClassClosed);
            if (closed) {
                Module.open();
            } else {
                Module.Close();
            }
    };
        
    $.fn[ModuleName] = function ( methods, options ) {
		return this.each(function(){
			var $this = $(this);
			var module = $this.data( ModuleName );
			var opts = null;
			if ( !!module ) {
				if ( typeof options === 'string') {
                    module.open();
				} else if ( typeof options === 'string' &&  typeof options2 === 'object' ) {
					module[options](options2);
				} else {
					// console.log('unsupported options!');
					// throw 'unsupported options!';
				}
			} else {
                opts = $.extend( {}, Module.DEFAULTS, 
                    ( typeof methods === 'object' && options ), 
                    ( typeof options === 'object' && options ) );
				module = new Module(this, opts);
                $this.data( ModuleName, module );
                module.init();
                console.log(module.open());
			} 
		});
	};

})(jQuery);

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