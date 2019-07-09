(function($) {

    var Tab = function(el, options) {
        this.$el = $(el);
        this.options = $.extend({}, Tab.DEFAULTS, options);
        this.tabItems = this.$el.find('.tab-nav li');
        this.contentItems = this.$el.find('.tab-content .content-item');
        if (this.options.auto) {
            this.timer = null;
            this.loop = this.options.invoke;
        }

    }
    //配置默认参数
    Tab.DEFAULTS = {
        //定义鼠标的触发类型 click||mouseover
        triggerType: 'mouseover',
        //定义内容的切换效果 fade||slide||...
        effect: 'default',
        //默认展示当前tab的小标
        invoke: 0,
        //是否自动切换，指定切换时间，则为自动切换
        auto: false
    }
    //初始化
    Tab.prototype.init = function() {
        this.bindEvent()
        if (this.options.auto) {
            this.autoPlay();
            this.hover();
        }
    }
    //切换事件
    Tab.prototype.bindEvent = function() {
        console.log(this)
        var that = this;
        var opts = that.options; //为了减少内存消耗
        //当前展示第几张
        that.tabItems.removeClass('active').eq(opts.invoke).addClass('active')
        that.contentItems.removeClass('current').eq(opts.invoke).addClass('current')
        this.tabItems.on(opts.triggerType, function() {

            var index = $(this).index();
            var opts = that.options;
            that.tabItems.removeClass('active').eq(index).addClass('active')
            if (opts.effect == 'default') {
                that.contentItems.removeClass('current').eq(index).addClass('current')
            } else {
                that.contentItems.fadeOut().eq(index).fadeIn()
            }

            //如果设为自动播放的情况
            if (that.options.auto) {
                that.loop = index;
            }
        })
    }

    //自动播放
    Tab.prototype.autoPlay = function() {

        var that = this;
        var opts = this.options; //为了减少内存消耗
        var len = this.tabItems.length;
        console.log(opts)
        this.timer = window.setInterval(function() {

            that.loop++;
            if (that.loop >= len) {
                that.loop = 0;
            }
            that.tabItems.eq(that.loop).trigger(opts.triggerType)
        }, opts.auto)


    }

    //鼠标移入移出
    Tab.prototype.hover = function() {
        var that = this;
        this.$el.hover(function() {
            window.clearInterval(that.timer)
        }, function() {
            that.autoPlay()
        })
    }

    var init = function(el, options) {

        if (options.triggerType != 'click') {
            options.triggerType = 'mouseover' //防止用户写错
        }
        if (options.effect != 'fade') {
            options.effect = 'default' //防止用户写错
        }
        var tab = new Tab(el, options);
        tab.init()
    }

    //jQuery插件
    $.fn.extend({
        tab: function(options) {
            this.each(function() {
                init(this, options)
            })
        }
    })

})(jQuery)