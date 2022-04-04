import $api from "../http/https";

export default class MailService {
    static async send(to, message, subject) {
        return $api.post('/mail/send-email', {to , message, subject})
    }
}