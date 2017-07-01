## 网站性能优化项目


## 运行指南

```
npm install

//启动本地服务
npm run serve

// 构建
npm run serve:dist
 

// 开启ngrok服务 查看给予的url ，测试pagespeed指标 （本地文件是 pageSpeed.html)
npm run pagespeed

访问： http://localhost:3000/  开始检查


```

[pageSpeed.html](src/pageSpeed.html)
[pizza.html](src/pizza.html)
[pizza - main.js](src/js/main.js)

## pageSpeed优化列表
- 图片压缩处理
- 大图压缩至合适尺寸 width=100
- html/css压缩
- google font文件 dns-prefetch
- js文件async加载
- css inline && css media 加载

## pizza 优化列表
- 全局变量前置声明
- use requestAnimationFrame 
- use DocumentFragment 
- scrollTop 提取到循环外部读取
- 使用getElementsByClassName 替代 querySelectorAll
- 缓存dom数量 不需要多次读取
- pizzaDom 尺寸用百分比设定
- 背景移动使用transform

