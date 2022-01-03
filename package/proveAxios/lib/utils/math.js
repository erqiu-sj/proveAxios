export function middle(num) {
    if (num.length % 2 === 0)
        //判断数字个数是奇数还是偶数
        return num[num.length / 2] + num[num.length / 2 - 1] / 2; //偶数个取中间两个数的平均数
    // @ts-ignore
    return num[parseInt(num.length / 2)]; //奇数个取最中间那个数
}
//# sourceMappingURL=math.js.map