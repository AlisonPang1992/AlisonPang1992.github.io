
self.addEventListener('push', function (event) {
    if (event.data) {
        var promiseChain = Promise.resolve(event.data.json())
                .then(data => {
                    self.registration.showNotification('你好', data)
                    // 监听通知点击事件
                    self.addEventListener('notificationclick', function (e) {
                        // 关闭通知
                        e.notification.close()
                        // 打开网页
                        e.waitUntil(clients.openWindow(e.notification.data.url))
                    })
                });
        event.waitUntil(promiseChain);
    }
});