let heartBeatIntervalId = 0
let heartBeatCheckLive = false
const heartBeatCheckGap = 10 * 1000

self.addEventListener('install', () => {

})

self.addEventListener('message', (e) => {
    console.log('message: ', e.data)
    switch (e.data) {
        case 'stop': {
            clearInterval(heartBeatIntervalId);
            break;
        }
        case 'alive': {
            heartBeatCheckLive = true
            break;
        }
        case 'start': {
            clearInterval(heartBeatIntervalId);
            heartBeatIntervalId = setInterval(() => {
                if (!heartBeatCheckLive) {
                    console.error('page crash')
                } else {
                    console.info('page alive')
                }
                heartBeatCheckLive = false
            }, heartBeatCheckGap)
        }
    }
})

self.addEventListener("fetch", () => {

})