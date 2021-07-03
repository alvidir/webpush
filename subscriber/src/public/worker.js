console.log("service worker");

self.addEventListener("push", event => {
    const data = event.data.json();
    console.log(data);
    console.log("Got notification");

    self.registration.showNotification(data.title, {
        body: data.body,
    })
})