const sgMail = require('@sendgrid/mail')

const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)

sgMail.send({
    to: 'nancyluu92@gmail.com',
    from: 'nancyluu92@gmail.com',
    subject: 'This is my first send grid email',
    text: 'I hope this email sent!'
})