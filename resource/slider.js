(function (win,doc,$) {
    function CusScrollBar(options) {
        this._init(options);
    }
    $.extend(CusScrollBar.prototype,{
        _init:function (options) {
            let self = this;
            self.options = {
                scrollDir: "y",
                contSelector: "",
                barSelector: "",
                sliderSelector: "",
                wheelStep: 10,
                tabItemSelector: ".tab-item",
                tabActiveClass: "tab-active",
                anchorSelector: '.anchor',
                correctSelector: ".correct-bot",
                articleSelector: ".scroll-ol"
            };
            $.extend(true, self.options, options || {} );
            self._initDomEvent();
            return self;
        },
        // 初始化Dom引用
        _initDomEvent : function () {
            let opts = this.options;
            this.$cont = $(opts.contSelector);
            this.$slider = $(opts.sliderSelector);
            this.$bar = opts.barSelector
                ? $(opts.barSelector)
                : self.$slider.parent();
            this.$tabItem = $(opts.tabItemSelector);
            this.$anchor = $(opts.anchorSelector);
            this.$doc = $(doc);
            this.$article = $(opts.articleSelector);
            this.$correct = $(opts.correctSelector);
            this._initSliderDragEvent()
                ._initTabEvent()
                ._bindMouseWheel()
                ._initArticleHeight()
                ._bindContScroll();
        },
        _initArticleHeight : function() {
          let self = this,
              lastArticle = self.$article.last();
          let lastArticleHeight = lastArticle.height(),
              contHeight = self.$cont.height();
          if(lastArticleHeight < contHeight){
              self.$correct[0].style.height = contHeight -
                  lastArticleHeight - self.$anchor.outerHeight() + 'px';
          }
          return self;
        },
        _initSliderDragEvent : function () {
            let slider = this.$slider,
                sliderEl = slider[0],
                self = this;
            if(sliderEl) {
                let doc = this.$doc,
                    dragStartPagePosition,
                    dragStartScrollPosition,
                    dragContBarRate;
                function mousemoveHandler(e){
                    e.preventDefault();
                    console.log("mousemove");
                    if(dragStartPagePosition == null) {
                        return;
                    }
                    self.scrollTo(dragStartScrollPosition +
                        (e.pageY - dragStartPagePosition) * dragContBarRate
                    );
                }
                slider.on("mousedown",function (e) {
                    e.preventDefault();
                    console.log("mousedown");
                    dragStartPagePosition = e.pageY;
                    dragStartScrollPosition = self.$cont[0].scrollTop;
                    dragContBarRate = self.getMaxScrollPosition() / self.getMaxSliderPosition();
                    doc.on("mousemove.scroll",
                        mousemoveHandler
                    ).on("mouseup.scroll",function (e) {
                        console.log("mouseup");
                        doc.off(".scroll");
                    });
                });
            }
            return self;
        },
        _initTabEvent : function () {
            console.log("initTabEvent")
          let self = this;
          self.$tabItem.on("click", function (e) {
              e.preventDefault();
              let index = $(this).index();
              console.log('index',index);
              self.changeTabSelect(index);
              self.scrollTo(self.$cont[0].scrollTop + self.getAnchorPosition(index));
          });
          return self;
        },
        changeTabSelect : function (index) {
            let self = this,
                active = self.options.tabActiveClass;
            console.log('active',active);
            return self.$tabItem
                .eq(index)
                .addClass(active)
                .siblings()
                .removeClass(active);
        },
        // 监听内容的滚动，同步滑块的位置
        _bindContScroll : function () {
            let self = this;
            self.$cont.on("scroll",function () {
                let sliderEl = self.$slider && self.$slider[0];
                if(sliderEl){
                    sliderEl.style.top = self.getSliderPosition() + "px";
                }
            });
            return self;
        },
        _bindMouseWheel : function() {
            let self = this;
            self.$cont.on("mousewheel DOMMouseScroll" ,function (e) {
                e.preventDefault();
                let oEv = e.originalEvent,
                    wheelRange = oEv.wheelDelta ? -oEv.wheelDelta/120 : (oEv.detail || 0)/3;
                self.scrollTo(self.$cont[0].scrollTop + wheelRange * self.options.wheelStep)
            });
            return self;
        },
        getAnchorPosition : function (index) {
          return this.$anchor.eq(index).position().top;
        },
        getAllAnchorPosition : function(){
          let self = this,
              allPositionArr = [];
          for (let i=0; i<self.$anchor.length; i++) {
              allPositionArr.push(self.$cont[0].scrollTop + self.getAnchorPosition(i));
          }
          return allPositionArr;
        },
        // 计算滑块当前的位置
        getSliderPosition : function (){
            let self = this,
                maxSliderPosition = self.getMaxSliderPosition();
            return Math.min(maxSliderPosition,
                maxSliderPosition * self.$cont[0].scrollTop /
                self.getMaxScrollPosition()
            );
        },
        // 内容可移动高度
        getMaxScrollPosition : function () {
            let self = this;
            return Math.max(self.$cont.height(),self.$cont[0].scrollHeight -
                self.$cont.height()
            );
        },
        // 滑块可移动距离
        getMaxSliderPosition: function () {
            let self = this;
            return self.$bar.height() - self.$slider.height();
        },

        scrollTo : function (positionVal) {
            let self = this;
            let posArr = self.getAllAnchorPosition();

            function getIndex(positionVal) {

            }
            self.$cont.scrollTop(positionVal);

        }

    });
    win.CusScrollBar = CusScrollBar;
})(window,document,jQuery);
