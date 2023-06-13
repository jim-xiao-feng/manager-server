// 分页
exports.pager = ({ pageNum  = 1, pageSize = 10 }) => {
    pageNum*=1;
    pageSize*=1;
    const skipIndex = (pageNum - 1) * pageSize
    return {
        page: {
            pageNum,
            pageSize
        },
        skipIndex
    }
}