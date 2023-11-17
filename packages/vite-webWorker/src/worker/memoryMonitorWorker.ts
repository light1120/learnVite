self.addEventListener('message', (e: MessageEvent) => {
    if (e.data == 'start') {
        startMonitor()
    } else if (e.data === 'stop') {
        stopMonitor()
    }
})

let intervalId: number = 0;

function startMonitor() {
    console.log('startMonitor')
    intervalId = setInterval(() => {
        // print_PerformanceEntries()
        
        const entries = performance.getEntries()
        console.log(entries)
        // mockBrowsweCrash()
    }, 1000)
}
function measureFunction() {
    performance.mark('funcStart', {
        startTime: performance.now()
    })
    const bigData = [];
    let count = 5000
    while (count > 0) {
        bigData.push(new Array(1000000).join('x'));
        count = count - 1
    }
    performance.mark('funcEnd', {
        startTime: performance.now()
    })
    performance.measure('funcTime', 'funcStart', 'funcEnd')
}


function print_PerformanceEntries() {
    // Use getEntries() to get a list of all performance entries
    const p = performance.getEntries();
    for (let i = 0; i < p.length; i++) {
        console.log("PerformanceEntry[" + i + "]");
        print_PerformanceEntry(p[i]);
    }
}
function print_PerformanceEntry(perfEntry: any) {
    const properties = ["name", "entryType", "startTime", "duration"];

    for (let i = 0; i < properties.length; i++) {
        // check each property
        const supported = properties[i] in perfEntry;
        if (supported) {
            const value = perfEntry[properties[i]];
            console.log("... " + properties[i] + " = " + value);
        } else {
            console.log("... " + properties[i] + " = NOT supported");
        }
    }
}

function stopMonitor() {
    console.log('stopMonitor')
    clearInterval(intervalId)
}