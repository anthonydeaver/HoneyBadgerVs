//Chuck Norris

function chuckNorris()  {
    var baseHP = 80;
    return {
        'name' : 'Chuck Norris',
		'shortName' : 'chuckNorris',
        'strength' : 7,
        'dexterity' : 9,
        'intutition' : 8,
        'constitution' : 7,
        'wisdom' : 9,
        'charisma' : 5,
        
        //
        'initiative' : 9,
        'ability' : 10,
        'hitPoints' : 80,
		'image' : 'Chuck_Norris.jpeg',
		'type' : 'player',
        
        //
        'attacks' : [
            {'name' : 'Dragon Punch', 'damage' : 5},
            {'name' : 'Striking Snake', 'damage'  : 7},
            {'name' : 'Crouching Tiger', 'damage'  : 7},
            {'name' : 'Eagle Claw', 'damage'  : 7},
            {'name' : 'Ferocious Wind', 'damage'  : 7},
            {'name' : 'Floating Cloud', 'damage'  : 7},
        ],
        'blocks' : [
            {'name' : 'Angels Wing', 'damage' : 0},
            {'name' : 'Devils Chain', 'damage'  : 0},
            {'name' : 'Twisting Wind', 'damage'  : 0},
            {'name' : 'Parting Clouds', 'damage'  : 0},
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


