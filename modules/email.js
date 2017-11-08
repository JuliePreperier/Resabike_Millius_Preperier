var nodemailer = require('nodemailer');

module.exports= {
    sendEmail(to, subject, text) {
        return new Promise(function (resolve, reject) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                port: 25,
                auth: {
                    user: 'resabiketesting@gmail.com',
                    pass: 'Resabike1234'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let mailOptions = {
                from: '"Resabike" <resabiketesting@gmail.com',
                to: 'resabiketesting@gmail.com',
                subject: 'Hello world!',
                text: 'Ca marche youpi'
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("The message was sent!");
                console.log(info);
            });
            resolve('ok')
        })

    },

    createTextConfirmer(){
        return new Promise(function (resolve, reject){
            //Texte personnalisé lors de la réervation
            var text = "Merci pour votre réservation!\n" +
                "Un email vous sera envoyé dans les plus brefs délais afin de vous confirmer si votre réservation peut être effective ou si elle ne peut malheureusement pas l'être car le nombre maximum de places est dépassé.\n" +
                "Nous vous remercions de votre compréhension et d'avoir choisi de voyager avec Car Postal."
        }).then(function (text) {
            resolve(text)
        })
    },
    createTextAccepter(){
        return new Promise(function (resolve, reject){
            //créer texte de la réservation
        }).then(function (text) {
            resolve(text)
        })
    },
    createTextRefuser(){
        return new Promise(function (resolve, reject){
            //créer texte de la réservation
        }).then(function (text) {
            resolve(text)
        })
    }
}