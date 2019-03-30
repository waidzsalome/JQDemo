# JQDemo

### 自调用匿名函数
Type_A
```bash
(function(){
    //...
}();
```
Type_B
```bash
(function(){
    //...
}()):
```
Type_C
```bash
!function(){
    //...
}();
```

### jQuery.extend
用于将一个或多个对象合并到目标对象
```bash
$.extend( target [, object1 ] [, objectN ] )
指示是否合并深度
jQuery.extend([deep],target,object1[,objectN])
深拷贝，用递归的方法将objectN中的数据合并到object1中
```
### jQuery on 方法
```bash
.on(events[,selector][,data],handler(eventObject))
```
### jQuery事件对象属性
```bash
event.pageX()
鼠标相对于文档左侧的边缘的距离
event.pageY()
鼠标相对于文档顶部边缘的距离
```

### 元素属性
```bash
div.scrollTop
“元素中的内容”超出“元素上边界”的那部分高度（像素数）
div.scrollLeft
“元素中的内容”超出“元素左边界”的那部分高度（像素数）
```
## 一丢丢JS相关

### prototype
prototype 属性向对象添加属性和方法

### $.fn或jquery.fn
$.fn是指jquery的命名空间
如扩展$.fn.abc(),即$.fn.abc()是对jquery扩展了一个abc方法，
那么后面你的每一个jquery实例都可以iyinyong这个方法

### JS new原理
- 创建一个新对象
```bash
var o = {};
```
- 将构造函数的作用域赋给新对象（因此this指向了这个新对象）
```bash

```
- 执行构造函数中的代码（为这个新对象添加属性）
- 返回新对象

console.log("_initDomEvent")
console.log("_initSliderDragEvent")
console.log("_bindContScroll")
console.log("getSliderPosition")
console.log("getMaxScrollPosition")
console.log("getMaxSliderPosition")
console.log("scrollTo")