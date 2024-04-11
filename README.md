## 当前机制

自动化执行任务: 获取指定掘金创作者文章列表与专栏信息，生成按发布年月、专栏、分类等多个维度的统计信息

自动化运行时间: 北京时间下午 `16:20` 左右

## 项目介绍

项目名：[**自动化同步文章平台（auto-sync-blog）**](https://juejin.cn/post/7210387904748503095)

作用：实现在写作平台（如掘金、CSDN、简书等）的每日能进行自动同步数据（文章标题和链接）；同时，对文章进行友好的分类，并实现更直观的浏览那些年写过的文章。

（目前仅支持掘金平台的同步，其他还在开发。）

涉及技术：**github actions**, **github pages**, **node**, **vitepress**

## 部署流程

### 直接部署流程（GitHub Fork）

1. [Fork 仓库](https://github.com/TeaTools/auto-sync-blog/fork)
2. 仓库 -> Settings -> Secrets -> New repository secret, 添加 Secrets 变量如下:

    | Name                 | Value                                                         | Required |
    | -------------------- | ------------------------------------------------------------- | -------- |
    | PRESS_TOKEN_TEA_BLOG | GitHub Personal access tokens，用户推送仓库，同步GitHub pages | 是       |

3. 更新仓库的 actions 权限：Settings -> Secret -> Actions -> General -> Workflow permissions -> 勾选 Read and write permissions -> Save.
4. 仓库 -> `configurations.js` 文件中替换个人信息并提交（该文件禁止随意 PR）。
5. 仓库 -> Actions, 检查 Workflows 并启用。
6. 更新仓库 Page 服务：Settings -> Pages -> Branch -> gh-pages （如果不出现 gh-pages 分支，重复第四步并检查是否已经完成。）-> Save 

### 本地开发流程（Be Developer）

1. 安装依赖
```cmd
npm install
```

2. 更新 configurations.js

3. 执行主入口，生成 vitepress 相关配置与 markdown 文件
```cmd
npm run sync:blog
```

4. 启动项目
```cmd
npm run dev:blog
```

5. 访问地址
```http
http://localhost:5173/
```

## 目录结构

```cmd
./
├─ LICENSE
├─ package.json
├─ package-lock.json
├─ Q&A.md        // 问题统计与解决方法
├─ README.md
├─ README_EN.md
├─ build         // 构建相关
|   └  config.base.js   // 自动生成文件的目录配置
├─ docs          // 自动生成的 vitepress 内容
|   ├─ .vitepress 
|   |    |    ├─ config // 由 vitepress.config.generator 生成的内容
|   |    |    └  theme  // 复制的 theme 样式文件与插件配置
|   └  src              // 自动生成的所有统计页面 markdown 文件
├─ works         // 核心部分
|   ├─ apis      // http api 请求地址
|   ├─ generator // 文件生成
|   ├─ requests  // 网络请求部分
|   ├─ store     // 全局数据处理与缓存
|   ├─ template  // 各类模板文件
|   ├─ utils     // 工具函数
|   ├─ website   // 博客内生成的外链地址的配置信息
```

## 后续开发计划

1. 实现多个专栏（指定多个专栏，指定用户的所有专栏）
2. 实现收藏分类（指定收藏集）
3. 实现邮箱订阅（有更新给订阅的邮箱发送）
4. 实现支持更多平台的同步（如CSDN、简书等）
5. 实现更多便捷配置（百度统计，天气，音乐）



## 贡献者

<!-- readme: collaborators,contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/tea-blog">
            <img src="https://avatars.githubusercontent.com/u/68322136?v=4" width="100;" alt="tea-blog"/>
            <br />
            <sub><b>茶博客</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/NanFangZhe404">
            <img src="https://avatars.githubusercontent.com/u/86654383?v=4" width="100;" alt="NanFangZhe404"/>
            <br />
            <sub><b>南方者</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/miyuesc">
            <img src="https://avatars.githubusercontent.com/u/50617660?v=4" width="100;" alt="miyuesc"/>
            <br />
            <sub><b>MiyueFE</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/captainfod">
            <img src="https://avatars.githubusercontent.com/u/41095458?v=4" width="100;" alt="captainfod"/>
            <br />
            <sub><b>@Captain</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Ylimhs">
            <img src="https://avatars.githubusercontent.com/u/42811965?v=4" width="100;" alt="Ylimhs"/>
            <br />
            <sub><b>Ylimhs</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors -end -->

欢迎各位英雄豪杰加入，共建更完美的 [**自动化同步文章平台（auto-sync-blog）**](https://juejin.cn/post/7210387904748503095) 。

## 问题回答（Question & Answer）
<a title="Q&A" href="Q&A.md">Question & Answer</a>

## License
auto-sync-blog is under the [MIT license](LICENSE).
