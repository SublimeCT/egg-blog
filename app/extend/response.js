const codes = {
    0: {
        httpCode: 200,
        content: '操作成功'
    },
    1: {
        httpCode: 500,
        content: '服务器错误'
    },
    2: {
        httpCode: 500,
        content: '未知错误'
    },
    1000: {
        httpCode: 401,
        content: '未登录'
    },
    1001: {
        httpCode: 401,
        content: '用户名或密码错误'
    },
    2000: {
        httpCode: 400,
        content: '标题和内容不能为空'
    },
    2001: {
        httpCode: 400,
        content: '文章创建失败'
    },
    2002: {
        httpCode: 400,
        content: '创建失败, 文章标题重复'
    },
    2003: {
        httpCode: 201,
        content: '文章创建成功'
    }
}

let code = '0'

module.exports = {
    /**
     * 统一 API 响应格式
     * @type {object}
     */
    _responseData: {
        set code (value) {
            if (typeof value !== 'string') throw new Error('not string')
            code = typeof codes[value] === 'object' ? value : '2'
            this.message = typeof codes[value] === 'object' ? codes[value].content : codes['2'].content
        },
        /**
         * 状态码
         * @type {number}
         */
        get code () {
            return code
        },
        /**
         * 错误信息
         * @type {string}
         */
        message: '',
        /**
         * 响应数据
         * @type {object}
         */
        data: {}
    },
    /**
     * 发送 API 响应
     * @alert 2018年02月24日14:00:01 sven
     *      统一通过该方法设置错误码
     * @note 后端按照 restful 规范返回状态码和 message
     * @param {string} 错误码
     */
    async _sendJson (_code = '0') {
        this._responseData.code = _code // 统一在这里设置错误码
        this.status = codes[code].httpCode // 设置 HTTP status code
        this.header['Content-Type'] = 'application/json' // 设置响应头为 JSON 格式
        this.body = this._responseData // 返回响应数据
    }
}