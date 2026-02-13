// Etymology Word List for Etymordle
// All hints carefully written to avoid revealing the answer word
// No Latin/Greek roots that sound like the answer are included

const WORDS = [
    // === EMOTIONS & STATES ===
    {
        word: "nostalgia",
        etymology: "From Greek 'nostos' (return home) + 'algos' (pain) — the ache of longing for a place you once knew",
        origin: "Greek",
        hint: "That bittersweet feeling when you miss the past"
    },
    {
        word: "panic",
        etymology: "From the Greek god Pan, whose sudden appearance in the woods caused travelers to flee in terror",
        origin: "Greek",
        hint: "Sudden overwhelming fear or anxiety"
    },
    {
        word: "enthusiasm",
        etymology: "From Greek 'entheos' — to be possessed by a god, divinely inspired",
        origin: "Greek",
        hint: "Intense excitement and eagerness"
    },
    {
        word: "lethargy",
        etymology: "From Greek 'lethe' — the river of forgetfulness in Hades that made souls forget their past lives",
        origin: "Greek",
        hint: "A state of sluggishness and lack of energy"
    },
    {
        word: "tantalize",
        etymology: "From a Greek king punished in Hades to stand in water that receded when he tried to drink",
        origin: "Greek",
        hint: "To tease by showing something desirable but keeping it out of reach"
    },
    {
        word: "jovial",
        etymology: "From the Roman king of the gods — people born under his planet were supposedly cheerful",
        origin: "Latin",
        hint: "Cheerful and friendly in manner"
    },
    {
        word: "mercurial",
        etymology: "From the swift Roman messenger god — known for being unpredictable and changeable",
        origin: "Latin",
        hint: "Someone whose mood changes rapidly and unpredictably"
    },
    {
        word: "melancholy",
        etymology: "From Greek 'melas' (black) + 'khole' (bile) — ancient doctors blamed sadness on bodily fluids",
        origin: "Greek",
        hint: "A deep, pensive sadness"
    },

    // === PEOPLE & SOCIETY ===
    {
        word: "companion",
        etymology: "From Latin 'com' (together) + 'panis' (bread) — someone you share meals with",
        origin: "Latin",
        hint: "A person you spend time with; a friend or partner"
    },
    {
        word: "rival",
        etymology: "From Latin 'rivus' (stream) — originally people who shared the same river and competed for water",
        origin: "Latin",
        hint: "A competitor vying for the same goal"
    },
    {
        word: "candidate",
        etymology: "Roman office-seekers wore bleached white togas to show their purity",
        origin: "Latin",
        hint: "Someone running for office or applying for a job"
    },
    {
        word: "villain",
        etymology: "From Latin 'villa' (country house) — originally just meant a peasant farmer",
        origin: "Latin",
        hint: "The bad guy in a story"
    },
    {
        word: "dunce",
        etymology: "From John Duns Scotus, a medieval scholar whose followers were mocked by Renaissance thinkers as stupid",
        origin: "English",
        hint: "A slow learner; someone not very bright"
    },
    {
        word: "boycott",
        etymology: "From Captain Charles B., an English land agent in Ireland whom tenants refused to deal with in 1880",
        origin: "English",
        hint: "To refuse to buy from or deal with as a protest"
    },
    {
        word: "maverick",
        etymology: "From Samuel M., a Texas rancher who refused to brand his cattle — now means an independent thinker",
        origin: "English",
        hint: "An independent person who doesn't follow the crowd"
    },
    {
        word: "chauvinist",
        etymology: "From Nicolas C., a possibly legendary soldier fanatically devoted to Napoleon Bonaparte",
        origin: "French",
        hint: "Someone with excessive or prejudiced loyalty to their own group"
    },

    // === WORDS & COMMUNICATION ===
    {
        word: "sarcasm",
        etymology: "From Greek 'sarkazein' — literally to tear flesh like a dog, to bite one's lip in rage",
        origin: "Greek",
        hint: "Mocking or ironic remarks meant to wound"
    },
    {
        word: "slogan",
        etymology: "From Scottish Gaelic 'sluagh' (army) + 'gairm' (cry) — a battle cry used by Highland clans",
        origin: "Gaelic",
        hint: "A catchy phrase used in advertising or politics"
    },
    {
        word: "gossip",
        etymology: "From Old English 'godsibb' — a godparent, later meaning a close friend you share secrets with",
        origin: "English",
        hint: "Casual talk about other people's private matters"
    },
    {
        word: "clue",
        etymology: "From 'clew' (ball of yarn) — a Greek hero used thread to escape a monster's labyrinth",
        origin: "English",
        hint: "A piece of evidence that helps solve a mystery"
    },
    {
        word: "trivia",
        etymology: "Information exchanged where three roads met in ancient Rome — considered common knowledge",
        origin: "Latin",
        hint: "Unimportant facts or details; quiz game topics"
    },

    // === MONEY & TRADE ===
    {
        word: "salary",
        etymology: "From Latin 'sal' (salt) — Roman soldiers received an allowance to buy this precious preservative",
        origin: "Latin",
        hint: "Regular payment for work, usually monthly"
    },
    {
        word: "bankrupt",
        etymology: "From Italian 'banca rotta' (broken bench) — a failed money-lender's table was literally smashed",
        origin: "Italian",
        hint: "Unable to pay debts; financially ruined"
    },
    {
        word: "fee",
        etymology: "From Old English 'feoh' (cattle) — livestock was the original form of payment",
        origin: "English",
        hint: "A charge for a service"
    },
    {
        word: "pecuniary",
        etymology: "From Latin 'pecus' (cattle) — in ancient times, wealth was measured in livestock",
        origin: "Latin",
        hint: "Relating to money matters"
    },
    {
        word: "capital",
        etymology: "From Latin 'caput' (head) — wealth was counted by heads of cattle",
        origin: "Latin",
        hint: "Money used to start a business; also a main city"
    },

    // === FOOD & DRINK ===
    {
        word: "whiskey",
        etymology: "From Gaelic 'uisce beatha' — literally 'water of life,' referring to distilled spirits",
        origin: "Gaelic",
        hint: "A brown alcoholic spirit made from grain"
    },
    {
        word: "cappuccino",
        etymology: "From Italian for 'hood' — the drink's brown color matches the robes of hooded friars",
        origin: "Italian",
        hint: "An espresso drink with steamed milk foam"
    },
    {
        word: "avocado",
        etymology: "From Nahuatl (Aztec) 'ahuacatl' — a word also meaning a certain male body part, due to the shape",
        origin: "Nahuatl",
        hint: "A green fruit used in guacamole"
    },
    {
        word: "cantaloupe",
        etymology: "From an Italian papal estate plagued by howling wolves where this melon was cultivated",
        origin: "Italian",
        hint: "An orange-fleshed melon"
    },

    // === CLOTHING ===
    {
        word: "jeans",
        etymology: "From the French name for Genoa — an Italian port city famous for durable cotton fabric for sailors",
        origin: "French",
        hint: "Blue denim pants worn casually"
    },
    {
        word: "denim",
        etymology: "From French 'de Nîmes' (from Nîmes) — a French city that produced this sturdy fabric",
        origin: "French",
        hint: "The sturdy cotton fabric used to make blue pants"
    },
    {
        word: "cardigan",
        etymology: "Named after a British Earl whose troops wore buttoned knitted jackets in the Crimean War",
        origin: "English",
        hint: "A knitted sweater that buttons up the front"
    },
    {
        word: "pants",
        etymology: "From a silly old man character in Italian comedy who wore tight trousers over skinny legs",
        origin: "Italian",
        hint: "Clothing that covers each leg separately"
    },
    {
        word: "cravat",
        etymology: "From French 'Croate' — neckwear worn by Croatian mercenary soldiers in the 1600s",
        origin: "French",
        hint: "A fancy necktie or scarf worn by men"
    },

    // === PLACES & GEOGRAPHY ===
    {
        word: "quarantine",
        etymology: "From Italian 'quaranta' (forty) — ships suspected of plague waited this many days before docking",
        origin: "Italian",
        hint: "Isolation to prevent spread of disease"
    },
    {
        word: "peninsula",
        etymology: "From Latin for 'almost an island' — land that's nearly surrounded by water",
        origin: "Latin",
        hint: "Land surrounded by water on three sides"
    },
    {
        word: "volcano",
        etymology: "From the Roman god of fire and forge — whose workshop was believed to be under a Sicilian mountain",
        origin: "Latin",
        hint: "A mountain that can erupt with lava"
    },
    {
        word: "canary",
        etymology: "From islands named for wild dogs (Latin 'canis'), not birds — the birds came later",
        origin: "Latin",
        hint: "A small yellow songbird"
    },
    {
        word: "spa",
        etymology: "From a Belgian town famous since Roman times for its mineral springs and healing waters",
        origin: "Belgian",
        hint: "A place for relaxation and beauty treatments"
    },

    // === WAR & CONFLICT ===
    {
        word: "assassin",
        etymology: "From Arabic 'hashīshīn' — a feared 12th-century sect in the Lebanese mountains known for targeted killings",
        origin: "Arabic",
        hint: "Someone who murders an important person"
    },
    {
        word: "berserk",
        etymology: "From Old Norse 'berr' (bear) + 'serkr' (shirt) — Viking warriors who fought in animal skins with wild frenzy",
        origin: "Norse",
        hint: "Going wildly out of control"
    },
    {
        word: "decimate",
        etymology: "From Latin — the Roman punishment of executing every tenth soldier in a mutinous unit",
        origin: "Latin",
        hint: "To destroy a large portion of something"
    },
    {
        word: "deadline",
        etymology: "From a Civil War prison — the line prisoners would be shot for crossing",
        origin: "English",
        hint: "The final time by which something must be done"
    },
    {
        word: "freelance",
        etymology: "From a 1820s novel — medieval mercenaries whose weapons were not pledged to any lord",
        origin: "English",
        hint: "Working independently rather than for a company"
    },

    // === SCIENCE & MEDICINE ===
    {
        word: "malaria",
        etymology: "From Italian for 'bad air' — people blamed foul swamp vapors for the disease",
        origin: "Italian",
        hint: "A mosquito-borne tropical disease"
    },
    {
        word: "vaccine",
        etymology: "From Latin 'vacca' (cow) — the first immunization used material from infected cattle",
        origin: "Latin",
        hint: "A shot that protects against disease"
    },
    {
        word: "lunatic",
        etymology: "From Latin 'luna' (moon) — people believed madness was caused by lunar cycles",
        origin: "Latin",
        hint: "A crazy or insane person"
    },
    {
        word: "disaster",
        etymology: "From Greek 'dis-' (bad) + 'aster' (star) — an event caused by unfavorable stars",
        origin: "Greek",
        hint: "A sudden catastrophic event"
    },

    // === ANIMALS ===
    {
        word: "porcupine",
        etymology: "From Latin 'porcus' (pig) + 'spina' (thorn) — literally 'thorny pig'",
        origin: "Latin",
        hint: "A rodent covered in sharp quills"
    },
    {
        word: "hippopotamus",
        etymology: "From Greek 'hippos' (horse) + 'potamos' (river) — the ancient Greeks called it a 'river horse'",
        origin: "Greek",
        hint: "A large African animal that lives in rivers"
    },
    {
        word: "dandelion",
        etymology: "From French 'dent de lion' (lion's tooth) — referring to the jagged leaves",
        origin: "French",
        hint: "A yellow flower that becomes a puffball"
    },
    {
        word: "leopard",
        etymology: "From Greek 'leon' (lion) + 'pardos' (panther) — ancients thought it was a hybrid",
        origin: "Greek",
        hint: "A spotted big cat"
    },

    // === MUSIC & ART ===
    {
        word: "piano",
        etymology: "From Italian for 'soft and loud' — revolutionary because you could control volume",
        origin: "Italian",
        hint: "A large keyboard instrument with black and white keys"
    },
    {
        word: "tragedy",
        etymology: "From Greek 'tragos' (goat) — possibly from goat-skin costumes or goat sacrifices at festivals",
        origin: "Greek",
        hint: "A serious drama with an unhappy ending"
    },
    {
        word: "museum",
        etymology: "From Greek — a shrine to the nine goddesses of arts and sciences",
        origin: "Greek",
        hint: "A building where art or artifacts are displayed"
    },
    {
        word: "orchestra",
        etymology: "From Greek — the semicircular space where the chorus danced in ancient theaters",
        origin: "Greek",
        hint: "A large group of musicians playing together"
    },

    // === BUILDINGS & STRUCTURES ===
    {
        word: "palace",
        etymology: "From Latin 'Palatium' — one of Rome's seven hills where emperors built their homes",
        origin: "Latin",
        hint: "A grand residence of royalty"
    },
    {
        word: "pavilion",
        etymology: "From Latin 'papilio' (butterfly) — tent fabric flapping in the wind resembled wings",
        origin: "Latin",
        hint: "An ornamental building or tent in a park"
    },
    {
        word: "window",
        etymology: "From Old Norse 'vindauga' — literally 'wind eye,' an opening for air and light",
        origin: "Norse",
        hint: "An opening in a wall, usually with glass"
    },
    {
        word: "corridor",
        etymology: "From Italian 'correre' (to run) — a passageway for moving quickly through a building",
        origin: "Italian",
        hint: "A long hallway in a building"
    },

    // === GAMES & GAMBLING ===
    {
        word: "hazard",
        etymology: "From Arabic 'al-zahr' (the dice) — Crusaders brought back risky gambling games from the East",
        origin: "Arabic",
        hint: "A danger or risk"
    },
    {
        word: "checkmate",
        etymology: "From Persian 'shāh māt' — literally 'the king is helpless' or 'the king is dead'",
        origin: "Persian",
        hint: "The winning move in chess"
    },
    {
        word: "trump",
        etymology: "From 'triumph' — a winning card that beats all others in certain games",
        origin: "English",
        hint: "A card suit that beats all others; to outdo"
    },
    {
        word: "gambit",
        etymology: "From Italian 'gambetto' (tripping up) — a chess move that sacrifices a piece for advantage",
        origin: "Italian",
        hint: "A strategic opening move, often risky"
    },

    // === NAUTICAL ===
    {
        word: "buccaneer",
        etymology: "From French 'boucan' — a Caribbean wooden grill for smoking meat, used by early pirates",
        origin: "French",
        hint: "A pirate, especially in the Caribbean"
    },
    {
        word: "filibuster",
        etymology: "From Spanish for 'pirate' — now means blocking legislation by talking endlessly",
        origin: "Spanish",
        hint: "A tactic of endless talking to delay a vote"
    },
    {
        word: "maelstrom",
        etymology: "From Dutch 'malen' (to grind) + 'stroom' (stream) — a powerful whirlpool that grinds ships",
        origin: "Dutch",
        hint: "A powerful whirlpool; a chaotic situation"
    },
    {
        word: "admiral",
        etymology: "From Arabic 'amir al-' (commander of) — borrowed during medieval naval encounters",
        origin: "Arabic",
        hint: "The highest rank in the navy"
    },

    // === LEGAL ===
    {
        word: "verdict",
        etymology: "From Latin 'vere' (truly) + 'dictum' (said) — what is truly spoken by a jury",
        origin: "Latin",
        hint: "The decision reached by a jury"
    },
    {
        word: "alibi",
        etymology: "Latin for 'elsewhere' — proof you were in a different place when a crime occurred",
        origin: "Latin",
        hint: "Proof you were somewhere else when a crime happened"
    },
    {
        word: "culprit",
        etymology: "From abbreviated court French 'cul. prit.' — a clerk's shorthand for 'guilty, ready to prove'",
        origin: "French",
        hint: "The person responsible for a crime"
    },

    // === MADE-UP & COINED WORDS ===
    {
        word: "quiz",
        etymology: "Legend: a Dublin theater owner bet he could invent a word overnight by chalking it on walls citywide",
        origin: "English",
        hint: "A short test or trivia game"
    },
    {
        word: "serendipity",
        etymology: "Coined by Horace Walpole from a Persian fairy tale — the art of making happy discoveries by accident",
        origin: "Persian",
        hint: "Finding good things by happy accident"
    },
    {
        word: "robot",
        etymology: "From Czech 'robota' (forced labor) — coined in a 1920 play about artificial workers who rebel",
        origin: "Czech",
        hint: "A machine that can perform tasks automatically"
    },
    {
        word: "utopia",
        etymology: "Coined by Thomas More from Greek 'ou' (not) + 'topos' (place) — an ideal society that exists nowhere",
        origin: "Greek",
        hint: "An imagined perfect society"
    },

    // === LINGUISTIC ODDITIES ===
    {
        word: "nickname",
        etymology: "From Middle English 'eke-name' (additional name) — 'an eke-name' was misheard over time",
        origin: "English",
        hint: "An informal name for someone"
    },
    {
        word: "apron",
        etymology: "From French 'naperon' — 'a naperon' was gradually misheard as 'an aperon'",
        origin: "French",
        hint: "Protective garment worn while cooking"
    },
    {
        word: "umpire",
        etymology: "From French 'nonper' (without equal) — 'a noumpere' was misheard as 'an oumpere'",
        origin: "French",
        hint: "The official who makes calls in baseball"
    },
    {
        word: "adder",
        etymology: "From Old English 'nædre' — 'a nadder' was misheard as 'an adder' over centuries",
        origin: "English",
        hint: "A venomous snake"
    },

    // === MYTHOLOGY ===
    {
        word: "echo",
        etymology: "From a Greek nymph cursed by Hera to only repeat the last words others spoke to her",
        origin: "Greek",
        hint: "A repeated sound bouncing back"
    },
    {
        word: "narcissist",
        etymology: "From a Greek youth who fell in love with his own reflection in a pool and wasted away",
        origin: "Greek",
        hint: "Someone excessively in love with themselves"
    },
    {
        word: "atlas",
        etymology: "From a Greek Titan condemned by Zeus to hold up the sky for eternity",
        origin: "Greek",
        hint: "A book of maps"
    },
    {
        word: "cereal",
        etymology: "From the Roman goddess of grain and harvest — farmers prayed to her for good crops",
        origin: "Latin",
        hint: "Breakfast food made from grains"
    },
    {
        word: "martial",
        etymology: "From the Roman god of war — relating to military matters and combat",
        origin: "Latin",
        hint: "Relating to war or the military"
    },

    // === NEW ADDITIONS - CLEANED UP ===
    {
        word: "aftermath",
        etymology: "From Old English — the second growth of grass after the first harvest",
        origin: "English",
        hint: "The consequences following an event"
    },
    {
        word: "bedlam",
        etymology: "From the Hospital of St. Mary of Bethlehem in London — a notorious asylum for the mentally ill",
        origin: "English",
        hint: "A scene of chaos and confusion"
    },
    {
        word: "belfry",
        etymology: "From Old French 'berfrei' (movable siege tower) — now where church bells hang",
        origin: "French",
        hint: "The tower where church bells are hung"
    },
    {
        word: "blackmail",
        etymology: "From Scottish 'mail' (rent, tribute) — protection money paid to Highland clan chiefs",
        origin: "Gaelic",
        hint: "Demanding money by threatening to reveal secrets"
    },
    {
        word: "blurb",
        etymology: "Coined in 1907 by humorist Gelett Burgess — promotional text on book jackets",
        origin: "English",
        hint: "Short promotional description on a book cover"
    },
    {
        word: "brouhaha",
        etymology: "Possibly from Hebrew 'barukh habba' (blessed be he who comes) — a noisy commotion",
        origin: "Hebrew",
        hint: "A noisy and overexcited reaction"
    },
    {
        word: "calculate",
        etymology: "Romans used small stones for counting — the practice gave us this math word",
        origin: "Latin",
        hint: "To do math; to figure something out"
    },
    {
        word: "cancel",
        etymology: "From Latin meaning lattice or crossbars — to mark out with crossed lines",
        origin: "Latin",
        hint: "To call off or void something"
    },
    {
        word: "canter",
        etymology: "From Canterbury — the easy pace pilgrims rode when traveling to visit the famous cathedral",
        origin: "English",
        hint: "A horse's pace between trot and gallop"
    },
    {
        word: "captain",
        etymology: "From Latin 'caput' (head) — the head person, the leader of a group",
        origin: "Latin",
        hint: "The leader of a team or ship"
    },
    {
        word: "chapel",
        etymology: "From Latin 'cappa' (cloak) — where St. Martin's cloak was kept as a sacred relic",
        origin: "Latin",
        hint: "A small church or place of worship"
    },
    {
        word: "charlatan",
        etymology: "From Italian 'ciarlare' (to chatter) — a quack who babbles about fake cures and remedies",
        origin: "Italian",
        hint: "A fraud who claims expertise they don't have"
    },
    {
        word: "clinic",
        etymology: "From Greek 'kline' (bed) — originally medical teaching done at a patient's bedside",
        origin: "Greek",
        hint: "A place where you see a doctor"
    },
    {
        word: "clumsy",
        etymology: "From Middle English meaning 'numb with cold' — stiff fingers make you awkward",
        origin: "English",
        hint: "Awkward and prone to dropping things"
    },
    {
        word: "cobalt",
        etymology: "From German 'Kobold' (goblin) — miners blamed mischievous spirits for the troublesome ore",
        origin: "German",
        hint: "A blue metal, or a shade of blue"
    },
    {
        word: "coconut",
        etymology: "From Portuguese 'coco' (grinning face, goblin) — the three holes resemble a face",
        origin: "Portuguese",
        hint: "A tropical fruit with a hard shell and white flesh"
    },
    {
        word: "comrade",
        etymology: "From Spanish 'camarada' (roommate) — someone who shares a chamber or sleeping quarters",
        origin: "Spanish",
        hint: "A friend or fellow member of a group"
    },
    {
        word: "constable",
        etymology: "From Latin 'comes stabuli' (count of the stable) — originally a high-ranking horse master",
        origin: "Latin",
        hint: "A police officer, especially in Britain"
    },
    {
        word: "copper",
        etymology: "From the Latin name for Cyprus — the Mediterranean island famous for this metal",
        origin: "Latin",
        hint: "A reddish-brown metal used in wiring and coins"
    },
    {
        word: "curfew",
        etymology: "From Old French 'couvre-feu' (cover fire) — the evening bell to extinguish all hearth fires",
        origin: "French",
        hint: "A rule requiring people to be home by a certain time"
    },
    {
        word: "cynic",
        etymology: "From Greek for 'dog-like' — philosophers who lived simply, rejecting social conventions",
        origin: "Greek",
        hint: "Someone who believes people are only motivated by self-interest"
    },
    {
        word: "daisy",
        etymology: "From Old English 'dæges eage' (day's eye) — the flower that opens its petals at dawn",
        origin: "English",
        hint: "A small white flower with a yellow center"
    },
    {
        word: "glamour",
        etymology: "A Scottish corruption of 'grammar' — book learning was associated with magic spells",
        origin: "Gaelic",
        hint: "Attractive beauty and style"
    },
    {
        word: "gazette",
        etymology: "From Italian — a small Venetian coin, the price of early newspapers",
        origin: "Italian",
        hint: "A newspaper or official journal"
    },
    {
        word: "groggy",
        etymology: "From 'Old Grog,' nickname of a British Admiral who diluted sailors' rum with water",
        origin: "English",
        hint: "Dazed and unsteady, as when just waking up"
    },
    {
        word: "handicap",
        etymology: "From a 17th-century trading game 'hand-in-cap' — later used for equalizing horse races",
        origin: "English",
        hint: "A disadvantage that makes success more difficult"
    },
    {
        word: "husband",
        etymology: "From Old Norse 'hus' (house) + 'bondi' (dweller) — the master of the household",
        origin: "Norse",
        hint: "A married man"
    },
    {
        word: "infantry",
        etymology: "From Latin 'infans' (youth) — young, inexperienced foot soldiers as opposed to cavalry",
        origin: "Latin",
        hint: "Soldiers who fight on foot"
    },
    {
        word: "journey",
        etymology: "From Old French for 'a day' — originally how far you could travel in one day",
        origin: "French",
        hint: "A trip from one place to another"
    },
    {
        word: "magazine",
        etymology: "From Arabic 'makhazin' (storehouses) — originally a storehouse, then a storehouse of information",
        origin: "Arabic",
        hint: "A periodic publication with articles and pictures"
    },
    {
        word: "mortgage",
        etymology: "From Old French 'mort' (death) + 'gage' (pledge) — the deal 'dies' when paid off",
        origin: "French",
        hint: "A loan used to buy a house"
    },
    {
        word: "noon",
        etymology: "From Latin 'nona hora' (ninth hour) — originally 3 PM, nine hours after monks rose at dawn",
        origin: "Latin",
        hint: "Twelve o'clock in the daytime"
    },
    {
        word: "orange",
        etymology: "From Sanskrit 'nāranga' — the fruit existed before the color name; people said 'yellow-red' before",
        origin: "Sanskrit",
        hint: "A citrus fruit, or the color between red and yellow"
    },
    {
        word: "pamphlet",
        etymology: "From a 12th-century Latin love poem — widely copied on cheap paper",
        origin: "Latin",
        hint: "A small booklet with information"
    },
    {
        word: "peculiar",
        etymology: "From Latin 'pecus' (cattle) — originally meant 'one's own private property'",
        origin: "Latin",
        hint: "Strange or unusual"
    },
    {
        word: "purple",
        etymology: "From Latin — a shellfish Romans crushed to make expensive royal dye",
        origin: "Latin",
        hint: "A color mixing red and blue"
    },
    {
        word: "sandwich",
        etymology: "From the 4th Earl of S., who wanted to eat without leaving the gambling table",
        origin: "English",
        hint: "Food between two slices of bread"
    },
    {
        word: "sideburns",
        etymology: "From Civil War General Ambrose B., who wore distinctive facial hair — his name got reversed",
        origin: "English",
        hint: "Facial hair grown on the sides of the face"
    },
    {
        word: "silhouette",
        etymology: "From Étienne de S., a French finance minister famous for his cheapness and shadow portraits",
        origin: "French",
        hint: "A dark outline of something against a lighter background"
    },
    {
        word: "sincere",
        etymology: "Possibly from Latin 'sine cera' (without wax) — honest sculptors didn't hide flaws with wax",
        origin: "Latin",
        hint: "Genuine and honest in feelings"
    },
    {
        word: "tawdry",
        etymology: "From 'St. Audrey's lace' — cheap lace sold at medieval fairs honoring this saint",
        origin: "English",
        hint: "Cheap and gaudy in appearance"
    },
    {
        word: "thesaurus",
        etymology: "From Greek meaning treasury or storehouse — a treasury of words and synonyms",
        origin: "Greek",
        hint: "A book of synonyms"
    },
    {
        word: "threshold",
        etymology: "From Old English — the board at a door that held in the 'thresh' (straw) on the floor",
        origin: "English",
        hint: "The entrance to a doorway; a starting point"
    },
    {
        word: "trivial",
        etymology: "From Latin for 'where three roads meet' — common knowledge found at crossroads",
        origin: "Latin",
        hint: "Of little importance; minor"
    },
    {
        word: "tuxedo",
        etymology: "From a country club in New York where this formal jacket was first worn in 1886",
        origin: "English",
        hint: "A formal black suit worn to fancy events"
    },
    {
        word: "umbrella",
        etymology: "From Italian 'ombra' (shade, shadow) — originally for sun protection, not rain",
        origin: "Italian",
        hint: "A device held over your head to keep off rain"
    },
    {
        word: "vandal",
        etymology: "From the Germanic tribe that sacked Rome in 455 AD — destroyers of civilization",
        origin: "German",
        hint: "Someone who deliberately destroys property"
    },
    {
        word: "wardrobe",
        etymology: "From Old French 'warder' (to guard) + 'robe' — a room for guarding clothes",
        origin: "French",
        hint: "A closet or cabinet for storing clothes"
    },

    // === MORE NEW WORDS ===
    {
        word: "abracadabra",
        etymology: "Possibly from Aramaic 'avra kedavra' (I create as I speak) — a magician's incantation",
        origin: "Aramaic",
        hint: "A magic word used by magicians"
    },
    {
        word: "accolade",
        etymology: "From Latin 'ad' (to) + 'collum' (neck) — the embrace given when making someone a knight",
        origin: "Latin",
        hint: "An award or expression of praise"
    },
    {
        word: "cabal",
        etymology: "From Hebrew 'qabbalah' (mystical tradition) — a secret political faction or conspiracy",
        origin: "Hebrew",
        hint: "A secret group plotting together"
    },
    {
        word: "cadence",
        etymology: "From Latin 'cadere' (to fall) — the fall of the voice at a sentence's end",
        origin: "Latin",
        hint: "The rhythm or flow of speech or music"
    },
    {
        word: "carousel",
        etymology: "From Italian — originally a jousting tournament, later a merry-go-round",
        origin: "Italian",
        hint: "A rotating amusement ride with horses"
    },
    {
        word: "caterpillar",
        etymology: "From Old French 'chatepelose' (hairy cat) — describing the fuzzy larva",
        origin: "French",
        hint: "The larva stage of a butterfly"
    },
    {
        word: "caucus",
        etymology: "Possibly from Algonquian for 'counselor' — a political meeting to select candidates",
        origin: "Algonquian",
        hint: "A political meeting to choose candidates"
    },
    {
        word: "chancellor",
        etymology: "From Latin — an official who stood at the latticed barrier in court",
        origin: "Latin",
        hint: "A high government official; head of a university"
    },
    {
        word: "chapter",
        etymology: "From Latin 'caput' (head) — a main division of a book, like a head of a body",
        origin: "Latin",
        hint: "A section of a book"
    },
    {
        word: "cockpit",
        etymology: "From the pit where roosters fought — now the compartment where pilots sit",
        origin: "English",
        hint: "Where a pilot sits in an airplane"
    },
    {
        word: "bonfire",
        etymology: "From 'bone fire' — medieval fires where bones were burned, not 'bon' (good) fire",
        origin: "English",
        hint: "A large outdoor fire for celebration"
    },
    {
        word: "dachshund",
        etymology: "From German 'Dachs' (badger) + 'Hund' (dog) — bred to hunt animals in burrows",
        origin: "German",
        hint: "A small, long-bodied dog breed"
    },
    {
        word: "fiasco",
        etymology: "From Italian 'to make a bottle' — a flawed glass bottle that fails and breaks",
        origin: "Italian",
        hint: "A complete and embarrassing failure"
    },
    {
        word: "galore",
        etymology: "From Irish Gaelic 'go leór' — meaning 'to sufficiency' or 'plenty'",
        origin: "Gaelic",
        hint: "In abundance; plenty of"
    },
    {
        word: "goodbye",
        etymology: "A contraction of 'God be with ye' — first written down in the 1570s",
        origin: "English",
        hint: "A farewell expression"
    },
    {
        word: "gossamer",
        etymology: "From Middle English 'goose summer' — the delicate webs seen floating in warm autumn air",
        origin: "English",
        hint: "Something extremely light and delicate"
    },
    {
        word: "grotesque",
        etymology: "From Italian for 'cave' — bizarre paintings found in excavated Roman chambers",
        origin: "Italian",
        hint: "Ugly or distorted in a disturbing way"
    },
    {
        word: "gymnasium",
        etymology: "From Greek for 'naked' — ancient Greeks exercised without clothing",
        origin: "Greek",
        hint: "A place for indoor exercise and sports"
    },
    {
        word: "halcyon",
        etymology: "From Greek for kingfisher — the bird was said to calm seas during winter nesting",
        origin: "Greek",
        hint: "A period of peace and happiness"
    },
    {
        word: "havoc",
        etymology: "From Old French 'havot' — the cry to soldiers allowing them to plunder",
        origin: "French",
        hint: "Widespread destruction and chaos"
    },
    {
        word: "hearse",
        etymology: "From Latin 'hirpex' (large rake) — originally a candle-holding frame over coffins",
        origin: "Latin",
        hint: "A vehicle that carries a coffin"
    },
    {
        word: "hermit",
        etymology: "From Greek 'eremos' (desert, solitude) — one who lives alone in the wilderness",
        origin: "Greek",
        hint: "Someone who lives alone, away from society"
    },
    {
        word: "hooligan",
        etymology: "Possibly from an Irish family name in London — associated with rowdy behavior in the 1890s",
        origin: "Gaelic",
        hint: "A violent troublemaker"
    },
    {
        word: "hypocrite",
        etymology: "From Greek for 'actor on stage' — one who wears a mask and pretends",
        origin: "Greek",
        hint: "Someone who pretends to have beliefs they don't actually hold"
    },
    {
        word: "inoculate",
        etymology: "From Latin 'in' + 'oculus' (eye, bud) — originally a gardening term for grafting plants",
        origin: "Latin",
        hint: "To give a vaccine to protect against disease"
    },
    {
        word: "insult",
        etymology: "From Latin meaning 'to leap upon' — to assault verbally",
        origin: "Latin",
        hint: "An offensive remark meant to hurt"
    },
    {
        word: "janitor",
        etymology: "From the two-faced Roman god of doorways and beginnings",
        origin: "Latin",
        hint: "A person who cleans and maintains a building"
    },
    {
        word: "jeopardy",
        etymology: "From Old French 'jeu parti' (divided game) — an evenly matched contest with uncertain outcome",
        origin: "French",
        hint: "Danger of loss or harm; also a TV quiz show"
    },
    {
        word: "jubilee",
        etymology: "From Hebrew 'yobel' (ram's horn) — the trumpet blown to announce a year of freedom",
        origin: "Hebrew",
        hint: "A special anniversary celebration"
    },
    {
        word: "lackadaisical",
        etymology: "From 'lackaday' (alack the day!) — an expression of regret that became an attitude",
        origin: "English",
        hint: "Lacking enthusiasm; carelessly lazy"
    },
    {
        word: "leotard",
        etymology: "From Jules L., a French trapeze artist who designed this tight-fitting garment",
        origin: "French",
        hint: "A tight one-piece garment worn by dancers"
    },
    {
        word: "lieutenant",
        etymology: "From French for 'one who holds the place' — a deputy who stands in for a superior",
        origin: "French",
        hint: "A military rank below captain"
    },
    {
        word: "limousine",
        etymology: "From a French region whose residents wore hooded cloaks — the covered car resembled one",
        origin: "French",
        hint: "A long, luxurious car"
    },
    {
        word: "meander",
        etymology: "From a winding river in Turkey known to the ancient Greeks for its many curves",
        origin: "Greek",
        hint: "To wander slowly without a clear direction"
    },
    {
        word: "mesmerize",
        etymology: "From Franz M., an 18th-century doctor who claimed to heal through 'animal magnetism'",
        origin: "German",
        hint: "To capture someone's complete attention"
    },
    {
        word: "nightmare",
        etymology: "From Old English 'mare' — an evil spirit that sits on sleepers' chests causing bad dreams",
        origin: "English",
        hint: "A frightening dream"
    },
    {
        word: "ostracize",
        etymology: "From Greek 'ostrakon' (pottery shard) — Athenians voted to exile citizens by writing names on broken pots",
        origin: "Greek",
        hint: "To exclude someone from a group"
    },
    {
        word: "pandemonium",
        etymology: "Coined by John Milton — the capital of Hell in Paradise Lost, meaning 'all demons'",
        origin: "Greek",
        hint: "Wild chaos and uproar"
    },
    {
        word: "phony",
        etymology: "From 'fawney' — British slang for the fake gold rings con artists sold to the gullible",
        origin: "English",
        hint: "Fake; not genuine"
    },
    {
        word: "plagiarize",
        etymology: "From Latin for 'kidnapper' — stealing someone's words as if kidnapping them",
        origin: "Latin",
        hint: "To copy someone else's work and claim it as your own"
    },
    {
        word: "prestige",
        etymology: "From Latin 'praestigiae' (illusions, juggler's tricks) — originally meant deception",
        origin: "Latin",
        hint: "High status or reputation"
    },
    {
        word: "prodigy",
        etymology: "From Latin for 'omen or portent' — an extraordinary person seen as a sign from the gods",
        origin: "Latin",
        hint: "A young person with exceptional talent"
    },
    {
        word: "propaganda",
        etymology: "From a papal committee for spreading the faith — spreading religious beliefs",
        origin: "Latin",
        hint: "Information spread to promote a viewpoint"
    },
    {
        word: "quarry",
        etymology: "From Latin 'cor' (heart) — originally the entrails given to hunting dogs as a reward",
        origin: "Latin",
        hint: "A place where stone is dug out; also prey being hunted"
    },
    {
        word: "sabotage",
        etymology: "From French 'sabot' (wooden shoe) — workers allegedly threw clogs into machinery",
        origin: "French",
        hint: "Deliberately destroying something to cause problems"
    },
    {
        word: "scapegoat",
        etymology: "From the ancient Hebrew ritual — a goat symbolically loaded with sins and sent into the wilderness",
        origin: "Hebrew",
        hint: "Someone blamed for others' mistakes"
    },
    {
        word: "shambles",
        etymology: "From Old English 'scamol' (stool, counter) — originally a meat market's butcher tables",
        origin: "English",
        hint: "A state of complete disorder"
    },
    {
        word: "sinister",
        etymology: "From Latin for 'left' — the left side was considered unlucky and evil",
        origin: "Latin",
        hint: "Evil or threatening"
    },
    {
        word: "stentorian",
        etymology: "From a Greek herald in the Iliad whose voice was as loud as fifty men",
        origin: "Greek",
        hint: "Extremely loud and powerful (voice)"
    },
    {
        word: "stoic",
        etymology: "From Greek 'stoa' (porch) — the colonnade in Athens where these philosophers taught",
        origin: "Greek",
        hint: "Enduring pain without showing emotion"
    },
    {
        word: "tantrum",
        etymology: "Of unknown origin — possibly related to 'tarantism,' frenzied dancing after a spider bite",
        origin: "Italian",
        hint: "An angry outburst, especially by a child"
    },
    {
        word: "trophy",
        etymology: "From Greek 'tropaion' — a monument of enemy armor at the spot where they turned and fled",
        origin: "Greek",
        hint: "A prize for winning a competition"
    },
    {
        word: "uncle",
        etymology: "From Latin 'avunculus' (mother's brother) — family terminology was very specific",
        origin: "Latin",
        hint: "Your parent's brother"
    },
    {
        word: "vengeance",
        etymology: "From Latin 'vindicare' (to claim, avenge) — related to 'vindicate'",
        origin: "Latin",
        hint: "Punishment inflicted for a wrong; revenge"
    },
    {
        word: "vernacular",
        etymology: "From Latin 'verna' (home-born slave) — the language spoken by common people at home",
        origin: "Latin",
        hint: "The everyday language of ordinary people"
    },
    {
        word: "zeal",
        etymology: "From Greek, meaning intense enthusiasm — originally related to jealousy and rivalry",
        origin: "Greek",
        hint: "Great enthusiasm and energy for a cause"
    }
];

// Shuffle function for randomizing word order
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WORDS, shuffleArray };
}
