//Optimus Prime

function optimusPrime()  {
    var baseHP = 500;
    return {
        'name' : 'Optimus Prime',
		'shortName' : 'optimusPrime',
        'strength' : 30,
        'dexterity' : 20,
        'intutition' : 20,
        'constitution' : 18,
        'wisdom' : 18,
        'charisma' : 10,
        
        //
        'initiative' : 10,
        'ability' : 50,
        'hitPoints' : baseHP,
		'image' : 'spider-man.jpeg',
		'type' : 'player',
        
        //
        'attacks' : [
            {'name' : 'Web Punch', 'damage' : 15},
            {'name' : 'Striking Spider', 'damage'  : },
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



