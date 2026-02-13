// Curated Daily Etymordle Word List
// Day 1 = first word, Day 2 = second word, etc.
// Edit this list to control the exact order of daily puzzles

const DAILY_WORDS = [
    // Day 1
    { word: "salary", etymology: "From Latin 'sal' (salt) — Roman soldiers received an allowance to buy this precious preservative", origin: "Latin" },
    // Day 2
    { word: "panic", etymology: "From the Greek god Pan, whose sudden appearance in the woods caused travelers to flee in terror", origin: "Greek" },
    // Day 3
    { word: "assassin", etymology: "From Arabic 'hashīshīn' — a feared 12th-century sect in the Lebanese mountains known for targeted killings", origin: "Arabic" },
    // Day 5
    { word: "cappuccino", etymology: "From Italian for 'hood' — the drink's brown color matches the robes of hooded friars", origin: "Italian" },
    // Day 6
    { word: "quarantine", etymology: "From Italian 'quaranta' (forty) — ships suspected of plague waited this many days before docking", origin: "Italian" },
    // Day 7
    { word: "clue", etymology: "From the Greek for 'ball of yarn'. Theseus used yarn to escape the Minotaur's labyrinth.", origin: "English" },
    // Day 8
    { word: "disaster", etymology: "From Greek 'bad' + 'star' — an event caused by unfavorable stars", origin: "Greek" },
    // Day 9
    { word: "robot", etymology: "From the Czech for 'forced labor' — coined in a 1920 play about artificial workers who rebel", origin: "Czech" },
    // Day 10
    { word: "candidate", etymology: "Roman office-seekers wore bleached white togas to show their purity", origin: "Latin" },
    // Day 11
    { word: "whiskey", etymology: "From Gaelic 'uisce beatha' — literally 'water of life,' referring to distilled spirits", origin: "Gaelic" },
    // Day 12
    { word: "berserk", etymology: "From Old Norse 'berr' (bear) + 'serkr' (shirt) — Viking warriors who fought in animal skins with wild frenzy", origin: "Norse" },
    // Day 13
    { word: "avocado", etymology: "From Nahuatl (Aztec) 'ahuacatl' — a word also meaning a certain male body part, due to the shape", origin: "Nahuatl" },
    // Day 14
    { word: "checkmate", etymology: "From Persian 'shāh māt' — literally 'the king is helpless' or 'the king is dead'", origin: "Persian" },
    // Day 15
    { word: "sarcasm", etymology: "From Greek 'sarkazein' — literally to tear flesh like a dog, to bite one's lip in rage", origin: "Greek" },
    // Day 16
    { word: "vaccine", etymology: "From Latin 'vacca' (cow) — the first immunization used material from infected cattle", origin: "Latin" },
    // Day 17
    { word: "deadline", etymology: "From a Civil War prison — the line prisoners would be shot for crossing", origin: "English" },
    // Day 18
    { word: "nostalgia", etymology: "From Greek 'nostos' (return home) + 'algos' (pain) — the ache of longing for a place you once knew", origin: "Greek" },
    // Day 19
    { word: "boycott", etymology: "From Captain Charles B., an English land agent in Ireland whom tenants refused to deal with in 1880", origin: "English" },
    // Day 20
    { word: "volcano", etymology: "From the Roman god of fire and forge — whose workshop was believed to be under a Sicilian mountain", origin: "Latin" },
    // Day 21
    { word: "tantalize", etymology: "From a Greek king punished in Hades to stand in water that receded when he tried to drink", origin: "Greek" },
    // Day 22
    { word: "jeans", etymology: "From the French name for Genoa — an Italian port city famous for durable cotton fabric for sailors", origin: "French" },
    // Day 23
    { word: "malaria", etymology: "From Italian for 'bad air' — people blamed foul swamp vapors for the disease", origin: "Italian" },
    // Day 24
    { word: "narcissist", etymology: "From a Greek youth who fell in love with his own reflection in a pool and wasted away", origin: "Greek" },
    // Day 25
    { word: "hazard", etymology: "From Arabic 'al-zahr' (the dice) — Crusaders brought back risky gambling games from the East", origin: "Arabic" },
    // Day 26
    { word: "lunatic", etymology: "From Latin 'luna' (moon) — people believed madness was caused by lunar cycles", origin: "Latin" },
    // Day 27
    { word: "gossip", etymology: "From Old English 'godsibb' — a godparent, later meaning a close friend you share secrets with", origin: "English" },
    // Day 28
    { word: "villain", etymology: "From Latin 'villa' (country house) — originally just meant a peasant farmer", origin: "Latin" },
    // Day 29
    { word: "serendipity", etymology: "Coined by Horace Walpole from a Persian fairy tale — the art of making happy discoveries by accident", origin: "Persian" },
    // Day 30
    { word: "decimate", etymology: "From Latin — the Roman punishment of executing every tenth soldier in a mutinous unit", origin: "Latin" },
    // Day 31
    { word: "companion", etymology: "From Latin 'com' (together) + 'panis' (bread) — someone you share meals with", origin: "Latin" },
    // Day 32
    { word: "nightmare", etymology: "From Old English 'mare' — an evil spirit that sits on sleepers' chests causing bad dreams", origin: "English" },
    // Day 33
    { word: "bankrupt", etymology: "From Italian 'banca rotta' (broken bench) — a failed money-lender's table was literally smashed", origin: "Italian" },
    // Day 34
    { word: "atlas", etymology: "From a Greek Titan condemned by Zeus to hold up the sky for eternity", origin: "Greek" },
    // Day 35
    { word: "piano", etymology: "From Italian for 'soft and loud' — revolutionary because you could control volume", origin: "Italian" },
    // Day 36
    { word: "rival", etymology: "From Latin 'rivus' (stream) — originally people who shared the same river and competed for water", origin: "Latin" },
    // Day 37
    { word: "gymnasium", etymology: "From Greek for 'naked' — ancient Greeks exercised without clothing", origin: "Greek" },
    // Day 38
    { word: "curfew", etymology: "From Old French 'couvre-feu' (cover fire) — the evening bell to extinguish all hearth fires", origin: "French" },
    // Day 39
    { word: "dandelion", etymology: "From French 'dent de lion' (lion's tooth) — referring to the jagged leaves", origin: "French" },
    // Day 40
    { word: "mortgage", etymology: "From Old French 'mort' (death) + 'gage' (pledge) — the deal 'dies' when paid off", origin: "French" },
    // Day 41
    { word: "enthusiasm", etymology: "From Greek 'entheos' — to be possessed by a god, divinely inspired", origin: "Greek" },
    // Day 42
    { word: "sabotage", etymology: "From French 'sabot' (wooden shoe) — workers allegedly threw clogs into machinery", origin: "French" },
    // Day 43
    { word: "daisy", etymology: "From Old English 'dæges eage' (day's eye) — the flower that opens its petals at dawn", origin: "English" },
    // Day 44
    { word: "admiral", etymology: "From Arabic 'amir al-' (commander of) — borrowed during medieval naval encounters", origin: "Arabic" },
    // Day 45
    { word: "hypocrite", etymology: "From Greek for 'actor on stage' — one who wears a mask and pretends", origin: "Greek" },
    // Day 46
    { word: "silhouette", etymology: "From Étienne de S., a French finance minister famous for his cheapness and shadow portraits", origin: "French" },
    // Day 47
    { word: "cereal", etymology: "From the Roman goddess of grain and harvest — farmers prayed to her for good crops", origin: "Latin" },
    // Day 48
    { word: "window", etymology: "From Old Norse 'vindauga' — literally 'wind eye,' an opening for air and light", origin: "Norse" },
    // Day 49
    { word: "journey", etymology: "From Old French for 'a day' — originally how far you could travel in one day", origin: "French" },
    // Day 50
    { word: "ostracize", etymology: "From Greek 'ostrakon' (pottery shard) — Athenians voted to exile citizens by writing names on broken pots", origin: "Greek" },
    // Day 51
    { word: "trivial", etymology: "From Latin for 'where three roads meet' — common knowledge found at crossroads", origin: "Latin" },
    // Day 52
    { word: "coconut", etymology: "From Portuguese 'coco' (grinning face, goblin) — the three holes resemble a face", origin: "Portuguese" },
    // Day 53
    { word: "sincere", etymology: "Possibly from Latin 'sine cera' (without wax) — honest sculptors didn't hide flaws with wax", origin: "Latin" },
    // Day 54
    { word: "meander", etymology: "From a winding river in Turkey known to the ancient Greeks for its many curves", origin: "Greek" },
    // Day 55
    { word: "tuxedo", etymology: "From a country club in New York where this formal jacket was first worn in 1886", origin: "English" },
    // Day 56
    { word: "magazine", etymology: "From Arabic 'makhazin' (storehouses) — originally a storehouse, then a storehouse of information", origin: "Arabic" },
    // Day 57
    { word: "janitor", etymology: "From the two-faced Roman god of doorways and beginnings", origin: "Latin" },
    // Day 58
    { word: "bonfire", etymology: "From 'bone fire' — medieval fires where bones were burned, not 'bon' (good) fire", origin: "English" },
    // Day 59
    { word: "tragedy", etymology: "From Greek 'tragos' (goat) — possibly from goat-skin costumes or goat sacrifices at festivals", origin: "Greek" },
    // Day 60
    { word: "freelance", etymology: "From a 1820s novel — medieval mercenaries whose weapons were not pledged to any lord", origin: "English" },
    // Day 61
    { word: "palace", etymology: "From Latin 'Palatium' — one of Rome's seven hills where emperors built their homes", origin: "Latin" },
    // Day 62
    { word: "scapegoat", etymology: "From the ancient Hebrew ritual — a goat symbolically loaded with sins and sent into the wilderness", origin: "Hebrew" },
    // Day 63
    { word: "cardigan", etymology: "Named after a British Earl whose troops wore buttoned knitted jackets in the Crimean War", origin: "English" },
    // Day 64
    { word: "echo", etymology: "From a Greek nymph cursed by Hera to only repeat the last words others spoke to her", origin: "Greek" },
    // Day 65
    { word: "sinister", etymology: "From Latin for 'left' — the left side was considered unlucky and evil", origin: "Latin" },
    // Day 66
    { word: "dachshund", etymology: "From German 'Dachs' (badger) + 'Hund' (dog) — bred to hunt animals in burrows", origin: "German" },
    // Day 67
    { word: "utopia", etymology: "Coined by Thomas More from Greek 'ou' (not) + 'topos' (place) — an ideal society that exists nowhere", origin: "Greek" },
    // Day 68
    { word: "husband", etymology: "From Old Norse 'hus' (house) + 'bondi' (dweller) — the master of the household", origin: "Norse" },
    // Day 69
    { word: "fiasco", etymology: "From Italian 'to make a bottle' — a flawed glass bottle that fails and breaks", origin: "Italian" },
    // Day 70
    { word: "martial", etymology: "From the Roman god of war — relating to military matters and combat", origin: "Latin" },
    // Day 71
    { word: "melancholy", etymology: "From Greek 'melas' (black) + 'khole' (bile) — ancient doctors blamed sadness on bodily fluids", origin: "Greek" },
    // Day 72
    { word: "buccaneer", etymology: "From French 'boucan' — a Caribbean wooden grill for smoking meat, used by early pirates", origin: "French" },
    // Day 73
    { word: "orange", etymology: "From Sanskrit 'nāranga' — the fruit existed before the color name; people said 'yellow-red' before", origin: "Sanskrit" },
    // Day 74
    { word: "stoic", etymology: "From Greek 'stoa' (porch) — the colonnade in Athens where these philosophers taught", origin: "Greek" },
    // Day 75
    { word: "calculate", etymology: "Romans used small stones for counting — the practice gave us this math word", origin: "Latin" },
    // Day 76
    { word: "pandemonium", etymology: "Coined by John Milton — the capital of Hell in Paradise Lost, meaning 'all demons'", origin: "Greek" },
    // Day 77
    { word: "umbrella", etymology: "From Italian 'ombra' (shade, shadow) — originally for sun protection, not rain", origin: "Italian" },
    // Day 78
    { word: "quiz", etymology: "Legend: a Dublin theater owner bet he could invent a word overnight by chalking it on walls citywide", origin: "English" },
    // Day 79
    { word: "lethargy", etymology: "From Greek 'lethe' — the river of forgetfulness in Hades that made souls forget their past lives", origin: "Greek" },
    // Day 80
    { word: "vandal", etymology: "From the Germanic tribe that sacked Rome in 455 AD — destroyers of civilization", origin: "German" },
    // Day 81
    { word: "trivia", etymology: "Information exchanged where three roads met in ancient Rome — considered common knowledge", origin: "Latin" },
    // Day 82
    { word: "mesmerize", etymology: "From Franz M., an 18th-century doctor who claimed to heal through 'animal magnetism'", origin: "German" },
    // Day 83
    { word: "verdict", etymology: "From Latin 'vere' (truly) + 'dictum' (said) — what is truly spoken by a jury", origin: "Latin" },
    // Day 84
    { word: "cobalt", etymology: "From German 'Kobold' (goblin) — miners blamed mischievous spirits for the troublesome ore", origin: "German" },
    // Day 85
    { word: "jovial", etymology: "From the Roman king of the gods — people born under his planet were supposedly cheerful", origin: "Latin" },
    // Day 86
    { word: "halcyon", etymology: "From Greek for kingfisher — the bird was said to calm seas during winter nesting", origin: "Greek" },
    // Day 87
    { word: "slogan", etymology: "From Scottish Gaelic 'sluagh' (army) + 'gairm' (cry) — a battle cry used by Highland clans", origin: "Gaelic" },
    // Day 88
    { word: "porcupine", etymology: "From Latin 'porcus' (pig) + 'spina' (thorn) — literally 'thorny pig'", origin: "Latin" },
    // Day 89
    { word: "grotesque", etymology: "From Italian for 'cave' — bizarre paintings found in excavated Roman chambers", origin: "Italian" },
    // Day 89
    { word: "alibi", etymology: "Latin for 'elsewhere' — proof you were in a different place when a crime occurred", origin: "Latin" },
    // Day 90
    { word: "sandwich", etymology: "From an English Earl who wanted to eat without leaving the gambling table", origin: "English" },
];
