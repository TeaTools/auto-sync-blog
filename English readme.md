 ## Current Mechanism

Automated task execution: Fetch articles from a specified column of a specified user on Juejin, and update the article directory link to GitHub pages.

Automated run time: Around 16:20 Beijing time.

## Project Introduction

Project name: **Automated Article Synchronization Platform (auto-sync-blog)**

Function: Achieve daily automatic synchronization of data (article titles and links) on writing platforms (such as Juejin, CSDN, JianShu, etc.); at the same time, categorize articles in a user-friendly manner, and provide a more intuitive browsing experience for articles written over the years. (Currently only supports synchronization of the Juejin platform, others are under development.)

Involved technologies: **github actions**, **github pages**, **node**, **vuepress**

## Deployment Process

### Direct Deployment Process (GitHub Fork)

1. [Fork the repository](https://github.com/tea-blog/tea-blog.github.io)
2. Repository -> Settings -> Secrets -> New repository secret, add Secrets variables as follows:

    | Name                 | Value                                                         | Required |
    | -------------------- | ------------------------------------------------------------- | -------- |
    | JUEJIN_USER_ID       | Juejin user id                                                | Yes      |
    | JUEJIN_COLUMN_ID     | Juejin column id                                              | Optional |
    | PRESS_TOKEN_TEA_BLOG | GitHub Personal access tokens, used to push to the repository, synchronize GitHub pages | Yes      |

3. Update the repository's actions permissions: Settings -> Secret -> Actions -> General -> Workflow permissions -> Check Read and write permissions -> Save.
4. Repository -> Actions, check Workflows and enable them.
5. Settings -> Pages -> Branch -> gh-pages (If the gh-pages branch does not appear, repeat the fourth step and check if it has been completed.) -> Save 

### Local Deployment Process (Be Developer)

1. Execute the main entry, generate vuepress related configuration (where juejin_user_id corresponds to a string of numbers after user/ on the personal homepage of Juejin)
```cmd
node .\main.js --juejin_user_id=2819602825362840 --juejin_column_id=7140398633710518302
```
2. Install dependencies
```cmd
npm install
```
3. Start the project
```cmd
npm start
```
4. Visit the address
```http
http://localhost:8080/
```

## Directory Structure

```cmd
 ./
├─main.js // Main entry
├─package-lock.json 
├─package.json // Related dependencies and startup methods
├─README.md // Introduction 
├─Q&A.md // Problem statistics and solutions
├─public // Main part
|   ├─z-test // Test
|   |   └test.js
|   ├─utils // Method calls
|   |   ├─ArticleUtils. // Article data processing
|   |   ├─DateUtils.js // Time processing
|   |   ├─FileUtils.js // File processing
|   |   ├─Http.js // Request
|   |   ├─minimist.js // Node parameter processing
|   |   └VuepressUtils.js // Generate vuepress related configuration
|   ├─template // Template
|   |    ├─vuepress // Template for generating vuepress related configuration
|   |    |    ├─config-template.js
|   |    |    └readme-template.md
|   |    ├─article // Template for generating markdown files
|   |    |    ├─all-template.md
|   |    |    ├─year-month-template.md
|   |    |    └year-template.md
|   ├─src // Main entry of the main part
|   |  └catch-main.js
|   ├─base // Basic data
|   |  ├─base-data.js // Static data
|   |  └cover.jpg // Static image
├─docs // Below are the folders and files generated after executing node locally
|  ├─README.md // Vuepress related configuration
|  ├─sort // Main markdown files
|  |  ├─all.md
|  |  ├─2023
|  |  |  ├─2023.md
|  |  |  ├─202301.md
|  |  |  └202302.md
|  |  ├─2022
|  |  |  ├─2022.md
|  |  |  └202201.md
|  ├─.vuepress // Vuepress related configuration
|  |     ├─config.js
|  |     ├─public
|  |     |   └cover.jpg
```

## Future Development Plan

1. Implement multiple columns (specify multiple columns, all columns of specified users)
2. Implement favorite classification (specify collection)
3. Implement email subscription (send to subscribed email when updated)
4. Implement more flexible vuepress configuration files (easier to modify, etc.)
5. Implement support for more platform synchronization (such as CSDN, JianShu, etc.)
6. Implement more convenient configurations (Baidu statistics, weather, music)

## Contributors
## 贡献者

<!-- readme: collaborators,contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/tea-blog">
            <img src="https://avatars.githubusercontent.com/u/68322136?v=4" width="100;" alt="tea-blog"/>
            <br />
            <sub><b>南方者</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Ylimhs">
            <img src="https://avatars.githubusercontent.com/u/42811965?v=4" width="100;" alt="Ylimhs"/>
            <br />
            <sub><b>Ylimhs</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/NanFangZhe404">
            <img src="https://avatars.githubusercontent.com/u/86654383?v=4" width="100;" alt="NanFangZhe404"/>
            <br />
            <sub><b>南方者</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors -end -->
欢迎各位英雄豪杰加入，共建更完美的 **自动化同步文章平台（auto-sync-blog）** 。

## 问题回答（Question & Answer）
<a title="Q&A" href="Q&A.md">Question & Answer</a>

## License
auto-sync-blog is under the [GPL license](LICENSE).



