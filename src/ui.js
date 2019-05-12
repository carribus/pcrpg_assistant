import { CHARACTER_SHEET as CharacterSheet } from "./character_sheet.js";
import { Model, Character } from "./model.js";

const HP_INDEX = 4;
const ENERGY_INDEX = 5;
const ATK_INDEX = 6;
const DEF_INDEX = 7;

export default class UI {
    constructor(rootElemId) {
        this.rootElem = document.getElementById("rootElemId");
        this.tableElem = document.getElementById("char_table");
        this.healthElem = document.getElementById("hp_player");
        this.energyElem = document.getElementById("energy_player");
        this.model = new Model();

        document.getElementById("btn_hp_add").addEventListener('click', (e) => {
            this.model.health++;
            this.updateHealth();
        });
        document.getElementById("btn_hp_sub").addEventListener('click', (e) => {
            this.model.health--;
            this.updateHealth();
        });

        this.createTable();
    }

    updateHealth() {
        this.healthElem.innerText = this.model.health;
    }

    updateEnergy() {
        let table = this.tableElem;
        this.energyElem.innerText = this.model.energy;
    }

    createTable() {
        for (let i = 0; i < 5; i++) {
            this.addRowToTable(i);
        }
    }

    addRowToTable(index) {
        const savePreviousValue = (elem) => {
            if (elem.value !== '--') {
                elem.prevValue = elem.value;
                console.log(`prevValue = ${elem.prevValue}`);
            }
        };
        const updateCharacterRow = (row, character) => {
            row.children[HP_INDEX].innerHTML = character.hp;
            row.children[ENERGY_INDEX].innerHTML = character.energy;
            row.children[ATK_INDEX].innerHTML = character.atk;
            row.children[DEF_INDEX].innerHTML = character.def;
        };
        const createCharacterDropdown = () => {
            let cell = document.createElement("td");
            cell.classList.add("cell");
            cell.innerHTML = `<select>
                    <option>--</option>
                    <option value="jh">J♥️</option>
                    <option value="qh">Q♥️</option>
                    <option value="kh">K♥️</option>
                    <option value="jd">J♦️</option>
                    <option value="qd">Q♦️</option>
                    <option value="kd">K♦️</option>
                    <option value="js">J♠️</option>
                    <option value="qs">Q♠️</option>
                    <option value="ks">K♠️</option>
                    <option value="jc">J♣️</option>
                    <option value="qc">Q♣️</option>
                    <option value="kc">K♣️</option>
                </select>`;
            cell.children[0].addEventListener('focus', (e) => savePreviousValue(e.target));
            cell.children[0].addEventListener('change', (e) => {
                let character = e.target.value;
                let row = e.target.parentNode.parentNode;
                console.log(character);
                if (e.target.prevValue) {
                    console.log(`Removing character: ${e.target.prevValue}`);
                    this.model.removeCharacter(e.target.prevValue);
                }
                character = this.model.createCharacter(index, character) || {hp:0, energy: 0, atk: 0, def: 0};
                if (character.hp === 0) {
                    for (let i = 1; i < 4; i++) {
                        row.children[i].children[0].value = '--'
                    }
                }
                updateCharacterRow(row, character);

                this.updateEnergy();
            });
            return cell;
        };
        const createArmourDropdown = () => {
            cell = document.createElement("td");
            cell.classList.add("cell");
            cell.innerHTML = `<select>
                    <option>--</option>
                    <option value="1">A♠️️</option>
                    <option value="2">2♠️</option>
                    <option value="3">3♠️</option>
                    <option value="4">4♠️</option>
                    <option value="5">5♠️</option>
                    <option value="6">6♠️</option>
                    <option value="7">7♠️</option>
                    <option value="8">8♠️</option>
                    <option value="9">9♠️</option>
                    <option value="10">T♠️</option>
                </select>`;
            cell.children[0].addEventListener('focus', (e) => savePreviousValue(e.target));
            cell.children[0].addEventListener('change', (e) => {
                let row = e.target.parentNode.parentNode;
                let character = this.model.characters[parseInt(row.id)]
                character.armor = e.target.value === '--' ? 0 : parseInt(e.target.value);
                updateCharacterRow(row, character);
            });
            return cell;
        }
        const createWeaponDropdown = () => {
            cell = document.createElement("td");
            cell.classList.add("cell");
            cell.innerHTML = `<select>
                    <option>--</option>
                    <option value="1">A♣️</option>
                    <option value="2">2♣️</option>
                    <option value="3">3♣️</option>
                    <option value="4">4♣️</option>
                    <option value="5">5♣️</option>
                    <option value="6">6♣️</option>
                    <option value="7">7♣️</option>
                    <option value="8">8♣️</option>
                    <option value="9">9♣️</option>
                    <option value="10">T♣️</option>
                </select>`;
            cell.children[0].addEventListener('focus', (e) => savePreviousValue(e.target));
            cell.children[0].addEventListener('change', (e) => {
                let row = e.target.parentNode.parentNode;
                let character = this.model.characters[parseInt(row.id)]
                character.weapon = e.target.value === '--' ? 0 : parseInt(e.target.value);
                updateCharacterRow(row, character);

            });
            return cell;
        };
        const createEnergyDropdown = () => {
            cell = document.createElement("td");
            cell.classList.add("cell");
            cell.innerHTML = `<select>
                    <option>--</option>
                    <option value="1">A♦️</option>
                    <option value="2">2♦️</option>
                    <option value="3">3♦️</option>
                    <option value="4">4♦️</option>
                    <option value="5">5♦️</option>
                    <option value="6">6♦️</option>
                    <option value="7">7♦️</option>
                    <option value="8">8♦️</option>
                    <option value="9">9♦️</option>
                    <option value="10">T♦️</option>
                </select>`;
            cell.children[0].addEventListener('focus', (e) => savePreviousValue(e.target));
            cell.children[0].addEventListener('change', (e) => {
                let row = e.target.parentNode.parentNode;
                let character = this.model.characters[parseInt(row.id)]
                character.energyItem = e.target.value === '--' ? 0 : parseInt(e.target.value);
                updateCharacterRow(row, character);

            });
            return cell;
        };
        let row = document.createElement("tr");
        row.classList.add("row");
        row.id = index;
        let cell;

        row.appendChild(createCharacterDropdown());
        row.appendChild(createArmourDropdown());
        row.appendChild(createWeaponDropdown());
        row.appendChild(createEnergyDropdown());
                
        for (let i = 0; i < 4; i++) {
            cell = document.createElement("td");
            cell.classList.add("cell_value");
            if (i === 0) {
                cell.classList.add("border_left");
            }
            cell.innerHTML = "0";
            row.appendChild(cell);
        }

        this.tableElem.appendChild(row);
    }
    
    onAddRowButtonClicked(e) {
        this.addRowToTable();
    }
}