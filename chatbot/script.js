const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbot .chatbox");
const chatbot_toggler = document.querySelector(".chatbot-toggler");
const close_Btn = document.querySelector(".chatbot span");



let userMessage;
let API_KEY = "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";
let inputHeight = chatInput.scrollHeight;

chatbot_toggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
close_Btn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));


const createChatLi = (message, className) => {
    const chatli = document.createElement("li");
    chatli.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatli.innerHTML = chatContent;
    chatli.querySelector("p").textContent = message;
    return chatli;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptons = {
        method: "post",
        Headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${API_KEY}` 
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
            {
                "role": "system",
                "content": userMessage
            }]
        })
    }
    fetch(API_URL, requestOptons).then((res) => res.json()).then( data => {
        messageElement.textContent = data.choices[0].message.content
    }).catch(err => {
        messageElement.classList.add("error");
        messageElement.textContent = err;
        console.log(err);
    }).finally( () => chatbox.scrollTo(0,chatbox.scrollHeight))
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = null;
    chatInput.style.height = `${inputHeight}px`;

    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    },600);
    
    
}
sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
})
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !(e.shiftKey && window.innerWidth > 800)) {
        e.preventDefault();
        handleChat()
    }
})