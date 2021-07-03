Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});


const urlBase64ToArrayBuffer = (base64String) => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const raw =  window.atob(base64);
    const arr = new Uint8Array(raw.length);

    for(let i = 0; i < raw.length; i++){
        arr[i] = raw.charCodeAt(i);
    }

    return arr;
}

const getPublicKey = async () => {
    const response = await fetch("/vapid", {
        method: 'GET',
    });

    const vapid = await response.json();
    return urlBase64ToArrayBuffer(vapid.PUBLIC_VAPID_KEY);
}

const subscribe = async () => {
    // Service Worker
    const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/",
    });

    console.log("new service worker has been registered");

    const PUBLIC_VAPID_KEY = await getPublicKey();
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPID_KEY,
    });

    fetch("/subscribe", {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log('subscribed');
}

subscribe();