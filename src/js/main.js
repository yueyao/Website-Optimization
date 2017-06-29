/*
 欢迎来到我们的60fps项目！你的目标是使Cam's Pizzeria网站能流畅的运行在60fps下。

 在这里的代码中主要有两个问题使性能低于60fps。你能发现并修复它们吗？

 在代码中，你会发现一些使用User Timing API(window.performance)的例子，它们使用
 console.log()将帧率数据输入到浏览器的控制台中。如果你想了解更多关于User Timing API
 的信息，请访问：http://www.html5rocks.com/en/tutorials/webperformance/usertiming/


 创建者:
 Cameron Pittman, Udacity 课程开发者
 cameron@udacity.com
 */
let pizzasDiv = document.getElementById('randomPizzas');
let randomPizzaContainer = document.querySelectorAll('.randomPizzaContainer');
let movingPizzasContainer = document.getElementById('movingPizzas1');
let movers = null;
let pizzaSizeContainer = document.querySelector('#pizzaSize');
let windowWidth = pizzasDiv.offsetWidth;
let scrollTop = document.body.scrollTop

/* ----perf---- */
window.performance.mark('mark_start_generating'); // 收集timing数据
/* ----perf---- */


pizzasDiv.appendChild(pizzaElementGenerator(100));


/* ----perf---- */
// 使用User Timing API。这里的测量数据告诉了你生成初始的披萨用了多长时间
window.performance.mark('mark_end_generating');
window.performance.measure(
  'measure_pizza_generation',
  'mark_start_generating',
  'mark_end_generating'
);

let timeToGenerate = window.performance.getEntriesByName(
  'measure_pizza_generation'
);
console.log(
  'Time to generate pizzas on load: ' + timeToGenerate[0].duration + 'ms'
);

// 背景披萨滚动时调用函数的次数和
// 由updatePositions()函数使用，用来决定什么时候记录平均帧率
let frame = 0;

/* ----perf---- */


// 在页面滚动时运行updatePositions函数
window.addEventListener('scroll', function () {
  requestAnimationFrame(function () {
    updatePositions()
  })
});

// 当页面加载时生成披萨滑窗
document.addEventListener('DOMContentLoaded', function () {
  let pizzaMovers = pizzaMoverGenerator(200);
  movingPizzasContainer.appendChild(pizzaMovers);
  movers = document.querySelectorAll('.mover');
  updatePositions();
});


// todo

function pizzaElementGenerator(len) {
  let makeRandomPizza = pizzaIngredientsGenerator().makeRandomPizza;
  let docFragment = document.createDocumentFragment();
  for (let i = 2; i < len; i++) {
    let piz = makeRandomPizza();
    docFragment.appendChild(elements(`piz-${i}`, piz));
  }
  return docFragment;
  function elements(id, info) {
    let style = `width: 33.33%;height:325px;`;
    let ulChildren = function () {
      return info.Ingredients.map(k => {
        return `<li>${k}</li>`
      }).join('')
    };
    let elem = document.createElement('div');
    elem.classList.add('randomPizzaContainer');
    elem.style.width = '33.33%';
    elem.style.height = '325px';
    elem.id = id;
    let childStr = ` <img src="distimg/pizza.png" class="img-responsive">
      <div class="" style="65%">
        <h4>${info.name}</h4>
        <ul>
        ${ulChildren()}
        </ul>
      </div>`
    elem.innerHTML = childStr;
    return elem;
  }
}

