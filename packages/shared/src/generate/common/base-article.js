var BadgeLabelMap = {
    prefer: `<Badge text="推荐" type="warning"/>`,
    hot: `<Badge text="热文" type="error"/>`,
    new: `<Badge text="新文" type="tip"/>`, // 三天内更新的是新文
}

var AllMonthSortTemplate = "|**&{monthName}&**| &{monthTotal}& | &{01}& | &{02}& | &{03}& | &{04}& | &{05}& | &{06}& | &{07}& | &{08}& | &{09}& | &{10}& | &{11}& | &{12}&|";

module.exports = {
    BadgeLabelMap,
    AllMonthSortTemplate,
}