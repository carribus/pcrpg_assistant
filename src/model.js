import { CHARACTER_SHEET as CharacterSheet } from "./character_sheet.js";

export class Character {
    constructor(id) {
        this.id = id;
        this.state = {
            hp: CharacterSheet[id].hp,
            energy: CharacterSheet[id].energy,
            atk: CharacterSheet[id].atk,
            def: CharacterSheet[id].def
        }
        this.weapon = 0;
        this.armor = 0;
        this.energyItem = 0;
    }

    get hp() {
        return this.state.hp;
    }

    get energy() {
        return this.state.energy + this.energyItem;
    }

    get atk() {
        return this.state.atk + this.weapon;
    }

    get def() {
        return this.state.def + this.armor;
    }
}

export class Model {
    constructor() {
        this.health = 20;
        this.energy = 0;
        this.characters = [];
    }

    createCharacter(index, id) {
        let character;
        if ( CharacterSheet[id] ) {
            character = new Character(id);
            this.characters[index] = character;
        }

        console.log(character);
        this._calculateEnergy();
        return character;
    }

    removeCharacter(id) {
        let index = this.characters.findIndex((e) => {
            if (e) {
                if (e.id === id) {
                    return true;
                }
            }
        });
        console.log(`index: ${index}`);
        if (index !== -1) {
            this.characters[index] = null;
            this._calculateEnergy();
        }
    }

    getCharacter(id) {
        return this.characters.find((e) => e.id == id);
    }

    _calculateEnergy() {
        let totalEnergy = 0;
        console.log(this.characters);
        this.characters.forEach((e) => {
            if (e) {
                totalEnergy += e.energy
            }
        });
        this.energy = totalEnergy;
        console.log(`Energy = ${this.energy}`);
    }
}