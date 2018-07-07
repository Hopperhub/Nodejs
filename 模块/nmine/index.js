module.exports = {
    // 求数字各个数之和
    digital_root(n) {
        if (n < 10) {
            return n;
        }

        const arr = n.toString().split('');
        const total = arr.reduce((tmp, item) => parseFloat(tmp) + parseFloat(item));
        return total > 10 ? digital_root(total) : total;
    }
}