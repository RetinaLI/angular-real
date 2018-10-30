# 车联网报告源码
> 基于`angular-cli`创建
>
> angular中文官网：https://angular.cn/docs
>
> angular-cli wiki：https://cli.angular.io/

## 产品说明

1. 用户访问时的链接形式：

   ```
   http://localhost:4200/serve.html?data=assets/json/data.json
   ```

2. 根据链接中提供的参数项`data（数据文件链接，如/assets/json/data.2312312.json）`，请求访问该json文件，获取到报告需要的数据，然后渲染页面。

## 启动

```
npm install -g @angular/cli   // 这一步推荐用npm，尽量不用cnpm
npm install
npm start
```

打开浏览器访问：<http://localhost:4200/index.html>，运行正常即启动完成。

## 访问某个报告

  + <http://localhost:4200/serve.html?data=assets/json/data.json>   `注意后面的参数`

## 发布

  + 在该工程目录打开git bash或者在vscode中启动终端（保证终端是bash环境，具体设置见iov-web-mobile/README.md）
  + 发布到104： `bash deploy.sh 104`，执行完成后会要求输入密码，输入`foton[zk]`，回车即可发布到104，具体请注意控制台提示。
  + 发布到生产工程：`bash deploy.sh`，执行完成后会自动提交到`iov-web-api`工程，具体请注意控制台提示。

## 开发注意事项

1. 严格遵守`angular`、`typescript`、`webpack`开发规范；
2. 能用`angular-cli`命令行创建的代码，就用命令行创建，禁止手动创建；
3. 定义的每一项数据，都必须有相应的数据结构或类型声明；
4. 可复用的功能和代码块，多抽取成组件、pipe、指令等等；
5. 可复用的数据结构，多抽取成interface，并export；

## 常用angular命令
`g = generate; c = component; m = module; s = service; d = directive; p = pipe`
1. 创建组件: ~ ng g c 生成文件路径/包名 (--module=)注入包名/文件
2. 创建模块: ~ ng g m 路径/包名 (--routing: 生成路由文件)
3. 创建服务: ~ ng g s 路径/包名
4. 创建指令: ~ ng g d 路径/包名
5. 创建管道: ~ ng g p 路径/包名

## 工程介绍：

1. common

  + common class
    1. .vc 垂直居中（父元素需相对定位）
    2. .part 每个块的圆角白底盒子
    3. .title-blue 带下划线的蓝色字体标题
    4. .table table
    5. .detail 每个part下面的文字介绍（蓝底黑字，个别页面），里面的蓝字用span包裹

2. common component ***所有的公共组件要在providers/share.module中引用、共享***
  + part padding: .15rem
  + top-nav 顶部banner，
    + 需传入bannerInfo，数据结构参考top-nav/top-nav.interface
    + 需传入theme, 分别为 sell/product/serve/logistic/quality
  + part-title 每块的标题
  + map 地图
  + pie 环形饼图
    + 需传入IPieData[], 包含name，value
    + 需传入chartTitle, 环形图中间显示的数据
    + 需传入chartColor, 环形图需要的颜色，按照顺序
    + 需传入id, echarts的id
    + 选择传入label, 按环形图对应位置显示仅value数据，传true，默认false
    + 选择传入nameData, 按环形图底部显示各颜色对应的name数据，传true，默认false
    + 选择传入richData，按环形图对应位置显示name和value数据，传true，默认false
  + logo-bottom 底部logo
  + pie-list 销售报告“各品牌车辆库存占比”下的图标和列表，当同一个页面使用两次时，需传入不同的name，若只用一次，传或不传都可以；需传入data，{name:xxx, value: xxx}格式；颜色使用的是global.varibale.ts 中的FIVE_COLORS，可另行定义
  + img-text-sheet 图文数字模块
    + 需传入sheetsList，数据结构参考img-text-sheet/img-text-sheet.interface

3. 样式变量和ts变量
  + 样式变量  assets/styles/variable.scss
    + 使用 @import 方式引入需要的scss
  + ts变量 src/gloabl.variable.ts
    + 正常导出使用

