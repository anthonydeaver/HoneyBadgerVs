//Spider-Man

function spiderman()  {
    var baseHP = 150;
    return {
        'name' : 'Spider-Man',
		'shortName' : 'spiderman',
        'strength' : 18,
        'dexterity' : 20,
        'intutition' : 20,
        'constitution' : 18,
        'wisdom' : 9,
        'charisma' : 10,
        
        //
        'initiative' : 10,
        'ability' : 50,
        'hitPoints' : 150,
		'image' : 'spider-man.jpeg',
		'type' : 'player',
        
        //
        'attacks' : [
            {'name' : 'Web Punch', 'damage' : 9},
            {'name' : 'Striking Spider', 'damage'  : 7},
            {'name' : 'Crouching Spider', 'damage'  : 7},
            {'name' : 'Spider Fang', 'damage'  : 7},
            {'name' : 'Ferocious Spider', 'damage'  : 7},
            {'name' : 'Floating Spider', 'damage'  : 7},
        ],
        'blocks' : [
            {'name' : 'Web Line', 'damage' : 0},
            {'name' : 'Web Shield', 'damage'  : 0},
            {'name' : 'Twisting Web', 'damage'  : 0},
            {'name' : 'Web Clouds', 'damage'  : 0},
        ],
        
        reset : function() {
            //alert("HP: " + this.hitPoints);
            this.hitPoints = baseHP;
        },
        
        getBaseHP : function() {
            return baseHP;
        }
    };
}



