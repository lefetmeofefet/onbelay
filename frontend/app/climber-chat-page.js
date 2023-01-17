import {html,  createYoffeeElement} from "../libs/yoffee/yoffee.min.js"
import {State} from "../state.js";
import "../components/text-input.js"
import "../components/x-button.js"
import "../components/x-tag.js"

let messages = [{
    isYou: true,
    message: "Hi sup"
}, {
    isYou: true,
    message: "wanna climb hard?"
}, {
    isYou: false,
    message: "yerps"
}, {
    isYou: false,
    message: "this is an unnecessarily long message that's gonna overflow and we'll ahve to deal with it cause its shit fuck"
}, {
    isYou: true,
    message: "more messages to overflow"
}, {
    isYou: false,
    message: "yes more"
}, {
    isYou: true,
    message: "yes more?"
}, {
    isYou: false,
    message: "yes more!"
}, {
    isYou: true,
    message: "more."
}]

createYoffeeElement("climber-chat-page", (props, self) => {
    self.onConnect = () => {
        scrollToEndOfChat()
    }

    let state = {
        sendButtonFaded: true
    }

    return html(props.climber, state)`
    <style>
        :host {
            display: flex;
            flex-direction: column;
            height: -webkit-fill-available;
        }
        
        #header {
            display: flex;
            height: 80px;
            padding: 30px;
            background-color: var(--secondary-color);
            color: #eeeeee;
            align-items: center;
        }
        
        #header > #climber-name {
            font-size: 34px;
        }
        
        #header > #back-button {
            border-radius: 100px;
            height: fit-content;
            margin-right: 10px;
        }
        
        #chat {
            display: flex;
            flex-direction: column;
            padding: 10px 50px;
            overflow-y: auto;
        }
        
        #chat-input-container {
            margin-top: auto;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
        }
        
        #send-button {
            border-radius: 100px;
        }
        
        .message + .message {
            margin-top: 10px;
        }
        
        .message > .header {
            display: flex;
            margin-bottom: 5px;
            align-items: center;
        }
        
        .message > .header > .sender {
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .message > .header > .sender {
            color: var(--primary-color);
        }
        
        .message > .header > .sender[isyou] {
            color: var(--secondary-color);
        }
        
        .message > .header > .time {
            color: #313131;
            font-size: 11px;
            margin: 0 10px;
        }
        
        .message > .content {
            overflow-wrap: break-word;
            white-space: pre-wrap;
        }
        
        #chat-input {
            flex: 1;
            box-shadow: inset 1px 1px 3px #00000036;
            border-radius: 0;
            width: 0;
        }
        
        #chat-input-container > #send-button {
            border-radius: 0;
            box-shadow: none;
            padding: 0;
            width: 56px;
            height: inherit;
        }
    </style>
    
    <div id="header">
        <x-button id="back-button"
                  onclick=${() => props.onbackclicked()}>< </x-button>
        <div id="climber-name">${() => props.climber.name}</div>
    </div>
    <div id="chat">
        <div id="messages">
            ${() => messages.map(message => html()`
            <div class="message" dir="${() => message.isYou ? "rtl" : "ltr"}">
                <div class="header">
                    <div class="sender" isyou=${message.isYou}>${() => message.isYou ? "You" : props.climber.name}</div>
                    <div class="time">${() => moment(message.time).format("HH:mm")}</div>
                </div>
                <div class="content">${() => message.message}</div>
            </div>
            `)}
        </div>
        <div id="chat-input-container">
            <text-input id="chat-input"
                        keydown=${() => () => requestAnimationFrame(() => checkIfInputValid())}
                        submitted=${() => () => sendMessage()}
                        onfocus=${() => setTimeout(() => scrollToEndOfChat(), 330)}
            ></text-input>
            <x-button id="send-button"
                      onclick=${() => sendMessage()}
                      disabled="${() => state.sendButtonFaded}">
                  <x-icon icon="fas fa-paper-plane"></x-icon>
                  >
            </x-button>
        </div>
    </div>
    `

    function checkIfInputValid() {
        let message = self.shadowRoot.querySelector("#chat-input").getValue();
        state.sendButtonFaded = message === ""
    }

    async function sendMessage() {
        if (state.sendButtonFaded) {
            return
        }
        focusOnInput();
        let input = self.shadowRoot.querySelector("#chat-input");
        let message = input.value;
        input.value = "";
        state.sendButtonFaded = true;
        if (message !== "") {
            try {
                console.log("Sending essage blablabla")
            } catch (e) {
                API.showNotification(e, "error");
                console.error(e)
            }
        }
    }

    function scrollToEndOfChat() {
        let element = self.shadowRoot.querySelector("#messages");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    function focusOnInput() {
        self.shadowRoot.querySelector("#chat-input").focus();
    }
})
