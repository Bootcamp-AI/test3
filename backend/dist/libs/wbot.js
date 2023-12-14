"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeWbot = exports.getWbot = exports.initWbot = void 0;
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const socket_1 = require("./socket");
const AppError_1 = __importDefault(require("../errors/AppError"));
const logger_1 = require("../utils/logger");
const wbotMessageListener_1 = require("../services/WbotServices/wbotMessageListener");
const sessions = [];



// webhookdialogflow
const express = require('express');
const app2 = express();
const {WebhookClient} = require('dialogflow-fulfillment');
const dialogflow = require('@google-cloud/dialogflow');



//webhook dialogflow

app2.post('/webhook', function(request, response){
        const agent = new WebhookClient((request, response));
        let intentMap = new Map();
        intentMap.set('nombrefunction', nombrefunction);
        agent.handlerRequest(intentMap);
})

function nombrefunction(agent){

}

app2.use(express.json());
app2.use(express.urlencoded({extended: true}));


function isBlank(str){
        return (!str || /^\s*$/.test(str));
}

// Dialogflow messages
// Poner aquí el secret key
const sessionClient = new dialogflow.SessionsClient({keyFilename: './covid1.json'});
const sessionClient1 = new dialogflow.SessionsClient({keyFilename: './corape.json'});


async function detectIntent(
        projectId,
        sessionId,
        query,
        contexts,
        languageCode
        ){
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

        //Text query request
        const request = {
                session: sessionPath,
                queryInput: {
                        text: {
                                text: query,
                                languageCode: languageCode
                        }
                }
        };
        if(contexts && contexts.length > 10){
                request.queryParams = {
                        contexts: contexts
                }
        };

        const responses = await sessionClient.detectIntent(request);
        return responses[0]
}



async function detectIntent1(
        projectId,
        sessionId,
        query,
        contexts,
        languageCode
        ){
        const sessionPath = sessionClient1.projectAgentSessionPath(projectId, sessionId);

        //Text query request
        const request = {
                session: sessionPath,
                queryInput: {
                        text: {
                                text: query,
                                languageCode: languageCode
                        }
                }
        };
        if(contexts && contexts.length > 10){
                request.queryParams = {
                        contexts: contexts
                }
        };

        const responses = await sessionClient1.detectIntent(request);
        return responses[0]
}


async function executeQueries(projectId, sessionId, queries, languageCode){
        let context;
        let intentResponse;
        for(const query of queries){
                try{
                        console.log(`Pregunta: ${query}`);
                        intentResponse = await detectIntent(
                                projectId,
                                sessionId,
                                query,
                                context,
                                languageCode
                        );
                        //console.log('Enviando respuesta');
                        if(isBlank(intentResponse.queryResult.fulfillmentText)){
                                console.log('Su respuesta definida en Dialogflow');
                                return null;
                        }
                        else{
                                console.log('Respuesta definida en Dialogflow');
                                console.log(intentResponse.queryResult.fulfillmentText);

                                //return {data1, data2};

                                return `${intentResponse.queryResult.fulfillmentText}`;
                        }
                }catch(error){
                        console.log(error)
                }
        }
};


async function executeQueries1(projectId, sessionId, queries, languageCode){
        let context;
        let intentResponse;
        for(const query of queries){
                try{
                        console.log(`Pregunta: ${query}`);
                        intentResponse = await detectIntent1(
                                projectId,
                                sessionId,
                                query,
                                context,
                                languageCode
                        );
                        //console.log('Enviando respuesta');
                        if(isBlank(intentResponse.queryResult.fulfillmentText)){
                                console.log('Su respuesta definida en Dialogflow');
                                return null;
                        }
                        else{
                                console.log('Respuesta definida en Dialogflow');
                                console.log(intentResponse.queryResult.fulfillmentText);

                                //return {data1, data2};

                                return `${intentResponse.queryResult.fulfillmentText}`;
                        }
                }catch(error){
                        console.log(error)
                }
        }
};




const syncUnreadMessages = (wbot) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield wbot.getChats();
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */
    for (const chat of chats) {
        if (chat.unreadCount > 0) {
            const unreadMessages = yield chat.fetchMessages({
                limit: chat.unreadCount
            });
            for (const msg of unreadMessages) {
                yield wbotMessageListener_1.handleMessage(msg, wbot);
            }
            yield chat.sendSeen();
        }
    }
});

const syncUnreadMessages1 = (wbot1) => __awaiter(void 0, void 0, void 0, function* () {
    const chats1 = yield wbot1.getChats();
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */
    for (const chat of chats1) {
        if (chat.unreadCount > 0) {
            const unreadMessages1 = yield chat.fetchMessages({
                limit: chat.unreadCount
            });
            for (const msg1 of unreadMessages1) {
                yield wbotMessageListener_1.handleMessage(msg1, wbot1);
            }
            yield chat.sendSeen();
        }
    }
    });

