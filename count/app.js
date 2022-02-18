// 一个刷接口的定时同步脚本
const https = require('https')
const options = {
    hostname: 'camo.githubusercontent.com',
    port: 443,
    path: '/4428573f55667fb603bc5d3b1f971020b6895b1386e8b14f0fdc7189dbcf6876/68747470733a2f2f70726f66696c652d636f756e7465722e676c697463682e6d652f4d6f4d65616b392f636f756e742e737667',
    method: 'GET'
}


const promise = (num) => {
    // 闭包
    return function () {
        // 同步
        return new Promise((resolve, reject) => {
            try {
                console.log(`start req:${num++} times`)
                let startTime = new Date().getTime()
                const req = https.request(options, res => {
                    console.log(`state code: ${res.statusCode}`)
                    resolve(new Date().getTime() - startTime)
                })

                req.on('error', error => {
                    console.error(error)
                })
                req.end()
            } catch (e) {
                console.log(e)
            }
        })
    }
}

const promiseFunction = promise(0)

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`waiting:${(ms / 1000).toFixed(2)}s`);
            resolve(ms)
        }, ms)
    })
}

(async () => {
    console.log("Starting...")
    while (true) {
        try {
            await promiseFunction().then(r => console.log(`response time ${r}ms`))
            await wait(Math.random() * 50000);
            console.log("____________________")
        } catch (e) {
            console.log(e)
            break;
        }
    }
    console.log("the end")
})();
