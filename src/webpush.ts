import webpush from "web-push";

webpush.setVapidDetails(
    process.env.SUBJECT?? "",
    process.env.PUBLIC_VAPID_KEY?? "",
    process.env.PRIVATE_VAPID_KEY?? ""
);

export default webpush;