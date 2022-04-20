const sgMail = require('@sendgrid/mail')
const chalk = require('chalk')
const messageHighlight = chalk.bold.green.inverse


const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)

// sgMail.send({
//     to: 'nancyluu92@gmail.com',
//     from: 'nancyluu92@gmail.com',
//     subject: 'This is my first send grid email',
//     text: 'I hope this email sent!'
// })


const sendWelcomeEmail = (email, name) => {
    sgMail.send({ 
        to: email,
        from: 'nancyluu92@gmail.com',
        subject: 'Thanks for joining!',
        text: `Welcome to the app, ${name}. Please give us a 5 star rating!`
    })
    console.log(messageHighlight('sent email!'))
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({ 
        to: email,
        from: 'nancyluu92@gmail.com',
        subject: `Goodbye ${name}!`,
        text: 'Is there anything we could have done better?'
    })
    console.log(messageHighlight('sent unsubscribed email!'))
}


module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}