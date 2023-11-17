let heartBeatIntervalId = 0
let heartBeatCheckLive = false
const heartBeatCheckGap = 10 * 1000

const startHeartBeatMonitor = () => {
    heartBeatIntervalId = setInterval(() => {
        if (!heartBeatCheckLive) {
            console.error('page crash')
        } else {
            // console.info('page alive')
        }
        heartBeatCheckLive = false
    }, heartBeatCheckGap)
}

const stopHeartBeatMonitor = () => {
    clearInterval(heartBeatIntervalId)
}

const freshHeartBeat = () => {
    heartBeatCheckLive = true
}

const messageHandle = (e: MessageEvent) => {
    // console.log('HeartBeatMonitor:', e.data)
    if (e.data === 'start') {
        startHeartBeatMonitor()
        console.log('supportedEntryTypes: ', PerformanceObserver.supportedEntryTypes)
    } else if (e.data === 'stop') {
        stopHeartBeatMonitor()
    } else if (e.data === 'alive') {
        freshHeartBeat()
    }
}

self.addEventListener('message', messageHandle)