function pizzaIngredientsGenerator() {
  // 你可能已经发现了，这个网站会随机地生成披萨。
  // 下面的数组是所有可能组成披萨的原料。
  let pizzaIngredients = {};
  pizzaIngredients.meats = [
    'Pepperoni',
    'Sausage',
    'Fennel Sausage',
    'Spicy Sausage',
    'Chicken',
    'BBQ Chicken',
    'Chorizo',
    'Chicken Andouille',
    'Salami',
    'Tofu',
    'Bacon',
    'Canadian Bacon',
    'Proscuitto',
    'Italian Sausage',
    'Ground Beef',
    'Anchovies',
    'Turkey',
    'Ham',
    'Venison',
    'Lamb',
    'Duck',
    'Soylent Green',
    'Carne Asada',
    'Soppressata Picante',
    'Coppa',
    'Pancetta',
    'Bresola',
    'Lox',
    'Guanciale',
    'Chili',
    'Beef Jerky',
    'Pastrami',
    'Kielbasa',
    'Scallops',
    'Filet Mignon',
  ];
  pizzaIngredients.nonMeats = [
    'White Onions',
    'Red Onions',
    'Sauteed Onions',
    'Green Peppers',
    'Red Peppers',
    'Banana Peppers',
    'Ghost Peppers',
    'Habanero Peppers',
    'Jalapeno Peppers',
    'Stuffed Peppers',
    'Spinach',
    'Tomatoes',
    'Pineapple',
    'Pear Slices',
    'Apple Slices',
    'Mushrooms',
    'Arugula',
    'Basil',
    'Fennel',
    'Rosemary',
    'Cilantro',
    'Avocado',
    'Guacamole',
    'Salsa',
    'Swiss Chard',
    'Kale',
    'Sun Dried Tomatoes',
    'Walnuts',
    'Artichoke',
    'Asparagus',
    'Caramelized Onions',
    'Mango',
    'Garlic',
    'Olives',
    'Cauliflower',
    'Polenta',
    'Fried Egg',
    'Zucchini',
    'Hummus',
  ];
  pizzaIngredients.cheeses = [
    'American Cheese',
    'Swiss Cheese',
    'Goat Cheese',
    'Mozzarella Cheese',
    'Parmesean Cheese',
    'Velveeta Cheese',
    'Gouda Cheese',
    'Muenster Cheese',
    'Applewood Cheese',
    'Asiago Cheese',
    'Bleu Cheese',
    'Boursin Cheese',
    'Brie Cheese',
    'Cheddar Cheese',
    'Chevre Cheese',
    'Haletti Cheese',
    'Jack Cheese',
    'Pepper Jack Cheese',
    'Gruyere Cheese',
    'Limberger Cheese',
    'Manchego Cheese',
    'Marscapone Cheese',
    'Pecorino Cheese',
    'Provolone Cheese',
    'Queso Cheese',
    'Roquefort Cheese',
    'Romano Cheese',
    'Ricotta Cheese',
    'Smoked Gouda',
  ];
  pizzaIngredients.sauces = [
    'Red Sauce',
    'Marinara',
    'BBQ Sauce',
    'No Sauce',
    'Hot Sauce',
  ];
  pizzaIngredients.crusts = [
    'White Crust',
    'Whole Wheat Crust',
    'Flatbread Crust',
    'Stuffed Crust',
  ];
  // 披萨名字形容词的种类
  let adjectives = [
    'dark',
    'color',
    'whimsical',
    'shiny',
    'noisy',
    'apocalyptic',
    'insulting',
    'praise',
    'scientific',
  ];
  // 披萨名字名词的种类
  let nouns = [
    'animals',
    'everyday',
    'fantasy',
    'gross',
    'horror',
    'jewelry',
    'places',
    'scifi',
  ];
  // 用生成器发出的随机数来从数组中取出形容词
  function getAdj(x) {
    switch (x) {
      case 'dark':
        let dark = [
          'dark',
          'morbid',
          'scary',
          'spooky',
          'gothic',
          'deviant',
          'creepy',
          'sadistic',
          'black',
          'dangerous',
          'dejected',
          'haunted',
          'morose',
          'tragic',
          'shattered',
          'broken',
          'sad',
          'melancholy',
          'somber',
          'dark',
          'gloomy',
          'homicidal',
          'murderous',
          'shady',
          'misty',
          'dusky',
          'ghostly',
          'shadowy',
          'demented',
          'cursed',
          'insane',
          'possessed',
          'grotesque',
          'obsessed',
        ];
        return dark;
      case 'color':
        let colors = [
          'blue',
          'green',
          'purple',
          'grey',
          'scarlet',
          'NeonGreen',
          'NeonBlue',
          'NeonPink',
          'HotPink',
          'pink',
          'black',
          'red',
          'maroon',
          'silver',
          'golden',
          'yellow',
          'orange',
          'mustard',
          'plum',
          'violet',
          'cerulean',
          'brown',
          'lavender',
          'violet',
          'magenta',
          'chestnut',
          'rosy',
          'copper',
          'crimson',
          'teal',
          'indigo',
          'navy',
          'azure',
          'periwinkle',
          'brassy',
          'verdigris',
          'veridian',
          'tan',
          'raspberry',
          'beige',
          'sandy',
          'ElectricBlue',
          'white',
          'champagne',
          'coral',
          'cyan',
        ];
        return colors;
      case 'whimsical':
        let whimsy = [
          'whimsical',
          'silly',
          'drunken',
          'goofy',
          'funny',
          'weird',
          'strange',
          'odd',
          'playful',
          'clever',
          'boastful',
          'breakdancing',
          'hilarious',
          'conceited',
          'happy',
          'comical',
          'curious',
          'peculiar',
          'quaint',
          'quirky',
          'fancy',
          'wayward',
          'fickle',
          'yawning',
          'sleepy',
          'cockeyed',
          'dizzy',
          'dancing',
          'absurd',
          'laughing',
          'hairy',
          'smiling',
          'perplexed',
          'baffled',
          'cockamamie',
          'vulgar',
          'hoodwinked',
          'brainwashed',
        ];
        return whimsy;
      case 'shiny':
        let shiny = [
          'sapphire',
          'opal',
          'silver',
          'gold',
          'platinum',
          'ruby',
          'emerald',
          'topaz',
          'diamond',
          'amethyst',
          'turquoise',
          'starlit',
          'moonlit',
          'bronze',
          'metal',
          'jade',
          'amber',
          'garnet',
          'obsidian',
          'onyx',
          'pearl',
          'copper',
          'sunlit',
          'brass',
          'brassy',
          'metallic',
        ];
        return shiny;
      case 'noisy':
        let noisy = [
          'untuned',
          'loud',
          'soft',
          'shrieking',
          'melodious',
          'musical',
          'operatic',
          'symphonic',
          'dancing',
          'lyrical',
          'harmonic',
          'orchestral',
          'noisy',
          'dissonant',
          'rhythmic',
          'hissing',
          'singing',
          'crooning',
          'shouting',
          'screaming',
          'wailing',
          'crying',
          'howling',
          'yelling',
          'hollering',
          'caterwauling',
          'bawling',
          'bellowing',
          'roaring',
          'squealing',
          'beeping',
          'knocking',
          'tapping',
          'rapping',
          'humming',
          'scatting',
          'whispered',
          'whispering',
          'rasping',
          'buzzing',
          'whirring',
          'whistling',
          'whistled',
        ];
        return noisy;
      case 'apocalyptic':
        let apocalyptic = [
          'nuclear',
          'apocalyptic',
          'desolate',
          'atomic',
          'zombie',
          'collapsed',
          'grim',
          'fallen',
          'collapsed',
          'cannibalistic',
          'radioactive',
          'toxic',
          'poisonous',
          'venomous',
          'disastrous',
          'grimy',
          'dirty',
          'undead',
          'bloodshot',
          'rusty',
          'glowing',
          'decaying',
          'rotten',
          'deadly',
          'plagued',
          'decimated',
          'rotting',
          'putrid',
          'decayed',
          'deserted',
          'acidic',
        ];
        return apocalyptic;
      case 'insulting':
        let insulting = [
          'stupid',
          'idiotic',
          'fat',
          'ugly',
          'hideous',
          'grotesque',
          'dull',
          'dumb',
          'lazy',
          'sluggish',
          'brainless',
          'slow',
          'gullible',
          'obtuse',
          'dense',
          'dim',
          'dazed',
          'ridiculous',
          'witless',
          'daft',
          'crazy',
          'vapid',
          'inane',
          'mundane',
          'hollow',
          'vacuous',
          'boring',
          'insipid',
          'tedious',
          'monotonous',
          'weird',
          'bizarre',
          'backward',
          'moronic',
          'ignorant',
          'scatterbrained',
          'forgetful',
          'careless',
          'lethargic',
          'insolent',
          'indolent',
          'loitering',
          'gross',
          'disgusting',
          'bland',
          'horrid',
          'unseemly',
          'revolting',
          'homely',
          'deformed',
          'disfigured',
          'offensive',
          'cowardly',
          'weak',
          'villainous',
          'fearful',
          'monstrous',
          'unattractive',
          'unpleasant',
          'nasty',
          'beastly',
          'snide',
          'horrible',
          'syncophantic',
          'unhelpful',
          'bootlicking',
        ];
        return insulting;
      case 'praise':
        let praise = [
          'beautiful',
          'intelligent',
          'smart',
          'genius',
          'ingenious',
          'gorgeous',
          'pretty',
          'witty',
          'angelic',
          'handsome',
          'graceful',
          'talented',
          'exquisite',
          'enchanting',
          'fascinating',
          'interesting',
          'divine',
          'alluring',
          'ravishing',
          'wonderful',
          'magnificient',
          'marvelous',
          'dazzling',
          'cute',
          'charming',
          'attractive',
          'nifty',
          'delightful',
          'superior',
          'amiable',
          'gentle',
          'heroic',
          'courageous',
          'valiant',
          'brave',
          'noble',
          'daring',
          'fearless',
          'gallant',
          'adventurous',
          'cool',
          'enthusiastic',
          'fierce',
          'awesome',
          'radical',
          'tubular',
          'fearsome',
          'majestic',
          'grand',
          'stunning',
        ];
        return praise;
      case 'scientific':
        let scientific = [
          'scientific',
          'technical',
          'digital',
          'programming',
          'calculating',
          'formulating',
          'cyberpunk',
          'mechanical',
          'technological',
          'innovative',
          'brainy',
          'chemical',
          'quantum',
          'astro',
          'space',
          'theoretical',
          'atomic',
          'electronic',
          'gaseous',
          'investigative',
          'solar',
          'extinct',
          'galactic',
        ];
        return scientific;
      default:
        let scientific_default = [
          'scientific',
          'technical',
          'digital',
          'programming',
          'calculating',
          'formulating',
          'cyberpunk',
          'mechanical',
          'technological',
          'innovative',
          'brainy',
          'chemical',
          'quantum',
          'astro',
          'space',
          'theoretical',
          'atomic',
          'electronic',
          'gaseous',
          'investigative',
          'solar',
          'extinct',
          'galactic',
        ];
        return scientific_default;
    }
  }

  // 用生成器发出的随机数来从数组中取出名词
  function getNoun(y) {
    switch (y) {
      case 'animals':
        let animals = [
          'flamingo',
          'hedgehog',
          'owl',
          'elephant',
          'pussycat',
          'alligator',
          'dachsund',
          'poodle',
          'beagle',
          'crocodile',
          'kangaroo',
          'wallaby',
          'woodpecker',
          'eagle',
          'falcon',
          'canary',
          'parrot',
          'parakeet',
          'hamster',
          'gerbil',
          'squirrel',
          'rat',
          'dove',
          'toucan',
          'raccoon',
          'vulture',
          'peacock',
          'goldfish',
          'rook',
          'koala',
          'skunk',
          'goat',
          'rooster',
          'fox',
          'porcupine',
          'llama',
          'grasshopper',
          'gorilla',
          'monkey',
          'seahorse',
          'wombat',
          'wolf',
          'giraffe',
          'badger',
          'lion',
          'mouse',
          'beetle',
          'cricket',
          'nightingale',
          'hawk',
          'trout',
          'squid',
          'octopus',
          'sloth',
          'snail',
          'locust',
          'baboon',
          'lemur',
          'meerkat',
          'oyster',
          'frog',
          'toad',
          'jellyfish',
          'butterfly',
          'caterpillar',
          'tiger',
          'hyena',
          'zebra',
          'snail',
          'pig',
          'weasel',
          'donkey',
          'penguin',
          'crane',
          'buzzard',
          'vulture',
          'rhino',
          'hippopotamus',
          'dolphin',
          'sparrow',
          'beaver',
          'moose',
          'minnow',
          'otter',
          'bat',
          'mongoose',
          'swan',
          'firefly',
          'platypus',
        ];
        return animals;
      case 'profession':
        let professions = [
          'doctor',
          'lawyer',
          'ninja',
          'writer',
          'samurai',
          'surgeon',
          'clerk',
          'artist',
          'actor',
          'engineer',
          'mechanic',
          'comedian',
          'fireman',
          'nurse',
          'RockStar',
          'musician',
          'carpenter',
          'plumber',
          'cashier',
          'electrician',
          'waiter',
          'president',
          'governor',
          'senator',
          'scientist',
          'programmer',
          'singer',
          'dancer',
          'director',
          'mayor',
          'merchant',
          'detective',
          'investigator',
          'navigator',
          'pilot',
          'priest',
          'cowboy',
          'stagehand',
          'soldier',
          'ambassador',
          'pirate',
          'miner',
          'police',
        ];
        return professions;
      case 'fantasy':
        let fantasy = [
          'centaur',
          'wizard',
          'gnome',
          'orc',
          'troll',
          'sword',
          'fairy',
          'pegasus',
          'halfling',
          'elf',
          'changeling',
          'ghost',
          'knight',
          'squire',
          'magician',
          'witch',
          'warlock',
          'unicorn',
          'dragon',
          'wyvern',
          'princess',
          'prince',
          'king',
          'queen',
          'jester',
          'tower',
          'castle',
          'kraken',
          'seamonster',
          'mermaid',
          'psychic',
          'seer',
          'oracle',
        ];
        return fantasy;
      case 'music':
        let music = [
          'violin',
          'flute',
          'bagpipe',
          'guitar',
          'symphony',
          'orchestra',
          'piano',
          'trombone',
          'tuba',
          'opera',
          'drums',
          'harpsichord',
          'harp',
          'harmonica',
          'accordion',
          'tenor',
          'soprano',
          'baritone',
          'cello',
          'viola',
          'piccolo',
          'ukelele',
          'woodwind',
          'saxophone',
          'bugle',
          'trumpet',
          'sousaphone',
          'cornet',
          'stradiletius',
          'marimbas',
          'bells',
          'timpani',
          'bongos',
          'clarinet',
          'recorder',
          'oboe',
          'conductor',
          'singer',
        ];
        return music;
      case 'horror':
        let horror = [
          'murderer',
          'chainsaw',
          'knife',
          'sword',
          'murder',
          'devil',
          'killer',
          'psycho',
          'ghost',
          'monster',
          'godzilla',
          'werewolf',
          'vampire',
          'demon',
          'graveyard',
          'zombie',
          'mummy',
          'curse',
          'death',
          'grave',
          'tomb',
          'beast',
          'nightmare',
          'frankenstein',
          'specter',
          'poltergeist',
          'wraith',
          'corpse',
          'scream',
          'massacre',
          'cannibal',
          'skull',
          'bones',
          'undertaker',
          'zombie',
          'creature',
          'mask',
          'psychopath',
          'fiend',
          'satanist',
          'moon',
          'fullMoon',
        ];
        return horror;
      case 'gross':
        let gross = [
          'slime',
          'bug',
          'roach',
          'fluid',
          'pus',
          'booger',
          'spit',
          'boil',
          'blister',
          'orifice',
          'secretion',
          'mucus',
          'phlegm',
          'centipede',
          'beetle',
          'fart',
          'snot',
          'crevice',
          'flatulence',
          'juice',
          'mold',
          'mildew',
          'germs',
          'discharge',
          'toilet',
          'udder',
          'odor',
          'substance',
          'fluid',
          'moisture',
          'garbage',
          'trash',
          'bug',
        ];
        return gross;
      case 'everyday':
        let everyday = [
          'mirror',
          'knife',
          'fork',
          'spork',
          'spoon',
          'tupperware',
          'minivan',
          'suburb',
          'lamp',
          'desk',
          'stereo',
          'television',
          'TV',
          'book',
          'car',
          'truck',
          'soda',
          'door',
          'video',
          'game',
          'computer',
          'calender',
          'tree',
          'plant',
          'flower',
          'chimney',
          'attic',
          'kitchen',
          'garden',
          'school',
          'wallet',
          'bottle',
        ];
        return everyday;
      case 'jewelry':
        let jewelry = [
          'earrings',
          'ring',
          'necklace',
          'pendant',
          'choker',
          'brooch',
          'bracelet',
          'cameo',
          'charm',
          'bauble',
          'trinket',
          'jewelry',
          'anklet',
          'bangle',
          'locket',
          'finery',
          'crown',
          'tiara',
          'blingBling',
          'chain',
          'rosary',
          'jewel',
          'gemstone',
          'beads',
          'armband',
          'pin',
          'costume',
          'ornament',
          'treasure',
        ];
        return jewelry;
      case 'places':
        let places = [
          'swamp',
          'graveyard',
          'cemetery',
          'park',
          'building',
          'house',
          'river',
          'ocean',
          'sea',
          'field',
          'forest',
          'woods',
          'neighborhood',
          'city',
          'town',
          'suburb',
          'country',
          'meadow',
          'cliffs',
          'lake',
          'stream',
          'creek',
          'school',
          'college',
          'university',
          'library',
          'bakery',
          'shop',
          'store',
          'theater',
          'garden',
          'canyon',
          'highway',
          'restaurant',
          'cafe',
          'diner',
          'street',
          'road',
          'freeway',
          'alley',
        ];
        return places;
      case 'scifi':
        let scifi = [
          'robot',
          'alien',
          'raygun',
          'spaceship',
          'UFO',
          'rocket',
          'phaser',
          'astronaut',
          'spaceman',
          'planet',
          'star',
          'galaxy',
          'computer',
          'future',
          'timeMachine',
          'wormHole',
          'timeTraveler',
          'scientist',
          'invention',
          'martian',
          'pluto',
          'jupiter',
          'saturn',
          'mars',
          'quasar',
          'blackHole',
          'warpDrive',
          'laser',
          'orbit',
          'gears',
          'molecule',
          'electron',
          'neutrino',
          'proton',
          'experiment',
          'photon',
          'apparatus',
          'universe',
          'gravity',
          'darkMatter',
          'constellation',
          'circuit',
          'asteroid',
        ];
        return scifi;
      default:
        let scifi_default = [
          'robot',
          'alien',
          'raygun',
          'spaceship',
          'UFO',
          'rocket',
          'phaser',
          'astronaut',
          'spaceman',
          'planet',
          'star',
          'galaxy',
          'computer',
          'future',
          'timeMachine',
          'wormHole',
          'timeTraveler',
          'scientist',
          'invention',
          'martian',
          'pluto',
          'jupiter',
          'saturn',
          'mars',
          'quasar',
          'blackHole',
          'warpDrive',
          'laser',
          'orbit',
          'gears',
          'molecule',
          'electron',
          'neutrino',
          'proton',
          'experiment',
          'photon',
          'apparatus',
          'universe',
          'gravity',
          'darkMatter',
          'constellation',
          'circuit',
          'asteroid',
        ];
        return scifi_default;
    }
  }

  function makeRandomName() {
    let randomNumberAdj = parseInt(Math.random() * adjectives.length);
    let randomNumberNoun = parseInt(Math.random() * nouns.length);
    let adj = getAdj(randomNumberAdj);
    let nonu = getNoun(randomNumberNoun);
    let randomAdjective = parseInt(Math.random() * adjectives.length);
    let randomNoun = parseInt(Math.random() * nouns.length);
    let name =
      'The ' +
      capitalize(adj[randomAdjective]) +
      ' ' +
      capitalize(nonu[randomNoun]);
    return name;
  }


  function makeIngredients() {
    let result = [];
    let numberOfMeats = getRandomNumber(4);
    let numberOfNonMeats = getRandomNumber(3);
    let numberOfCheeses = getRandomNumber(2);
    let meatsLen = pizzaIngredients.meats.length;
    let nonMeatssLen = pizzaIngredients.nonMeats.length;
    let cheesesLen = pizzaIngredients.cheeses.length;
    let saucesLen = pizzaIngredients.sauces.length;
    let crustsLen = pizzaIngredients.crusts.length;

    for (let i = 0; i < numberOfMeats; i++) {
      result.push(pizzaIngredients.meats[getRandomNumber(meatsLen)])
    }

    for (let j = 0; j < numberOfNonMeats; j++) {
      result.push(pizzaIngredients.nonMeats[getRandomNumber(nonMeatssLen)])
    }

    for (let k = 0; k < numberOfCheeses; k++) {
      result.push(pizzaIngredients.cheeses[getRandomNumber(cheesesLen)])
    }

    result.push(pizzaIngredients.sauces[getRandomNumber(saucesLen)]);
    result.push(pizzaIngredients.crusts[getRandomNumber(crustsLen)]);
    return result;
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
  }

  return {
    makeRandomPizza: function () {
      return {
        name: makeRandomName(),
        Ingredients: makeIngredients()
      }
    }
  }
}

