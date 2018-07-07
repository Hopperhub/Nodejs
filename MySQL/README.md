# 数据库

- 数据分客户端和服务端

- 相对后端服务（java、nodejs...）而言，数据库是一个服务端，后端请求数据数据，对应着客户端向服务端发送请求

## 类型

- 关系型数据库 —— MySQL、Oracle

  - 优点：强大

  - 缺点：性能低

- 文件型数据库 —— SQLite

  - 优点：简单

  - 缺点：支撑不了庞大的应用，没法储存特别多的数据

- 文件型数据库 —— MongoDB

  - 优点：直接存储对象本身

  - 缺点：不够严谨，性能偏低

- 空间型数据库 —— 坐标、位置

- NoSQL

  - Redis、memcached、bigtable、hypertable

  - 优点：性能好

## MySQL

- 安装：

  - 集成软件 —— wamp

    - window(系统) + Apache + MySQL + PHP

    - 直接安装 MySQL

- 管理工具：Navicat for MySQL

- 后端服务引入 MySQL：`npm i mysql -D --save`

- Navicat for MySQL -> 库 + 表

  - 库：文件夹

  - 表：文件

- 数据库语言：SQL

  - 运行命令语句：查询编辑器

  - 常用的四个语句 —— 增删改查

    ```sql
        // 增
        INSERT INTO 表 (字段列表) VALUES (值)
        -> INSERT INTO user_table (username,password,online) VALUES ('hopper','123456',0)

        // 删
        DELETE FROM 表 WHERE 条件
        -> DELETE FROM user_table WHERE ID=3

        // 改
        UPDATE 表 SET 字段=值,字段=值... WHERE 条件
        -> UPDATE user_table SET username='siberian6',password='123666' WHERE ID=3

        // 查
        SELECT 字段列表 FROM 表 WHERE 条件
        -> SELECT username,online FROM user_table WHERE ID=1
    ```
