import { sendMail } from "../mailer/mailer.js"
import { redisClient } from "../redis/redis.js"

(async () => {
    await redisClient
    .on('error', error => console.log("REDIS: ", error))
    .connect()
    console.log("REDIS: Connected")

    await redisClient.subscribe("email_notification", async (m) => {
        const { subject, to, message } = JSON.parse(m)
        await sendMail(subject, to, message)
        console.log("Sending message to: " + to)
    })
})()

// disconnect redis when ctrl+c is pressed
process.on('SIGINT', () => {
    redisClient.disconnect()
    console.log("REDIS: Disconnected")
    process.exit()
})