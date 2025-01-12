type ResetPasswordEmailProps = {
    userFirstname: string,
    resetPasswordLink: string,
}

export const resetpasswordEmail = ({ userFirstname, resetPasswordLink }: ResetPasswordEmailProps) => `
<head>
    <meta charset="utf-8" />
    <title>Finder - Réinitialiser votre mot de passe</title>
    <style>
        body {
            background-color: #f6f9fc;
            padding: 10px 0;
            margin: 0px auto;
        }
    
        .container {
            background-color: #ffffff;
            border: 1px solid #f0f0f0;
            padding: 25px;
            max-width: 600px;
        }
    
        .text {
            font-size: 16px;
            font-family: "Open Sans", "HelveticaNeue-Light", "Helvetica Neue Light",
                "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
            font-weight: 300;
            color: #404040;
            line-height: 26px;
        }
    
        .button {
            background-color: #007ee6;
            border-radius: 4px;
            color: white;
            font-family: "Open Sans", "Helvetica Neue", Arial;
            font-size: 15px;
            text-decoration: none;
            text-align: center;
            display: block;
            width: 210px;
            padding: 14px 7px;
        }
    
        .anchor {
            text-decoration: underline;
        }
    </style>
    </head>
    
    <body>
    <div class="container">
        <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Findercomau_logo.png" width="100" alt="Dropbox" />
    
        <div>
            <p class="text">Bonjour! ${userFirstname},</p>
    
            <p class="text">
                Quelqu&apos;un a récemment demandé un changement de mot de passe pour
                votre compte Finder. Si c&apos;est votre cas, vous pouvez définir un
                nouveau mot de passe ici:
            </p>
    
            <a href="${resetPasswordLink}" class="button">Réinitialiser le mot de passe</a>
    
            <p class="text">
                Si vous ne souhaitez pas modifier votre mot de passe ou ne l&apos;avez
                pas demandé, ignorez et supprimez simplement ce message.
            </p>

            <p class="text">
                Pour assurer la sécurité de votre compte, ne transférez pas cet e-mail
                à qui que ce soit. Consultez notre centre d&apos;aide pour
                <a href="https://finder.app/support" class="anchor">
                    plus de conseils de sécurité.
                </a>
            </p>

            <p class="text">Passez une bonne journée,</p>
            <p class="text">L&apos;équipe Finder</p>
            </div>
    </div>
    </body>
</html>`;