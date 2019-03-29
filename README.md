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

## 一丢丢JS相关

### prtotype
proptotype 属性向对象添加属性和方法

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
