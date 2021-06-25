var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAkPXr4ceHRMW0k6yeZQKc72naZPLxO9DJQng9dMriPzSDlzh0xYbM6jV7IWQmwEbNeaDNiDQsOmV04VEE6QrqI",
    "privateKey": "khAtlbNiRHwNrW6TVjESEIxcL61ryOhNBp8TXb4B3RE",
}

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fdYvexlHinI:APA91bEWlJcIWIqGTLgJLn5K5Kdj0wEVVd34GGdJIoIlRycjKe9am4_eEmAivO7k5Nr2ShrfZENhY7wmatRh5Pz3YrxLe1427GjkovpRO8c4XAgnzVPfjXv5KtLG5E-Oo9hqedGRRVeA",
    "keys": {
        "p256dh": "BIzFv1kk0tAtJNnECZ8bMtkfbSGzALa7bAeC+ZAwPUcpajANW8O0AsitN4y8jkv8bXJ8KnR7J5fRBPNm8hZr45k=",
        "auth": "6wIB9zIZNzD04JfrOr0aIA==",
    }
};

var payload = 'Football Standings Push Notification';

var options = {
    gcmAPIKey: "740670222734",
    TTL: 60,
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)
