import {html,  createYoffeeElement} from "../libs/yoffee/yoffee.min.js"
import {State} from "../state.js";
import "../components/text-input.js"
import "../components/x-button.js"
import "../components/x-tag.js"

createYoffeeElement("signup-page", (props, self) => {
    return html()`
    <style>
        :host {
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 50px 70px;
            height: -webkit-fill-available;
        }
        
        #title {
            font-size: 50px;
            margin-bottom: 20px;
            color: #eeeeee;
        }

        #subtitle {
            /*font-size: 26px;*/
            /*opacity: 0.7;*/
            /*margin-bottom: 75px;*/
            
            font-size: 26px;
            opacity: 0.6;
            margin-bottom: 75px;
            font-weight: bold;
        }
        
        #name-container {
            margin-bottom: 30px;
        }
        
        #name-container > #name-text-description {
            font-size: 28px;
            margin-bottom: 20px;
        }
        
        #name-container > #name-text-input {
            font-size: 28px;
        }
        
        #tags-container {
            display: flex;
            flex-wrap: wrap;
        }
        
        #tags-container > x-tag {
            border-radius: 20px;
            margin-bottom: 10px;
        }
        
        #tags-container > x-tag + x-tag {
            margin-left: 5px;
        }
        
        x-button {
            --button-color: var(--secondary-color);
        }
        
        #finish-button {
            margin-top: auto;
            font-size: 28px;
            height: 40px;
        }
        
        #background-stylish {
            background-color: var(--secondary-color);
            height: 300px;
            width: -webkit-fill-available;
            position: fixed;
            left: 0;
            top: 0;
            z-index: -1;
        }
    </style>
    <div id="background-stylish"></div>
    <div id="title">
        Welcome to OnBelay!
    </div>
    <div id="subtitle">
        Here you will find climbing partners, and they will find you (-;
    </div>
    <div id="name-container">
        <div id="name-text-description">Your Nickname:</div>
        <text-input id="name-text-input"
                    placeholder=${["Chris Sharma", "Adam Ondra", "Margo Hayes", "Reinhold Messner", "Ueli Steck"][Math.floor(Math.random() * 5)]}>
        </text-input>
    </div>
    <div id="tags-container">
        ${() => State.tags
        .map(tag => html()`
        <x-tag
               onclick=${() => tag.selected = !tag.selected}>
            ${() => tag.name}
        </x-tag>
        `)}
    </div>
    <x-button id="finish-button" onclick=${() => finish()}>Finish</x-button>
    `

    function finish() {
        let name = self.shadowRoot.querySelector("#name-text-input").getValue();
        let selectedTags = State.tags.filter(tag => tag.selected).map(tag => tag.name)
        props.onfinish(name, selectedTags)
    }
})
