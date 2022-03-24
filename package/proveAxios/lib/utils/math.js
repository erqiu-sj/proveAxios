export function middle(num) {
    if (num.length % 2 === 0)
        return num[num.length / 2] + num[num.length / 2 - 1] / 2;
    return num[parseInt(num.length / 2)];
}
