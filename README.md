# nodejs： 用 javascript 写后台

- 性能高（chrome v8）

- 跟前台配合方便

- 适合前端人员入门

- 适合场景：小型项目、工具——中间层

- 天然跨域

## http 模块（协议）

```javascript
const http = require("http");

const httpServer = http.createServer();
httpServer.listen(8080);
```

- listen：等待客户端连接

- 端口：数字 -> 区分不同的服务

  - 别人没使用过

  - Linux: 1024+

  - 每种服务都有默认的端口

    - web 80

    - ssh 22

    - ftp 21

    - mysql 3306

- res

  - write -> body

  - writeHeader -> header

## fs 文件系统模块

- readFile

- writeFile

## 模块化 CMD

- 没有 define

- require、exports、module

- 引用自定义模块

  - 放在 node_modules , 引用路径直接为模块名 (推荐)

  - 路径前加 `./` (表示在当前目录寻找模块)

### 创建 node 包

- 命名：n+包名（区分系统的模块名）

- 创建包信息

  - `npm init`

  - 生成一个 package.json 文件，描述包的信息

- 使用

  - 手动 copy 到工程的 node_modules 目录下。能被使用的范围比较小

  - 发布

    `npm publish`

## 框架：Express/KOA

- Express 基于回调

- KOA 1.x 基于 generator/yield
- KOA 2.x 过渡 yield/await
- KOA 3.x 基于 async/await
