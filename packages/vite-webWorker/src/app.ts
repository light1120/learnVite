import MemoryMonitorWorker from './worker/memoryMonitorWorker?worker'
import HeartBeatMonitorWorker from './worker/heartBeatMonitorWorker?worker'

export const memoryMonitorWorker = new MemoryMonitorWorker()
export const heartBeatMonitorWorker = new HeartBeatMonitorWorker()

export const mockBrowsweCrash = () => {
    const bigData = [];
    let count = 5000
    while (count > 0) {
        bigData.push(new Array(1000000).join('x'));
        count = count - 1
    }
    return bigData
}

export const initHeartBeat = () => {
    let intervalId = 0
    window.addEventListener('load', () => {
        heartBeatMonitorWorker.postMessage('start')
        intervalId = setInterval(() => {
            heartBeatMonitorWorker.postMessage('alive')
        }, 5 * 1000)
        longTaskMonitor()
    })
    window.addEventListener('beforeunload', () => {
        heartBeatMonitorWorker.postMessage('stop')
        clearInterval(intervalId)
    })
}

export const longTaskMonitor = () => {
    if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.entryType} metric:`, entry);
            }
        });
        observer.observe({ entryTypes: ['longtask', 'element', 'navigation', 'paint'] });
    }
}