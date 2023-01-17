import {html,  createYoffeeElement} from "./libs/yoffee/yoffee.min.js"
import {State} from "./state.js";
import "./components/text-input.js"
import "./components/x-button.js"
import "./components/x-tag.js"
import "./app/signup-page.js"
import "./app/climbers-list-page.js"
import "./app/climber-chat-page.js"

createYoffeeElement("onbelay-app", () => {
    return html(State)`
    <style>
        :host {
            display: flex;
            /*align-items: center;*/
            justify-content: center;
            flex-direction: column;
            height: -webkit-fill-available;
        }
        
    </style>
    ${() => State.userInfo == null ? 
        html()`<signup-page onfinish=${finishSignup}></signup-page>`
        :
        State.currentClimberChat == null ? 
            html()`<climbers-list-page onopenclimberchat=${openClimberChat}></climbers-list-page>`
            :
            html()`<climber-chat-page climber=${() => State.currentClimberChat}
                                      onbackclicked=${exitChat}>
                   </climber-chat-page>`
    }    
    `

    function finishSignup(name, tags) {
        State.userInfo = {
            name,
            tags
        }
    }

    function openClimberChat(climber) {
        State.currentClimberChat = climber
    }

    function exitChat() {
        State.currentClimberChat = null
    }
})
