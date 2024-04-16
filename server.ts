const express = require("express")
const morgan = require("morgan")
import router from "./routes/routes"
import session from "express-session";
import * as path from 'node:path';
import dotenv from 'dotenv';
import { OID4VCIServer } from "@sphereon/oid4vci-issuer-server";
import { CredentialSupportedBuilderV1_11, VcIssuerBuilder } from "@sphereon/oid4vci-issuer";
import {
    OID4VCICredentialFormat,
} from '@sphereon/oid4vci-common'

const app = express()
const port = 80

// Logging
app.use(morgan("dev"))

/** Parse the request */
app.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
app.use(express.json());

/** RULES OF OUR API */
router.use((req: any, res: any, next: any) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** ExpressJS session */
app.use(session({
    // TODO: this is only for demo purposes.
    secret: "verySecretSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,            //setting this false for http connections
    },
    name: "issuerTitulaciones"
}))

/** Static public files */
app.use(express.static("static/"));

app.set('views', path.resolve('./views'));
app.set('view engine', 'html');

/** Routes */
app.use("/", router)

/** Error handling */
app.use((req: any, res: any, next: any) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

app.listen(port, () => {
    dotenv.config();


    let credentialsSupported = new CredentialSupportedBuilderV1_11()
        .withCryptographicSuitesSupported(process.env.cryptographic_suites_supported as string)
        .withCryptographicBindingMethod(process.env.cryptographic_binding_methods_supported as string)
        .withFormat(process.env.credential_supported_format as unknown as OID4VCICredentialFormat)
        .withId(process.env.credential_supported_id as string)
        .withTypes([process.env.credential_supported_types_1 as string, process.env.credential_supported_types_2 as string])
        .withCredentialSupportedDisplay({
            name: process.env.credential_display_name as string,
            locale: process.env.credential_display_locale as string,
            logo: {
                url: process.env.credential_display_logo_url as string,
                alt_text: process.env.credential_display_logo_alt_text as string,
            },
            background_color: process.env.credential_display_background_color as string,
            text_color: process.env.credential_display_text_color as string,
        })
        .build()


    let vcIssuer = new VcIssuerBuilder()
        .withUserPinRequired(process.env.user_pin_required as unknown as boolean)
        .withAuthorizationServer(process.env.authorization_server as string)
        .withCredentialEndpoint(process.env.credential_endpoint as string)
        .withCredentialIssuer(process.env.credential_issuer as string)
        .withIssuerDisplay({
            name: process.env.issuer_name as string,
            locale: process.env.issuer_locale as string,
        })
        .withCredentialsSupported(credentialsSupported)
        .withInMemoryCredentialOfferState()
        .withInMemoryCNonceState()
        .build()



    let oid4vciServer = new OID4VCIServer({ issuer: vcIssuer}
    );
    console.log(`Emisor de titulaciones digitales desplegado en: http://localhost:${port}`)
})