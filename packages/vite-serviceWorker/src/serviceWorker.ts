

let intervalId = 0
document.addEventListener('visibilitychange',(e)=>{
    console.log(e)
})
window.addEventListener('load', () => {
    if (navigator.serviceWorker) {
        /**
         * { scope: "./" } 很重要，它决定了能控制哪些目录，决定了navigator.serviceWorker.controller是否有值
         * vite 体系下需要将文件放到public目录，不然会默认加上src目录，
         */
        navigator.serviceWorker.register(new URL('/heartBeatWorker.ts', import.meta.url), { scope: "./" }).then((res: ServiceWorkerRegistration) => {
            console.log(res.active)
            // res.active?.postMessage('start')
            // intervalId = setInterval(() => {
            //     res.active?.postMessage('alive')
            // }, 5 * 1000)
            // let count = 0;
            navigator.serviceWorker.controller?.postMessage('start');
            intervalId = setInterval(() => {
                navigator.serviceWorker.controller?.postMessage('alive');
                // if (count > 5) {
                //     while (count > 5) {
                //         true
                //     }
                // }
                // count++
            }, 5 * 1000);
        })
    }
})

window.addEventListener('beforeunload', () => {
    navigator.serviceWorker.controller?.postMessage('stop')
    clearInterval(intervalId)
})