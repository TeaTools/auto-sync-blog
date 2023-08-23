const WORK = require('./public/src/work');
const argv = require('./public/common/utils/minimist')(process.argv.slice(2)); // 指令处理 node 入参（这个 minimist 存在的问题：入参的数很大，会为小的）

const run = () => {
    console.log(argv);
    const {
        juejin_user_id,
        juejin_column_id,
        baidu_count_url,
    } = argv;
    if (!juejin_user_id) {
        console.log("juejin_user_id不能为空，是必选！");
        return;
    }
    // 当前未解决百度统计问题，参数接收出现问题（baidu_count_url是失效状态）
    WORK.run(String(juejin_user_id), String(juejin_column_id), baidu_count_url);
};

run();