function pizzaMoverGenerator(len) {
  let cols = 8;
  let s = 256;
  let docFragment = document.createDocumentFragment();
  for (let i = 0; i < len; i++) {
    let elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = 'distimg/pizza.png';
    elem.style.height = '100px';
    elem.style.width = '73.333px';
    elem.style.top = Math.floor(i / cols) * s + 'px';
    elem.basicLeft = i % cols * s;
    docFragment.appendChild(elem);
  }
  return docFragment;
}

// 当网站中"Our Pizzas"的滑窗部分移动时调用resizePizzas(size)函数
let resizePizzas = function (size) {
  window.performance.mark('mark_start_resize'); // User Timing API 函数

  // 改变滑窗前披萨的尺寸值
  function changeSliderLabel(size) {
    let s = '';
    switch (size) {
      case '1':
        s = 'Small';
        return;
      case '2':
        s = 'Medium';
        return;
      case '3':
        s = 'Large';
        return;
      default:
        console.log('bug in changeSliderLabel');
    }
    pizzaSizeContainer.innerHTML = s;
  }

  changeSliderLabel(size);

  // 返回不同的尺寸以将披萨元素由一个尺寸改成另一个尺寸。由changePizzaSlices(size)函数调用
  function determineDx(elem, size) {
    let oldWidth = elem.offsetWidth;
    let oldSize = oldWidth / windowWidth;

    // 将值转成百分比宽度
    function sizeSwitcher(size) {
      switch (size) {
        case '1':
          return 0.25;
        case '2':
          return 0.3333;
        case '3':
          return 0.5;
        default:
          console.log('bug in sizeSwitcher');
      }
    }

    let newSize = sizeSwitcher(size);
    let dx = (newSize - oldSize) * windowWidth;

    return dx;
  }

  // 遍历披萨的元素并改变它们的宽度
  function changePizzaSizes(size) {
    for (let i = 0; i < randomPizzaContainer.length; i++) {
      let dx = determineDx(randomPizzaContainer[i], size);
      let newwidth = randomPizzaContainer[i].offsetWidth + dx + 'px';
      randomPizzaContainer[i].style.width = newwidth;
    }
  }

  changePizzaSizes(size);

  // User Timing API 太棒了
  window.performance.mark('mark_end_resize');
  window.performance.measure(
    'measure_pizza_resize',
    'mark_start_resize',
    'mark_end_resize'
  );
  let timeToResize = window.performance.getEntriesByName(
    'measure_pizza_resize'
  );
  console.log(
    'Time to resize pizzas: ' +
    timeToResize[timeToResize.length - 1].duration +
    'ms'
  );
};

// 记录滚动时背景滑窗披萨移动的每10帧的平均帧率
function logAverageFrame(times) {
  // times参数是updatePositions()由User Timing得到的测量数据
  let numberOfEntries = times.length;
  let sum = 0;
  for (let i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log(
    'Average scripting time to generate last 10 frames: ' + sum / 10 + 'ms'
  );
}

// 下面的关于背景滑窗披萨的代码来自于Ilya的demo:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// 基于滚动条位置移动背景中的披萨滑窗
function updatePositions() {
  frame++;
  window.performance.mark('mark_start_frame');

  let items = movers;
  for (let i = 0; i < items.length; i++) {
    let phase = Math.sin(scrollTop / 1250 + i % 5);
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }

  // 再次使用User Timing API。这很值得学习
  // 能够很容易地自定义测量维度
  window.performance.mark('mark_end_frame');
  window.performance.measure(
    'measure_frame_duration',
    'mark_start_frame',
    'mark_end_frame'
  );
  if (frame % 10 === 0) {
    let timesToUpdatePosition = window.performance.getEntriesByName(
      'measure_frame_duration'
    );
    logAverageFrame(timesToUpdatePosition);
  }
}
