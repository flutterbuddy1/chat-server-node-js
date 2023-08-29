import crypto from "crypto";
import axios from "axios";


const hashPassword = password => {
    return crypto.createHash('sha256').update(password).digest('hex')
}

const sendNotification = (to,title,body,data) => {
    var notification = {
        "to": to,
        "notification": {
            "title": title,
            "body": body,
        },
        "data":data
    };
    var raw = JSON.stringify(notification);
    console.log(raw);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
            'Authorization': 'key='+process.env.FCM_KEY,
            'Content-Type': 'application/json'
        },
        data: raw
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

}

export default {hashPassword , sendNotification};