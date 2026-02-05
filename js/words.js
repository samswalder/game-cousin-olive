// Etymology Word List for Etymordle
// All hints carefully written to avoid revealing the answer word
// No Latin/Greek roots that sound like the answer are included

const WORDS = [
    // === EMOTIONS & STATES ===
    {
        word: "nostalgia",
        etymology: "From Greek 'nostos' (return home) + 'algos' (pain) — the ache of longing for a place you once knew",
        origin: "Greek"
    },
    {
        word: "panic",
        etymology: "From the Greek god Pan, whose sudden appearance in the woods caused travelers to flee in terror",
        origin: "Greek"
    },
    {
        word: "enthusiasm",
        etymology: "From Greek 'entheos' — to be possessed by a god, divinely inspired",
        origin: "Greek"
    },
    {
        word: "lethargy",
        etymology: "From Greek 'lethe' — the river of forgetfulness in Hades that made souls forget their past lives",
        origin: "Greek"
    },
    {
        word: "tantalize",
        etymology: "From a Greek king punished in Hades to stand in water that receded when he tried to drink",
        origin: "Greek"
    },
    {
        word: "jovial",
        etymology: "From the Roman king of the gods — people born under his planet were supposedly cheerful",
        origin: "Latin"
    },
    {
        word: "mercurial",
        etymology: "From the swift Roman messenger god — known for being unpredictable and changeable",
        origin: "Latin"
    },
    {
        word: "melancholy",
        etymology: "From Greek 'melas' (black) + 'khole' (bile) — ancient doctors blamed sadness on bodily fluids",
        origin: "Greek"
    },

    // === PEOPLE & SOCIETY ===
    {
        word: "companion",
        etymology: "From Latin 'com' (together) + 'panis' (bread) — someone you share meals with",
        origin: "Latin"
    },
    {
        word: "rival",
        etymology: "From Latin 'rivus' (stream) — originally people who shared the same river and competed for water",
        origin: "Latin"
    },
    {
        word: "candidate",
        etymology: "From Latin 'candidus' (white) — Roman office-seekers wore bleached white togas",
        origin: "Latin"
    },
    {
        word: "villain",
        etymology: "From Latin 'villa' (country house) — originally just meant a peasant farmer",
        origin: "Latin"
    },
    {
        word: "dunce",
        etymology: "From John Duns Scotus, a medieval scholar whose followers were mocked by Renaissance thinkers as stupid",
        origin: "English"
    },
    {
        word: "boycott",
        etymology: "From Captain Charles B., an English land agent in Ireland whom tenants refused to deal with in 1880",
        origin: "English"
    },
    {
        word: "maverick",
        etymology: "From Samuel M., a Texas rancher who refused to brand his cattle — now means an independent thinker",
        origin: "English"
    },
    {
        word: "chauvinist",
        etymology: "From Nicolas C., a possibly legendary soldier fanatically devoted to Napoleon Bonaparte",
        origin: "French"
    },

    // === WORDS & COMMUNICATION ===
    {
        word: "sarcasm",
        etymology: "From Greek 'sarkazein' — literally to tear flesh like a dog, to bite one's lip in rage",
        origin: "Greek"
    },
    {
        word: "slogan",
        etymology: "From Scottish Gaelic 'sluagh' (army) + 'gairm' (cry) — a battle cry used by Highland clans",
        origin: "Gaelic"
    },
    {
        word: "gossip",
        etymology: "From Old English 'godsibb' — a godparent, later meaning a close friend you share secrets with",
        origin: "English"
    },
    {
        word: "clue",
        etymology: "From 'clew' (ball of yarn) — a Greek hero used thread to escape a monster's labyrinth",
        origin: "English"
    },
    {
        word: "trivia",
        etymology: "From Latin 'tri' (three) + 'via' (road) — where three roads meet, where common people gathered to chat",
        origin: "Latin"
    },

    // === MONEY & TRADE ===
    {
        word: "salary",
        etymology: "From Latin 'sal' (salt) — Roman soldiers received an allowance to buy this precious preservative",
        origin: "Latin"
    },
    {
        word: "bankrupt",
        etymology: "From Italian 'banca rotta' (broken bench) — a failed money-lender's table was literally smashed",
        origin: "Italian"
    },
    {
        word: "fee",
        etymology: "From Old English 'feoh' (cattle) — livestock was the original form of payment",
        origin: "English"
    },
    {
        word: "pecuniary",
        etymology: "From Latin 'pecus' (cattle) — in ancient times, wealth was measured in livestock",
        origin: "Latin"
    },
    {
        word: "capital",
        etymology: "From Latin 'caput' (head) — wealth was counted by heads of cattle",
        origin: "Latin"
    },

    // === FOOD & DRINK ===
    {
        word: "whiskey",
        etymology: "From Gaelic 'uisce beatha' — literally 'water of life,' referring to distilled spirits",
        origin: "Gaelic"
    },
    {
        word: "cappuccino",
        etymology: "From Italian 'cappuccio' (hood) — the drink's brown color matches the robes of hooded friars",
        origin: "Italian"
    },
    {
        word: "avocado",
        etymology: "From Nahuatl (Aztec) 'ahuacatl' — a word also meaning a certain male body part, due to the shape",
        origin: "Nahuatl"
    },
    {
        word: "cantaloupe",
        etymology: "From an Italian papal estate plagued by howling wolves where this melon was cultivated",
        origin: "Italian"
    },

    // === CLOTHING ===
    {
        word: "jeans",
        etymology: "From the French name for Genoa — an Italian port city famous for durable cotton fabric for sailors",
        origin: "French"
    },
    {
        word: "denim",
        etymology: "From French 'de Nîmes' (from Nîmes) — a French city that produced this sturdy fabric",
        origin: "French"
    },
    {
        word: "cardigan",
        etymology: "Named after a British Earl whose troops wore buttoned knitted jackets in the Crimean War",
        origin: "English"
    },
    {
        word: "pants",
        etymology: "From a silly old man character in Italian comedy who wore tight trousers over skinny legs",
        origin: "Italian"
    },
    {
        word: "cravat",
        etymology: "From French 'Croate' — neckwear worn by Croatian mercenary soldiers in the 1600s",
        origin: "French"
    },

    // === PLACES & GEOGRAPHY ===
    {
        word: "quarantine",
        etymology: "From Italian 'quaranta' (forty) — ships suspected of plague waited this many days before docking",
        origin: "Italian"
    },
    {
        word: "peninsula",
        etymology: "From Latin 'paene' (almost) + 'insula' (island) — land that's nearly surrounded by water",
        origin: "Latin"
    },
    {
        word: "volcano",
        etymology: "From the Roman god of fire and forge — whose workshop was believed to be under a Sicilian mountain",
        origin: "Latin"
    },
    {
        word: "canary",
        etymology: "From islands named for wild dogs (Latin 'canis'), not birds — the birds came later",
        origin: "Latin"
    },
    {
        word: "spa",
        etymology: "From a Belgian town famous since Roman times for its mineral springs and healing waters",
        origin: "Belgian"
    },

    // === WAR & CONFLICT ===
    {
        word: "assassin",
        etymology: "From Arabic 'hashīshīn' — a feared 12th-century sect in the Lebanese mountains known for targeted killings",
        origin: "Arabic"
    },
    {
        word: "berserk",
        etymology: "From Old Norse 'berr' (bear) + 'serkr' (shirt) — Viking warriors who fought in animal skins with wild frenzy",
        origin: "Norse"
    },
    {
        word: "decimate",
        etymology: "From Latin — the Roman punishment of executing every tenth soldier in a mutinous unit",
        origin: "Latin"
    },
    {
        word: "deadline",
        etymology: "From a Civil War prison — the line prisoners would be shot dead for crossing",
        origin: "English"
    },
    {
        word: "freelance",
        etymology: "From a 1820s novel — medieval mercenaries whose weapons were not pledged to any lord",
        origin: "English"
    },

    // === SCIENCE & MEDICINE ===
    {
        word: "malaria",
        etymology: "From Italian 'mal' (bad) + 'aria' (air) — people blamed foul swamp vapors for the disease",
        origin: "Italian"
    },
    {
        word: "vaccine",
        etymology: "From Latin 'vacca' (cow) — the first immunization used material from infected cattle",
        origin: "Latin"
    },
    {
        word: "lunatic",
        etymology: "From Latin 'luna' (moon) — people believed madness was caused by lunar cycles",
        origin: "Latin"
    },
    {
        word: "disaster",
        etymology: "From Greek 'dis-' (bad) + 'aster' (star) — an event caused by unfavorable stars",
        origin: "Greek"
    },

    // === ANIMALS ===
    {
        word: "porcupine",
        etymology: "From Latin 'porcus' (pig) + 'spina' (thorn) — literally 'thorny pig'",
        origin: "Latin"
    },
    {
        word: "hippopotamus",
        etymology: "From Greek 'hippos' (horse) + 'potamos' (river) — the ancient Greeks called it a 'river horse'",
        origin: "Greek"
    },
    {
        word: "dandelion",
        etymology: "From French 'dent de lion' (lion's tooth) — referring to the jagged leaves",
        origin: "French"
    },
    {
        word: "leopard",
        etymology: "From Greek 'leon' (lion) + 'pardos' (panther) — ancients thought it was a hybrid",
        origin: "Greek"
    },

    // === MUSIC & ART ===
    {
        word: "piano",
        etymology: "From Italian 'piano e forte' (soft and loud) — revolutionary because you could control volume",
        origin: "Italian"
    },
    {
        word: "tragedy",
        etymology: "From Greek 'tragos' (goat) — possibly from goat-skin costumes or goat sacrifices at festivals",
        origin: "Greek"
    },
    {
        word: "museum",
        etymology: "From Greek 'mouseion' — a shrine to the nine goddesses of arts and sciences",
        origin: "Greek"
    },
    {
        word: "orchestra",
        etymology: "From Greek 'orkhestra' — the semicircular space where the chorus danced in ancient theaters",
        origin: "Greek"
    },

    // === BUILDINGS & STRUCTURES ===
    {
        word: "palace",
        etymology: "From Latin 'Palatium' — one of Rome's seven hills where emperors built their homes",
        origin: "Latin"
    },
    {
        word: "pavilion",
        etymology: "From Latin 'papilio' (butterfly) — tent fabric flapping in the wind resembled wings",
        origin: "Latin"
    },
    {
        word: "window",
        etymology: "From Old Norse 'vindauga' — literally 'wind eye,' an opening for air and light",
        origin: "Norse"
    },
    {
        word: "corridor",
        etymology: "From Italian 'correre' (to run) — a passageway for moving quickly through a building",
        origin: "Italian"
    },

    // === GAMES & GAMBLING ===
    {
        word: "hazard",
        etymology: "From Arabic 'al-zahr' (the dice) — Crusaders brought back risky gambling games from the East",
        origin: "Arabic"
    },
    {
        word: "checkmate",
        etymology: "From Persian 'shāh māt' — literally 'the king is helpless' or 'the king is dead'",
        origin: "Persian"
    },
    {
        word: "trump",
        etymology: "From 'triumph' — a winning card that beats all others in certain games",
        origin: "English"
    },
    {
        word: "gambit",
        etymology: "From Italian 'gambetto' (tripping up) — a chess move that sacrifices a piece for advantage",
        origin: "Italian"
    },

    // === NAUTICAL ===
    {
        word: "buccaneer",
        etymology: "From French 'boucan' — a Caribbean wooden grill for smoking meat, used by early pirates",
        origin: "French"
    },
    {
        word: "filibuster",
        etymology: "From Spanish 'filibustero' (pirate) — now means blocking legislation by talking endlessly",
        origin: "Spanish"
    },
    {
        word: "maelstrom",
        etymology: "From Dutch 'malen' (to grind) + 'stroom' (stream) — a powerful whirlpool that grinds ships",
        origin: "Dutch"
    },
    {
        word: "admiral",
        etymology: "From Arabic 'amir al-' (commander of) — borrowed during medieval naval encounters",
        origin: "Arabic"
    },

    // === LEGAL ===
    {
        word: "verdict",
        etymology: "From Latin 'vere' (truly) + 'dictum' (said) — what is truly spoken by a jury",
        origin: "Latin"
    },
    {
        word: "alibi",
        etymology: "From Latin 'alibi' (elsewhere) — proof that you were somewhere else when a crime occurred",
        origin: "Latin"
    },
    {
        word: "culprit",
        etymology: "From abbreviated court French 'cul. prit.' — a clerk's shorthand for 'guilty, ready to prove'",
        origin: "French"
    },

    // === MADE-UP & COINED WORDS ===
    {
        word: "quiz",
        etymology: "Legend: a Dublin theater owner bet he could invent a word overnight by chalking it on walls citywide",
        origin: "English"
    },
    {
        word: "serendipity",
        etymology: "Coined by Horace Walpole from a Persian fairy tale — the art of making happy discoveries by accident",
        origin: "Persian"
    },
    {
        word: "robot",
        etymology: "From Czech 'robota' (forced labor) — coined in a 1920 play about artificial workers who rebel",
        origin: "Czech"
    },
    {
        word: "utopia",
        etymology: "Coined by Thomas More from Greek 'ou' (not) + 'topos' (place) — an ideal society that exists nowhere",
        origin: "Greek"
    },

    // === LINGUISTIC ODDITIES ===
    {
        word: "nickname",
        etymology: "From Middle English 'eke-name' (additional name) — 'an eke-name' was misheard over time",
        origin: "English"
    },
    {
        word: "apron",
        etymology: "From French 'naperon' — 'a naperon' was gradually misheard as 'an aperon'",
        origin: "French"
    },
    {
        word: "umpire",
        etymology: "From French 'nonper' (without equal) — 'a noumpere' was misheard as 'an oumpere'",
        origin: "French"
    },
    {
        word: "adder",
        etymology: "From Old English 'nædre' — 'a nadder' was misheard as 'an adder' over centuries",
        origin: "English"
    },

    // === MYTHOLOGY ===
    {
        word: "echo",
        etymology: "From a Greek nymph cursed by Hera to only repeat the last words others spoke to her",
        origin: "Greek"
    },
    {
        word: "narcissist",
        etymology: "From a Greek youth who fell in love with his own reflection in a pool and wasted away",
        origin: "Greek"
    },
    {
        word: "atlas",
        etymology: "From a Greek Titan condemned by Zeus to hold up the sky for eternity",
        origin: "Greek"
    },
    {
        word: "cereal",
        etymology: "From the Roman goddess of grain and harvest — farmers prayed to her for good crops",
        origin: "Latin"
    },
    {
        word: "martial",
        etymology: "From the Roman god of war — relating to military matters and combat",
        origin: "Latin"
    },

    // === NEW ADDITIONS - CLEANED UP ===
    {
        word: "aftermath",
        etymology: "From 'after' + 'math' (mowing) — the second growth of grass after the first harvest",
        origin: "English"
    },
    {
        word: "bedlam",
        etymology: "From the Hospital of St. Mary of Bethlehem in London — a notorious asylum for the mentally ill",
        origin: "English"
    },
    {
        word: "belfry",
        etymology: "From Old French 'berfrei' (movable siege tower) — now where church bells hang",
        origin: "French"
    },
    {
        word: "blackmail",
        etymology: "From Scottish 'mail' (rent, tribute) — protection money paid to Highland clan chiefs",
        origin: "Gaelic"
    },
    {
        word: "blurb",
        etymology: "Coined in 1907 by humorist Gelett Burgess — promotional text on book jackets",
        origin: "English"
    },
    {
        word: "brouhaha",
        etymology: "Possibly from Hebrew 'barukh habba' (blessed be he who comes) — a noisy commotion",
        origin: "Hebrew"
    },
    {
        word: "calculate",
        etymology: "From Latin 'calculus' (pebble) — Romans used small stones for counting and arithmetic",
        origin: "Latin"
    },
    {
        word: "cancel",
        etymology: "From Latin 'cancelli' (lattice, crossbars) — to mark out with crossed lines",
        origin: "Latin"
    },
    {
        word: "canter",
        etymology: "From Canterbury — the easy pace pilgrims rode when traveling to visit the famous cathedral",
        origin: "English"
    },
    {
        word: "captain",
        etymology: "From Latin 'caput' (head) — the head person, the leader of a group",
        origin: "Latin"
    },
    {
        word: "chapel",
        etymology: "From Latin 'cappa' (cloak) — where St. Martin's cloak was kept as a sacred relic",
        origin: "Latin"
    },
    {
        word: "charlatan",
        etymology: "From Italian 'ciarlare' (to chatter) — a quack who babbles about fake cures and remedies",
        origin: "Italian"
    },
    {
        word: "clinic",
        etymology: "From Greek 'kline' (bed) — originally medical teaching done at a patient's bedside",
        origin: "Greek"
    },
    {
        word: "clumsy",
        etymology: "From Middle English 'clumsed' (numb with cold) — stiff fingers make you awkward",
        origin: "English"
    },
    {
        word: "cobalt",
        etymology: "From German 'Kobold' (goblin) — miners blamed mischievous spirits for the troublesome ore",
        origin: "German"
    },
    {
        word: "coconut",
        etymology: "From Portuguese 'coco' (grinning face, goblin) — the three holes resemble a face",
        origin: "Portuguese"
    },
    {
        word: "comrade",
        etymology: "From Spanish 'camarada' (roommate) — someone who shares a chamber or sleeping quarters",
        origin: "Spanish"
    },
    {
        word: "constable",
        etymology: "From Latin 'comes stabuli' (count of the stable) — originally a high-ranking horse master",
        origin: "Latin"
    },
    {
        word: "copper",
        etymology: "From the Latin name for Cyprus — the Mediterranean island famous for this metal",
        origin: "Latin"
    },
    {
        word: "curfew",
        etymology: "From Old French 'couvre-feu' (cover fire) — the evening bell to extinguish all hearth fires",
        origin: "French"
    },
    {
        word: "cynic",
        etymology: "From Greek 'kynikos' (dog-like) — philosophers who lived simply, rejecting social conventions",
        origin: "Greek"
    },
    {
        word: "daisy",
        etymology: "From Old English 'dæges eage' (day's eye) — the flower that opens its petals at dawn",
        origin: "English"
    },
    {
        word: "glamour",
        etymology: "A Scottish corruption of 'grammar' — book learning was associated with magic spells",
        origin: "Gaelic"
    },
    {
        word: "gazette",
        etymology: "From Italian 'gazeta' — a small Venetian coin, the price of early newspapers",
        origin: "Italian"
    },
    {
        word: "groggy",
        etymology: "From 'Old Grog,' nickname of a British Admiral who diluted sailors' rum with water",
        origin: "English"
    },
    {
        word: "handicap",
        etymology: "From a 17th-century trading game 'hand-in-cap' — later used for equalizing horse races",
        origin: "English"
    },
    {
        word: "husband",
        etymology: "From Old Norse 'hus' (house) + 'bondi' (dweller) — the master of the household",
        origin: "Norse"
    },
    {
        word: "infantry",
        etymology: "From Latin 'infans' (youth) — young, inexperienced foot soldiers as opposed to cavalry",
        origin: "Latin"
    },
    {
        word: "journey",
        etymology: "From Old French 'journée' (a day) — originally how far you could travel in one day",
        origin: "French"
    },
    {
        word: "magazine",
        etymology: "From Arabic 'makhazin' (storehouses) — originally a storehouse, then a storehouse of information",
        origin: "Arabic"
    },
    {
        word: "mortgage",
        etymology: "From Old French 'mort' (death) + 'gage' (pledge) — the deal 'dies' when paid off",
        origin: "French"
    },
    {
        word: "noon",
        etymology: "From Latin 'nona hora' (ninth hour) — originally 3 PM, nine hours after monks rose at dawn",
        origin: "Latin"
    },
    {
        word: "orange",
        etymology: "From Sanskrit 'nāranga' — the fruit existed before the color name; people said 'yellow-red' before",
        origin: "Sanskrit"
    },
    {
        word: "pamphlet",
        etymology: "From a 12th-century Latin love poem 'Pamphilus' — widely copied on cheap paper",
        origin: "Latin"
    },
    {
        word: "peculiar",
        etymology: "From Latin 'pecus' (cattle) — originally meant 'one's own private property'",
        origin: "Latin"
    },
    {
        word: "purple",
        etymology: "From Latin 'purpura' — a shellfish Romans crushed to make expensive royal dye",
        origin: "Latin"
    },
    {
        word: "sandwich",
        etymology: "From the 4th Earl of S., who wanted to eat without leaving the gambling table",
        origin: "English"
    },
    {
        word: "sideburns",
        etymology: "From Civil War General Ambrose B., who wore distinctive facial hair — his name got reversed",
        origin: "English"
    },
    {
        word: "silhouette",
        etymology: "From Étienne de S., a French finance minister famous for his cheapness and shadow portraits",
        origin: "French"
    },
    {
        word: "sincere",
        etymology: "Possibly from Latin 'sine cera' (without wax) — honest sculptors didn't hide flaws with wax",
        origin: "Latin"
    },
    {
        word: "tawdry",
        etymology: "From 'St. Audrey's lace' — cheap lace sold at medieval fairs honoring this saint",
        origin: "English"
    },
    {
        word: "thesaurus",
        etymology: "From Greek 'thesauros' (treasury, storehouse) — a treasury of words and synonyms",
        origin: "Greek"
    },
    {
        word: "threshold",
        etymology: "From Old English — the board at a door that held in the 'thresh' (straw) on the floor",
        origin: "English"
    },
    {
        word: "trivial",
        etymology: "From Latin 'tri' (three) + 'via' (road) — common knowledge found where roads meet",
        origin: "Latin"
    },
    {
        word: "tuxedo",
        etymology: "From a country club in New York where this formal jacket was first worn in 1886",
        origin: "English"
    },
    {
        word: "umbrella",
        etymology: "From Italian 'ombra' (shade, shadow) — originally for sun protection, not rain",
        origin: "Italian"
    },
    {
        word: "vandal",
        etymology: "From the Germanic tribe that sacked Rome in 455 AD — destroyers of civilization",
        origin: "German"
    },
    {
        word: "wardrobe",
        etymology: "From Old French 'warder' (to guard) + 'robe' — a room for guarding clothes",
        origin: "French"
    },

    // === MORE NEW WORDS ===
    {
        word: "abracadabra",
        etymology: "Possibly from Aramaic 'avra kedavra' (I create as I speak) — a magician's incantation",
        origin: "Aramaic"
    },
    {
        word: "accolade",
        etymology: "From Latin 'ad' (to) + 'collum' (neck) — the embrace given when making someone a knight",
        origin: "Latin"
    },
    {
        word: "cabal",
        etymology: "From Hebrew 'qabbalah' (mystical tradition) — a secret political faction or conspiracy",
        origin: "Hebrew"
    },
    {
        word: "cadence",
        etymology: "From Latin 'cadere' (to fall) — the fall of the voice at a sentence's end",
        origin: "Latin"
    },
    {
        word: "carousel",
        etymology: "From Italian 'carosello' — originally a jousting tournament, later a merry-go-round",
        origin: "Italian"
    },
    {
        word: "caterpillar",
        etymology: "From Old French 'chatepelose' (hairy cat) — describing the fuzzy larva",
        origin: "French"
    },
    {
        word: "caucus",
        etymology: "Possibly from Algonquian 'caucauasu' (counselor) — a political meeting to select candidates",
        origin: "Algonquian"
    },
    {
        word: "chancellor",
        etymology: "From Latin 'cancellarius' — an official who stood at the latticed barrier in court",
        origin: "Latin"
    },
    {
        word: "chapter",
        etymology: "From Latin 'caput' (head) — a main division of a book, like a head of a body",
        origin: "Latin"
    },
    {
        word: "cockpit",
        etymology: "From the pit where roosters fought — now the compartment where pilots sit",
        origin: "English"
    },
    {
        word: "bonfire",
        etymology: "From 'bone fire' — medieval fires where bones were burned, not 'bon' (good) fire",
        origin: "English"
    },
    {
        word: "dachshund",
        etymology: "From German 'Dachs' (badger) + 'Hund' (dog) — bred to hunt animals in burrows",
        origin: "German"
    },
    {
        word: "fiasco",
        etymology: "From Italian 'fare fiasco' (make a bottle) — a flawed glass bottle that fails and breaks",
        origin: "Italian"
    },
    {
        word: "galore",
        etymology: "From Irish Gaelic 'go leór' — meaning 'to sufficiency' or 'plenty'",
        origin: "Gaelic"
    },
    {
        word: "goodbye",
        etymology: "A contraction of 'God be with ye' — first written down in the 1570s",
        origin: "English"
    },
    {
        word: "gossamer",
        etymology: "From Middle English 'goose summer' — the delicate webs seen floating in warm autumn air",
        origin: "English"
    },
    {
        word: "grotesque",
        etymology: "From Italian 'grotta' (cave) — bizarre paintings found in excavated Roman chambers",
        origin: "Italian"
    },
    {
        word: "gymnasium",
        etymology: "From Greek 'gymnos' (naked) — ancient Greeks exercised without clothing",
        origin: "Greek"
    },
    {
        word: "halcyon",
        etymology: "From Greek 'halkyon' (kingfisher) — the bird was said to calm seas during winter nesting",
        origin: "Greek"
    },
    {
        word: "havoc",
        etymology: "From Old French 'havot' — the cry to soldiers allowing them to plunder",
        origin: "French"
    },
    {
        word: "hearse",
        etymology: "From Latin 'hirpex' (large rake) — originally a candle-holding frame over coffins",
        origin: "Latin"
    },
    {
        word: "hermit",
        etymology: "From Greek 'eremos' (desert, solitude) — one who lives alone in the wilderness",
        origin: "Greek"
    },
    {
        word: "hooligan",
        etymology: "Possibly from an Irish family name in London — associated with rowdy behavior in the 1890s",
        origin: "Gaelic"
    },
    {
        word: "hypocrite",
        etymology: "From Greek 'hypokrites' — an actor on stage, one who wears a mask and pretends",
        origin: "Greek"
    },
    {
        word: "inoculate",
        etymology: "From Latin 'in' + 'oculus' (eye, bud) — originally a gardening term for grafting plants",
        origin: "Latin"
    },
    {
        word: "insult",
        etymology: "From Latin 'insultare' — to leap upon, to assault verbally",
        origin: "Latin"
    },
    {
        word: "janitor",
        etymology: "From Latin 'Janus' — the two-faced Roman god of doorways and beginnings",
        origin: "Latin"
    },
    {
        word: "jeopardy",
        etymology: "From Old French 'jeu parti' (divided game) — an evenly matched contest with uncertain outcome",
        origin: "French"
    },
    {
        word: "jubilee",
        etymology: "From Hebrew 'yobel' (ram's horn) — the trumpet blown to announce a year of freedom",
        origin: "Hebrew"
    },
    {
        word: "lackadaisical",
        etymology: "From 'lackaday' (alack the day!) — an expression of regret that became an attitude",
        origin: "English"
    },
    {
        word: "leotard",
        etymology: "From Jules L., a French trapeze artist who designed this tight-fitting garment",
        origin: "French"
    },
    {
        word: "lieutenant",
        etymology: "From French 'lieu' (place) + 'tenant' (holding) — one who holds the place of a superior",
        origin: "French"
    },
    {
        word: "limousine",
        etymology: "From a French region whose residents wore hooded cloaks — the covered car resembled one",
        origin: "French"
    },
    {
        word: "meander",
        etymology: "From a winding river in Turkey known to the ancient Greeks for its many curves",
        origin: "Greek"
    },
    {
        word: "mesmerize",
        etymology: "From Franz M., an 18th-century doctor who claimed to heal through 'animal magnetism'",
        origin: "German"
    },
    {
        word: "nightmare",
        etymology: "From Old English 'mare' — an evil spirit that sits on sleepers' chests causing bad dreams",
        origin: "English"
    },
    {
        word: "ostracize",
        etymology: "From Greek 'ostrakon' (pottery shard) — Athenians voted to exile citizens by writing names on broken pots",
        origin: "Greek"
    },
    {
        word: "pandemonium",
        etymology: "Coined by John Milton — the capital of Hell in Paradise Lost, meaning 'all demons'",
        origin: "Greek"
    },
    {
        word: "phony",
        etymology: "From 'fawney' — British slang for the fake gold rings con artists sold to the gullible",
        origin: "English"
    },
    {
        word: "plagiarize",
        etymology: "From Latin 'plagiarius' (kidnapper) — stealing someone's words as if kidnapping them",
        origin: "Latin"
    },
    {
        word: "prestige",
        etymology: "From Latin 'praestigiae' (illusions, juggler's tricks) — originally meant deception",
        origin: "Latin"
    },
    {
        word: "prodigy",
        etymology: "From Latin 'prodigium' (omen, portent) — an extraordinary person seen as a sign from the gods",
        origin: "Latin"
    },
    {
        word: "propaganda",
        etymology: "From a papal committee for 'propagating' the faith — spreading religious beliefs",
        origin: "Latin"
    },
    {
        word: "quarry",
        etymology: "From Latin 'cor' (heart) — originally the entrails given to hunting dogs as a reward",
        origin: "Latin"
    },
    {
        word: "sabotage",
        etymology: "From French 'sabot' (wooden shoe) — workers allegedly threw clogs into machinery",
        origin: "French"
    },
    {
        word: "scapegoat",
        etymology: "From the ancient Hebrew ritual — a goat symbolically loaded with sins and sent into the wilderness",
        origin: "Hebrew"
    },
    {
        word: "shambles",
        etymology: "From Old English 'scamol' (stool, counter) — originally a meat market's butcher tables",
        origin: "English"
    },
    {
        word: "sinister",
        etymology: "From Latin 'sinister' (left) — the left side was considered unlucky and evil",
        origin: "Latin"
    },
    {
        word: "stentorian",
        etymology: "From Stentor, a Greek herald in the Iliad whose voice was as loud as fifty men",
        origin: "Greek"
    },
    {
        word: "stoic",
        etymology: "From Greek 'stoa' (porch) — the colonnade in Athens where these philosophers taught",
        origin: "Greek"
    },
    {
        word: "tantrum",
        etymology: "Of unknown origin — possibly related to 'tarantism,' frenzied dancing after a spider bite",
        origin: "Italian"
    },
    {
        word: "trophy",
        etymology: "From Greek 'tropaion' — a monument of enemy armor at the spot where they turned and fled",
        origin: "Greek"
    },
    {
        word: "uncle",
        etymology: "From Latin 'avunculus' (mother's brother) — family terminology was very specific",
        origin: "Latin"
    },
    {
        word: "vengeance",
        etymology: "From Latin 'vindicare' (to claim, avenge) — related to 'vindicate'",
        origin: "Latin"
    },
    {
        word: "vernacular",
        etymology: "From Latin 'verna' (home-born slave) — the language spoken by common people at home",
        origin: "Latin"
    },
    {
        word: "zeal",
        etymology: "From Greek 'zelos' — intense enthusiasm, originally related to jealousy",
        origin: "Greek"
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
