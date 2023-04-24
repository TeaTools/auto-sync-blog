## 当前机制

自动化执行任务: 获取掘金指定用户指定专栏的文章， 并将文章目录链接更新至GitHub pages

自动化运行时间: 北京时间下午 `16:20` 左右

## 项目介绍

项目名：**自动化同步文章平台（auto-sync-blog）**

作用：实现在写作平台（如掘金、CSDN、简书等）的每日能进行自动同步数据（文章标题和链接）；同时，对文章进行友好的分类，并实现更直观的浏览那些年写过的文章。（目前仅支持掘金平台的同步，其他还在开发。）

涉及技术：**github actions**, **github pages**, **node**, **vuepress**

## 部署流程

### 直接部署流程（GitHub Fork）

1. [Fork 仓库](https://github.com/TeaTools/auto-sync-blog/fork)
2. 仓库 -> Settings -> Secrets -> New repository secret, 添加 Secrets 变量如下:

    | Name                 | Value                                                         | Required |
    | -------------------- | ------------------------------------------------------------- | -------- |
    | JUEJIN_USER_ID       | 掘金用户id                                                    | 是       |
    | JUEJIN_COLUMN_ID     | 掘金专栏id                                                    | 可选     |
    | PRESS_TOKEN_TEA_BLOG | GitHub Personal access tokens，用户推送仓库，同步GitHub pages | 是       |

3. 更新仓库的 actions 权限：Settings -> Secret -> Actions -> General -> Workflow permissions -> 勾选 Read and write permissions -> Save.
4. 仓库 -> Actions, 检查 Workflows 并启用。
5. Settings -> Pages -> Branch -> gh-pages （如果不出现 gh-pages 分支，重复第四步并检查是否已经完成。）-> Save 

### 本地部署流程（Be Developer）

1. 执行主入口，生成 vuepress 相关配置（其中 juejin_user_id 是对应掘金个人首页的user/后面带的一串数字 ）
```cmd
node .\main.js --juejin_user_id=2819602825362840 --juejin_column_id=7140398633710518302
```
2. 安装依赖
```cmd
npm install
```
3. 启动项目
```cmd
npm start
```
4. 访问地址
```http
http://localhost:8080/
```

## 目录结构

```cmd
 ./
├─LICENSE
├─main.js // 主入口
├─package-lock.json
├─package.json // 相关依赖和启动方式
├─Q&A.md // 问题统计与解决方法
├─README.md // 介绍 
├─public // 主要部分
|   ├─z-test // 测试
|   |   └测试数据.js
|   ├─template // 模板
|   |    ├─vuepress // 生成 vuepress 相关配置的模板
|   |    |    ├─config-template.js
|   |    |    └readme-template.md
|   |    ├─column // 生成专栏 markdown 文件的模板
|   |    |   ├─article-template.md
|   |    |   ├─hot-template.md
|   |    |   └my-template.md
|   |    ├─article // 生成时间分类 markdown 文件的模板
|   |    |    ├─all-template.md
|   |    |    ├─year-month-template.md
|   |    |    └year-template.md
|   ├─src // 主要部分的主入口
|   |  ├─work.js // 主要工作模块
|   |  ├─generate // 生成模块
|   |  |    ├─generate.js
|   |  |    ├─vuepress
|   |  |    |    └utils.js
|   |  |    ├─juejin
|   |  |    |   └utils.js
|   |  |    ├─common
|   |  |    |   ├─base.js
|   |  |    |   └FileUtils.js
|   |  ├─details // 解析模块
|   |  |    ├─details.js
|   |  |    ├─vuepress
|   |  |    |    ├─base.js
|   |  |    |    └utils.js
|   |  |    ├─juejin
|   |  |    |   ├─base.js
|   |  |    |   └utils.js
|   |  ├─catch // 获取模块
|   |  |   ├─catch.js
|   |  |   ├─juejin
|   |  |   |   ├─base.js
|   |  |   |   └utils.js
|   ├─common // 公共方法
|   |   ├─cover.jpg
|   |   ├─utils
|   |   |   ├─DateUtils.js
|   |   |   ├─Http.js
|   |   |   └minimist.js
├─docs // 以下是本地执行 node 后，会生成的文件夹和文件
|  ├─README.md // vuepress 的相关配置
|  ├─sort // 主要 markdown 文件
|  |  ├─all.md
|  |  ├─column // 专栏分类
|  |  |   ├─我的专栏.md
|  |  |   ├─推荐专栏.md
|  |  |   ├─my
|  |  |   | ├─未分类.md
|  |  |   | └茶博客.md
|  |  |   ├─hot
|  |  |   |  └茶博客.md
|  |  ├─2023 // 时间分类
|  |  |  ├─2023.md
|  |  |  └202304.md
|  ├─.vuepress // vuepress 的相关配置
|  |     ├─config.js
|  |     ├─public
|  |     |   └cover.jpg
```

## 后续开发计划

1. 实现多个专栏（指定多个专栏，指定用户的所有专栏）
2. 实现收藏分类（指定收藏集）
3. 实现邮箱订阅（有更新给订阅的邮箱发送）
4. 实现更灵活的 vuepress 配置文件（更方便修改等）
5. 实现支持更多平台的同步（如CSDN、简书等）
6. 实现更多便捷配置（百度统计，天气，音乐）



## 贡献者

<!-- readme: collaborators,contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/NanFangZhe404">
            <img src="https://avatars.githubusercontent.com/u/86654383?v=4" width="100;" alt="NanFangZhe404"/>
            <br />
            <sub><b>南方者</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/tea-blog">
            <img src="https://avatars.githubusercontent.com/u/68322136?v=4" width="100;" alt="tea-blog"/>
            <br />
            <sub><b>茶博客</b></sub>
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
欢迎各位英雄豪杰加入，共建更完美的 **自动化同步文章平台（auto-sync-blog）** 。

## 问题回答（Question & Answer）
<a title="Q&A" href="Q&A.md">Question & Answer</a>

## License
auto-sync-blog is under the [GPL license](LICENSE).
