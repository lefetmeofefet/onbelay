import {html,  createYoffeeElement} from "../libs/yoffee/yoffee.min.js"
import {State} from "../state.js";
import "../components/text-input.js"
import "../components/x-button.js"
import "../components/x-tag.js"
import "../components/x-switch.js"
import "./signup-page.js"
import "./climbers-list-page.js"

createYoffeeElement("climbers-list-page", (props) => {
    let climbers = [{
        name: State.userInfo.name + " (you)",
        tags: State.userInfo.tags,
        location: "Where u are",
        distance: "0m",
        isYou: true
    }, {
        name: "I am climber",
        tags: ["Sport", "Trad"],
        location: "Bishop, CA",
        distance: "3km"
    }, {
        name: "I am climber 2",
        tags: ["Bouldering", "Alpine", "Trad", "Sport"],
        location: "Joshua Tree, CA",
        distance: "8km"
    }, {
        name: "Ehud",
        tags: ["Sport", "Trad", "Bouldering"],
        location: "Yosemite, CA",
        distance: "16km"
    }, {
        name: "Urielf",
        tags: ["Alpine"],
        location: "Las Vegas, CA",
        distance: "30km"
    }, {
        name: "Urielf",
        tags: ["Alpine"],
        location: "Las Vegas, CA",
        distance: "30km"
    }, {
        name: "Urielf",
        tags: ["Alpine"],
        location: "Las Vegas, CA",
        distance: "30km"
    }, {
        name: "Urielf",
        tags: ["Alpine"],
        location: "Las Vegas, CA",
        distance: "30km"
    }, {
        name: "Urielf",
        tags: ["Alpine"],
        location: "Las Vegas, CA",
        distance: "30km"
    }, {
        name: "Urielf",
        tags: ["Alpine"],
        location: "Las Vegas, CA",
        distance: "30km"
    }]
    return html(State)`
    <style>
        :host {
            display: flex;
            flex-direction: column;
            height: -webkit-fill-available;
        }
        
        #header {
            height: 80px;
            font-size: 34px;
            padding: 30px;
            background-color: var(--secondary-color);
            color: #eeeeee;
        }
        
        #filtering {
            display: flex;
            flex-direction: column;
            padding: 20px 50px;
            /*background-color: #494949;*/
            /*color: #eeeeee;*/
            box-shadow: 0px 3px 3px 0px #bebebe;
        }
        
        #filtering > .field-container {
            display: flex;
            margin-top: 10px;
        }
        
        #filtering > .field-container > .field-name {
            margin-right: 10px;
            font-weight: bold;
        }
        
        #filtering > #tags-container {
            display: flex;
            flex-wrap: wrap;
        }
        
        #filtering > #tags-container > x-tag {
            font-size: 12px;
            --button-padding: 4px 8px;
            margin-bottom: 7px;
        }
        
        #filtering > #tags-container > x-tag + x-tag {
            margin-left: 5px;
        }
        
        #climbers-list {
            display: flex;
            flex-direction: column;
            padding: 10px 50px;
            overflow-y: auto;
        }
        
        .climber {
            display: flex;
            flex-direction: column;
            padding: 20px 10px;            
        }
        
        .climber + .climber {
            border-top: 1px solid #00000030;
        }
        
        .climber > .top-section {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .climber > .top-section > .image {
            margin-right: 12px;
            font-size: 20px;
            border-radius: 100px;
            width: 20px;
            min-width: 20px;
            height: 20px;
            min-height: 20px;
            background-color: #00000030;
        }
        
        .climber > .top-section > .name {
            margin-right: 12px;
            font-size: 20px;
            min-width: fit-content;
        }
        
        .climber > .top-section > .tags {
            display: flex;
            font-size: 16px;
            flex-wrap: wrap;
        }
        
        .climber > .top-section > .tags > x-tag {
            margin-right: 5px;
            font-size: 12px;
            --button-padding: 4px 8px;
            margin-top: 2px;
            margin-bottom: 2px;
        }
        
        .climber > .top-section > .toggle-availability {
            margin-left: auto;
            --on-color: var(--secondary-color);
        }
        
        .climber > .bottom-section {
            display: flex;
        }
        
        .climber > .bottom-section > .location{
            display: flex;
            opacity: 0.7;
        }

        .climber > .bottom-section > .dot{
            display: flex;
            align-self: center;
            justify-self: center;
            background-color: #00000060;
            border-radius: 100px;
            width: 5px;
            height: 5px;
            margin: 0 8px;
        }
        
        .climber > .bottom-section > .distance{
            display: flex;
            opacity: 0.7;
        }
        
    </style>
    <div id="header">
        OnBelay
    </div>
    <div id="filtering">
        <div id="tags-container">
            ${() => State.tags
            .map(tag => html()`
            <x-tag class="tag"
                   onclick=${() => tag.selected = !tag.selected}>
                ${() => tag.name}
            </x-tag>
            `)}
        </div>
        <div id="location" class="field-container">
            <div class="field-name">Location:</div>
            <div>Around me</div>
        </div>
        <div id="time" class="field-container">
            <div class="field-name">Time:</div>
            <div>Now</div>
        </div>
    </div>
    <div id="climbers-list">
        ${() => climbers.map(climber => html()`
        <div class="climber" 
             style="${() => (climber.isYou && !State.userPublished) ? "opacity: 0.3" : ""}"
             onclick=${() => climber.isYou && (State.userPublished = !State.userPublished)}>
            <div class="top-section">
                <div class="image" onclick=${() => !climber.isYou && openClimberChat(climber)}></div>
                <div class="name" onclick=${() => !climber.isYou && openClimberChat(climber)}>
                    ${() => climber.name}
                </div>
                <div class="tags">
                    ${() => climber.tags.map(tag => html()`
                    <x-tag>${() => tag}</x-tag>
                    `)}
                </div>
                ${() => climber.isYou && html()`
                <x-switch class="toggle-availability"
                          value=${() => State.userPublished}
                          title="Toggle publishing yourself in the list of climbers"
                ></x-switch>
                `}
            </div>
            
            <div class="bottom-section">
                <div class="location">${() => climber.location}</div>
                <div class="dot"></div>
                <div class="distance">${() => climber.distance}</div>
            </div>
        </div>
        `)}
    </div>
    `

    function openClimberChat(climber) {
        props.onopenclimberchat(climber)
    }
})
