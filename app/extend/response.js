const codes = {
    0: '',
    1: '服务器错误',
    2: '未知错误',
    1000: '未登录',
    1001: '用户名或密码错误',
    2000: '标题和内容不能为空'
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
            code = typeof codes[value] === 'string' ? value : '2'
            this.message = typeof codes[value] === 'string' ? codes[value] : codes['2']
        },
        /**
         * 状态码
         * @type {* number}
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
     */
    async _sendJson () {
        this.header['Content-Type'] = 'application/json' // 设置响应头为 JSON 格式
        this.body = this._responseData // 返回响应数据
    }
}