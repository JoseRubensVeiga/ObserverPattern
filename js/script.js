const Subject = function() {
    let subscribes = [];
    
    return {
        subscribeObserver: function(observer) {
            subscribes.push(observer);
        },
        unsubscribeObserver: function(observer) {
            subscribes = subscribes.filter(s => s != observer);
        },
        emit: function(...param) {
            for(subscribe of subscribes) {
                subscribe.notify(...param);
            }
        }
    }
}

const Observer = function(notify) {
    return {
        notify
    };
}

const clickChannel = new Subject();

document.addEventListener("click", function(e) {
    clickChannel.emit({
        message: 'Lorem ipsum sic dolor'
    }, [
        'array'
    ]);
});

clickObserver1 = new Observer((param, param2) => {
    console.log(param, param2);
});
clickObserver2 = new Observer(event => {
    console.log('observador 2');
});
clickObserver3 = new Observer(event => {
    console.log('observador 3');
});

clickChannel.subscribeObserver(clickObserver1)
clickChannel.subscribeObserver(clickObserver2)
clickChannel.subscribeObserver(clickObserver3)