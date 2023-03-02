const CatchMain = require('./public/src/catch-main');
const argv = require('./public/utils/minimist')(process.argv.slice(2)); // 指令处理 node 入参（这个 minimist 存在的问题：入参的数很大，会为小的）

const run = () => {
    console.log(argv);
    const {
        juejin_user_id,
        juejin_column_id,
    } = argv;
    CatchMain.catchTxt(String(juejin_user_id), String(juejin_column_id));
};

run();