exports.initWbot = (whatsapp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            
            const io = socket_1.getIO();
            const sessionName = whatsapp.name;



            let sessionCfg;
            if (whatsapp && whatsapp.session) {
                sessionCfg = JSON.parse(whatsapp.session);
            }


            let sessionCfg1;
            if (whatsapp && whatsapp.session) {
                sessionCfg1 = JSON.parse(whatsapp.session);
            }


            const wbot1 = new whatsapp_web_js_1.Client({
                session: sessionCfg1,
                authStrategy: new whatsapp_web_js_1.LocalAuth({clientId: 'bd_1'+whatsapp.id}),
                puppeteer: {
                        args: ['--no-sandbox', 'disable-setuid-sandbox'],
                        executablePath: process.env.CHROME_BIN || undefined
                }
            });



            const wbot = new whatsapp_web_js_1.Client({
                session: sessionCfg,
                authStrategy: new whatsapp_web_js_1.LocalAuth({clientId: 'bd_'+whatsapp.id}),
                puppeteer: {
                        args: ['--no-sandbox', 'disable-setuid-sandbox'],
                        executablePath: process.env.CHROME_BIN || undefined
                }
            });



            wbot1.initialize();
            wbot1.on("qr", (qr) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info("Session1:", sessionName);
                qrcode_terminal_1.default.generate(qr, { small: true });
                yield whatsapp.update({ qrcode: qr, status: "qrcode", retries: 0 });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
            }));
            wbot1.on("authenticated", (session) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session1: ${sessionName} AUTHENTICATED`);
                yield whatsapp.update({
                    session: JSON.stringify(session)
                });
            }));
            wbot1.on("auth_failure", (msg) => __awaiter(void 0, void 0, void 0, function* () {
                console.error(`Session1: ${sessionName} AUTHENTICATION FAILURE! Reason: ${msg}`);
                if (whatsapp.retries > 1) {
                    yield whatsapp.update({ session: "", retries: 0 });
                }
                const retry = whatsapp.retries;
                yield whatsapp.update({
                    status: "DISCONNECTED",
                    retries: retry + 1
                });
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
                reject(new Error("Error starting whatsapp session."));
            }));
            wbot1.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session1: ${sessionName} READY`);
                yield whatsapp.update({
                    status: "CONNECTED",
                    qrcode: "",
                    retries: 0
                });
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                wbot.sendPresenceAvailable();
                yield syncUnreadMessages(wbot);
                resolve(wbot);
            }));

            wbot1.on('message', async msg =>{
                function delay(t,v){
                        return new Promise(function(resolve){
                                setTimeout(resolve.bind(null, v), t)
                        });
                }

                wbot1.sendPresenceAvailable();

		if(msg.body !== null && msg.body === "7"){
	        	const contact = await msg.getContact();
        		setTimeout(function() {
           		msg.reply(`@${contact.number}` + ' su contacto ya fué enviado a un asesor en Corape');
            		wbot1.sendMessage('593997494191@c.us','Este contacto https://wa.me/' + `${contact.number}`+'. Necesita comunicarse con un agente chatbot. Desde Bot Corape');
          		},1000 + Math.floor(Math.random() * 1000));
		}
		else{

                let textoResponse = await executeQueries1("botcorape-fw9f", msg.from, [msg.body], 'es');
                        delay(3000).then(function(){
                                console.log("Config dialog ON")
                                msg.reply(textoResponse.replace(/\\n/g, '\n'));
                        })
		}



                })


            wbot.initialize();
            wbot.on("qr", (qr) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info("Session:", sessionName);
                qrcode_terminal_1.default.generate(qr, { small: true });
                yield whatsapp.update({ qrcode: qr, status: "qrcode", retries: 0 });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
            }));
            wbot.on("authenticated", (session) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session: ${sessionName} AUTHENTICATED`);
                yield whatsapp.update({
                    session: JSON.stringify(session)
                });
            }));
            wbot.on("auth_failure", (msg) => __awaiter(void 0, void 0, void 0, function* () {
                console.error(`Session: ${sessionName} AUTHENTICATION FAILURE! Reason: ${msg}`);
                if (whatsapp.retries > 1) {
                    yield whatsapp.update({ session: "", retries: 0 });
                }
                const retry = whatsapp.retries;
                yield whatsapp.update({
                    status: "DISCONNECTED",
                    retries: retry + 1
                });
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
                reject(new Error("Error starting whatsapp session."));
            }));
            wbot.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session: ${sessionName} READY`);
                yield whatsapp.update({
                    status: "CONNECTED",
                    qrcode: "",
                    retries: 0
                });
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                wbot.sendPresenceAvailable();
                yield syncUnreadMessages(wbot);
                resolve(wbot);
            }));

            wbot.on('message', async msg =>{
                function delay(t,v){
                        return new Promise(function(resolve){
                                setTimeout(resolve.bind(null, v), t)
                        });
                }

                wbot.sendPresenceAvailable();

                if(msg.body !== null && msg.body === "5"){
                        const contact = await msg.getContact();
                        setTimeout(function() {
                        msg.reply(`@${contact.number}` + ' su contacto ya fué enviado a un asesor en Corape');
                        wbot1.sendMessage('593997494191@c.us','Este contacto https://wa.me/' + `${contact.number}`+'. Necesita comunicarse contigo. Desde Bot Covid')
                        },1000 + Math.floor(Math.random() * 1000));
                }
                else{

                let textoResponse = await executeQueries("corapecovid-drjc", msg.from, [msg.body], 'es');
                        delay(3000).then(function(){
                                console.log("Config dialog ON")
                                msg.reply(textoResponse.replace(/\\n/g, '\n'));
                        })
                }



 
                })




        }
        catch (err) {
            logger_1.logger.error(err);
        }
    });
});



exports.getWbot = (whatsappId) => {
    const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
    if (sessionIndex === -1) {
        throw new AppError_1.default("ERR_WAPP_NOT_INITIALIZED");
    }
    return sessions[sessionIndex];
};
exports.removeWbot = (whatsappId) => {
    try {
        const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
        if (sessionIndex !== -1) {
            sessions[sessionIndex].destroy();
            sessions.splice(sessionIndex, 1);
        }
    }
    catch (err) {
        logger_1.logger.error(err);
    }
};
