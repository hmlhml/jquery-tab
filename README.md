# jquery-tab jquery选项卡插件

## 使用方法

1.引入js,css文件，如下
```html
<script src="js/jquery.js"></script>
<script src="js/demo.js"></script>
<div class="tab">
  <ul class="tab-nav">
    <li><a href="javascript:;">nav1</a></li>
    <li><a href="javascript:;">nav2</a></li>
    <li><a href="javascript:;">nav3</a></li>
  </ul>
  <ul class="tab-content">
    <li class="content-item">
      <img src="images/1.jpg" alt="">
    </li>
    <li class="content-item">
      <img src="images/2.jpg" alt="">
    </li>
    <li class="content-item">
      <img src="images/3.jpg" alt="">
    </li>
  </ul>
</div>
```
2.调用方法
```javascript
$('.tab1').tab({
  triggerType:'click',  // mouseover、 click
  effect:'default', // default->显示隐藏   fade->淡入淡出
  invoke:0, // 当前显示第几张
  auto:1000 // 自动播放时间  false /  1000 
})
