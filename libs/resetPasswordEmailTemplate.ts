export const resetPasswordEmailTemplate: string = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap" rel="stylesheet">
        </head>

        <body>
            <div
                className=""
                style="background-color: #f3f4f6; display: flex; flex-direction: column; justify-content: center; justify-items: center; text-align: center; font-family: 'Poppins', sans-serif; margin: auto;"
            >
                    <div className=""
                        style="max-width: 500px; margin: 25px auto; padding: 16px 20px; background-color: white; "
                    >
                        <h4 className="">
                            Salut! {{name}}, Quelqu&apos;un demande que le mot de passe soit réinitialisé pour le compte suivant.
                        </h4>
                        <p className="">
                            Pour réinitialiser votre mot de passe, visitez l&apos;adresse suivante.
                        </p>

                        <div class="" style="padding: 15px 0px;">
                            <a href={{url}} target="_blanc" className=""
                                style="text-decoration: none;  color: white; background-color: #0B1215; padding: 12px; font-weight: 500;"
                            >
                                Réinitialiser votre mot de passe
                            </a>
                        </div>

                        <p className="">Votre email adresse: <span className="">{{email}}</span></p>

                        <p className="">S&apos;il s&apos;agit d&apos;une erreur, ignorez simplement cet e-mail et rien ne se passera</p>
                    </div>

                    <div className="" style="display: block;">
                        <p className="">Copyright © {{year}} - All Rights Reserved</p>
                    </div>
                </div>
        </body>
    </html>
`;