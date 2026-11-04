/**
 * ==========================================================================
 * SANCTUARY - MUSIC VAULT DATABASE (music-data.js)
 * ==========================================================================
 */

const defaultMusicResources = [
    {
        "title": "prs-se-mark-holcomb-holcomb-burst",
        "category": "MAO - SITE",
        "url": "https://www.muziker.fr/prs-se-mark-holcomb-holcomb-burst-2022",
        "description": "prs-se-mark-holcomb-holcomb-burst"
    },
    {
        "title": "Chris Christodoulou - Once in a Lullaby",
        "category": "Guitare - Electrique",
        "url": "https://chordify.net/chords/chris-christodoulou-songs/once-in-a-lullaby-chords",
        "description": "Chris Christodoulou - Once in a Lullaby | ROR2: Survivors of the Void (2022) Accords - Chordify"
    },
    {
        "title": "TONEX - PRESET",
        "category": "MAO - PRESET",
        "url": "https://plugintorrent.com/alter-amp-works-mammoth-tonex-capture-pack-tonex/",
        "description": "Alter Amp Works – MAMMOTH Tonex Capture pack (TONEX) – Plugintorrent.com"
    },
    {
        "title": "Ukulélé Tablatures, partitions et accords",
        "category": "Guitare - Ukulele",
        "url": "https://www.ukulele-tabs.com/fr/",
        "description": "Ukulélé Tablatures, partitions et accords"
    },
    {
        "title": "Main Theme - Yooka-Laylee",
        "category": "Guitare - Ukulele",
        "url": "https://chordify.net/chords/main-theme-yooka-laylee-mariofan12ify",
        "description": "Main Theme - Yooka-Laylee Accords - Chordify"
    },
    {
        "title": "FFIX - UkeleDeChocobo.pdf",
        "category": "Guitare - Ukulele",
        "url": "http://ukesofhazzard.com/tabs/UkeleDeChocobo.pdf",
        "description": "UkeleDeChocobo"
    },
    {
        "title": "Metallica - Seek and Destroy",
        "category": "Guitare - Electrique",
        "url": "https://www.youtube.com/watch?v=z44pg4ETY3k",
        "description": "Metallica - Seek and Destroy - Guitar Tab | Lesson | Cover | Tutorial - YouTube"
    },
    {
        "title": "Clash On The Big Bridge - The Black Mages - FFV",
        "category": "Guitare - Electrique",
        "url": "https://www.songsterr.com/a/wsa/black-mages-clash-on-the-big-bridge-tab-s2647",
        "description": "Clash On The Big Bridge Tab by The Black Mages | Songsterr Tabs with Rhythm"
    },
    {
        "title": "FFXIV - Oblivion",
        "category": "Guitare - Electrique",
        "url": "https://www.songsterr.com/a/wsa/masayoshi-soken-oblivion-shiva-theme-ffxiv-ai-tab-s1374812",
        "description": "Oblivion Shiva Theme - FFXIV (AI) Tab by Masayoshi Soken | Songsterr Tabs with Rhythm"
    },
    {
        "title": "LIVE & LEARN - Crush 40",
        "category": "Guitare - Electrique",
        "url": "https://www.youtube.com/watch?v=AZbZAbpVcTc",
        "description": "HOW TO PLAY: LIVE & LEARN by Crush 40 (w/TAB) - YouTube"
    },
    {
        "title": "Otherworld - FFX",
        "category": "Guitare - Electrique",
        "url": "https://www.youtube.com/watch?v=sjG1tnzrg-E&list=RDsjG1tnzrg-E&start_radio=1",
        "description": "[TAB] Otherworld Guitar Cover [FINAL FANTASY X] - YouTube"
    },
    {
        "title": "Tutorial: Stairway to Heaven - entire",
        "category": "Guitare - Electrique",
        "url": "https://www.youtube.com/watch?v=lUlAO0QaVTA",
        "description": "Tutorial: Stairway to Heaven - w/ TAB (How to play the entire song) - YouTube"
    },
    {
        "title": "Stairway To Heaven - Led Zeppelin",
        "category": "Guitare - Electrique",
        "url": "https://www.youtube.com/watch?v=jPWT91lU4GA",
        "description": "Guitar Cover / Tab Stairway To Heaven&quot; by MLR-Guitar - YouTube"
    },
    {
        "title": "Led Zeppelin - Babe i'm Gonna Leave You",
        "category": "Guitare - Electrique",
        "url": "https://www.youtube.com/watch?v=zzCaKqSiiYg",
        "description": "Led Zeppelin - Babe i'm Gonna Leave You - Acoustic Finger Picking Guitar Lessons - YouTube"
    },
    {
        "title": "More Funk Chords",
        "category": "Guitare - Cours",
        "url": "http://www.youtube.com/watch?v=KtycOMOe6z8",
        "description": "More Funk Chords (Guitar Lesson RH-024) How to Play - YouTube"
    },
    {
        "title": "Basic Funk Chords (Guitar Lesson RH-021) How to play - YouTube",
        "category": "Guitare - Cours",
        "url": "http://www.youtube.com/watch?v=fMdU_lS3Izk",
        "description": "Aucune description."
    },
    {
        "title": "Nile Rodgers Giggin Tips",
        "category": "Guitare - Electrique",
        "url": "http://www.youtube.com/watch?feature=player_embedded&v=CF-XDf_jf5w",
        "description": "Nile Rodgers Giggin Tips - YouTube"
    },
    {
        "title": "Hades - The King and the Bull",
        "category": "Guitare - Electrique",
        "url": "https://www.youtube.com/watch?v=zmkTBldyOLE&ab_channel=Ariandel",
        "description": "Hades - The King and the Bull Ost Guitar Cover - YouTube"
    },
    {
        "title": "Million Miles Away - The Offspring",
        "category": "Guitare - Electrique",
        "url": "https://www.songsterr.com/a/wsa/offspring-million-miles-away-tab-s14741",
        "description": "Million Miles Away Tab by The Offspring | Songsterr Tabs with Rhythm"
    },
    {
        "title": "Kammthaar - Ultra Vomit",
        "category": "Guitare - Electrique",
        "url": "https://www.songsterr.com/a/wsa/ultra-vomit-kammthaar-tab-s436897t1",
        "description": "Kammthaar Tab by Ultra Vomit - Guitar Rythm (Fetus) - Overdriven Guitar | Songsterr Tabs with Rhythm"
    },
    {
        "title": "Know Your Enemy - Rage Against The Machine",
        "category": "Guitare - Electrique",
        "url": "https://www.songsterr.com/a/wsa/rage-against-the-machine-know-your-enemy-tab-s695",
        "description": "Know Your Enemy Tab by Rage Against The Machine | Songsterr Tabs with Rhythm"
    },
    {
        "title": "The Hell Song - Sum 41",
        "category": "Guitare - Electrique",
        "url": "https://www.songsterr.com/a/wsa/sum-41-the-hell-song-tab-s18803t1",
        "description": "The Hell Song Tab by Sum 41 - Rhythm Guitar - Overdriven Guitar"
    },
    {
        "title": "Pain For Pleasure - Sum 41",
        "category": "Guitare - Electrique",
        "url": "https://www.songsterr.com/a/wsa/sum-41-pain-for-pleasure-tab-s542",
        "description": "Pain For Pleasure Tab by Sum 41 | Songsterr Tabs with Rhythm"
    },
    {
        "title": "Evier metal - Ultra Vomit",
        "category": "Guitare - Electrique",
        "url": "https://www.songsterr.com/a/wsa/ultra-vomit-evier-metal-tab-s455081",
        "description": "Evier metal Tab by Ultra Vomit | Songsterr Tabs with Rhythm"
    },
    {
        "title": "Red Hot Chili Peppers - Snow (Hey Oh)",
        "category": "Guitare - Electrique",
        "url": "https://www.youtube.com/watch?v=JzRDZ69RHs0&ab_channel=NikolaGugoski",
        "description": "Red Hot Chili Peppers - Snow (Hey Oh) (Guitar lesson with TAB) - YouTube"
    },
    {
        "title": "Final Fantasy VII - Costa del Sol",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/zhi-song-shen-fu-songs/tai-yangno-hai-an-chords?version=youtube:xretuG05rug",
        "description": "Final Fantasy VII OST - Costa del Sol Accords - Chordify"
    },
    {
        "title": "Final Fantasy IX- Frontier Village Dali",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/zhi-song-shen-fu-songs/bian-jingno-cun-dari-village-of-dali-chords?version=youtube:VyTQ3sQ713E",
        "description": "Final Fantasy IX OST - Frontier Village Dali Accords - Chordify"
    },
    {
        "title": "Zelda Breath of the Wild: Rito Village - Classic",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/rito-village-zelda-totk-botw-classical-guitar-cover-john-oeth-guitar",
        "description": "Rito Village | Classical Guitar Cover Accords - Chordify"
    },
    {
        "title": "Lorien Testard - Aux Lendemains non Écrits Accords",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/fr/chords/lorien-testard-alice-duport-percier-songs/aux-lendemains-non-ecrits-chords",
        "description": "Lorien Testard - Aux Lendemains non Écrits Accords - Chordify"
    },
    {
        "title": "Geralt of Rivia - The Witcher 3: Wild Hunt",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/geralt-of-rivia-main-theme-the-witcher-3-wild-hunt-on-guitar-isac-saleh",
        "description": "Geralt of Rivia - The Witcher 3: Wild Hunt on Guitar Accords - Chordify"
    },
    {
        "title": "FFIX - The Sanctuary of Zi'Tah",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/shui-tian-zhi-zhi-songs/the-sanctuary-of-zi-tah-chords?version=youtube%3AsmJrVboIOjA",
        "description": "Naoshi Mizuta - The Sanctuary of Zi'Tah Accords - Chordify"
    },
    {
        "title": "Roundabout Intro - Yes",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=6DQsvMT6-ms",
        "description": "Learn Roundabout Intro - Yes - Acoustic Guitar Lesson - YouTube"
    },
    {
        "title": "Tenacious D - Tribute",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/tenacious-d-songs/tribute-2-chords",
        "description": "Tenacious D - Tribute Accords - Chordify"
    },
    {
        "title": "Sea of Thieves - Grogg Mayles",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=r3j0ZbwzpCY",
        "description": "Sea of Thieves - Grogg Mayles (Classical Guitar Cover + Tabs) - YouTube"
    },
    {
        "title": "Hades - Good Riddance",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=dnq8dZYH_tg",
        "description": "Hades - Good Riddance - YouTube"
    },
    {
        "title": "FFV - Home, Sweet Home",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/zhi-song-shen-fu-songs/harukanaru-gu-xiang-3-chords?version=youtube:xevXndEHzyo",
        "description": "Home, Sweet Home Accords - Chordify"
    },
    {
        "title": "Cliffland - Octopath Traveller",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/xi-mu-kang-zhi-songs/kurifurando-de-fang-chords?version=youtube:OpLrvrf3CF0",
        "description": "Yasunori Nishiki - クリフランド地方 Accords - Chordify"
    },
    {
        "title": "Blade's Exaltation (FFXIV: Dawntrail)",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/battle-theme-ffxiv-dawntrail-classical-guitar-cover-john-oeth-guitar",
        "description": "Blade's Exaltation (FFXIV: Dawntrail) | Classical Guitar Cover Accords - Chordify"
    },
    {
        "title": "The Binding of Isaac: Antibirth - Journey from a Jar to the Sky",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/mudeth-songs/journey-from-a-jar-to-the-sky-chords",
        "description": "The Binding of Isaac: Antibirth OST Journey from a Jar to the Sky Accords - Chordify"
    },
    {
        "title": "Witchyworld [Banjo-Tooie]",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/grant-kirkhope-witchyworld-banjo-tooie-ppf",
        "description": "Grant Kirkhope - Witchyworld [Banjo-Tooie] Accords - Chordify"
    },
    {
        "title": "Sea of Thieves - We Shall Sail Together",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/sea-of-thieves-we-shall-sail-together-pirate-legend-theme-classical-guitar-cover-seth-wilkins",
        "description": "Sea of Thieves - We Shall Sail Together Accords - Chordify"
    },
    {
        "title": "Stitchers Sorrow - Sea of Thieves",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/stitchers-sorrow-on-guitar-sea-of-thieves-theme-song-cover-mark-haggerty",
        "description": "Stitchers Sorrow on GUITAR - Sea of Thieves theme song cover Accords - Chordify"
    },
    {
        "title": "Song of Healing - The Legend of Zelda",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=T318FqWOVP8&ab_channel=HarleyGuioGuitar",
        "description": "Song of Healing - The Legend of Zelda - Fingerstyle Guitar Tutorial + TAB - YouTube"
    },
    {
        "title": "Melodies of Life - FFIX",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=oLHDbruVjQg",
        "description": "Melodies of Life's from Final Fantasy IX (acoustic guitar solo) - YouTube"
    },
    {
        "title": "FFX To Zanarkand",
        "category": "Guitare - Accoustique",
        "url": "http://www.youtube.com/watch?v=tQtHR_xDmuc&list=RD02-e8Zeq7ieAE",
        "description": "FFX To Zanarkand - YouTube"
    },
    {
        "title": "FFX Sight of Spira",
        "category": "Guitare - Accoustique",
        "url": "http://www.youtube.com/watch?v=dcGpiO7h9-Y&list=RD02-e8Zeq7ieAE",
        "description": "FFX Sight of Spira - YouTube"
    },
    {
        "title": "FINAL FANTASY 5 - Home sweet home",
        "category": "Guitare - Accoustique",
        "url": "http://www.youtube.com/watch?v=ROKxq873MGw",
        "description": "FINAL FANTASY 5 「はるかなる故郷」 (My home,Sweet home) - YouTube"
    },
    {
        "title": "FFVIII Breezy",
        "category": "Guitare - Accoustique",
        "url": "http://www.youtube.com/watch?v=sLva2LVyZVA",
        "description": "FFVIII Breezy - YouTube"
    },
    {
        "title": "FFIX You're Not Alone",
        "category": "Guitare - Accoustique",
        "url": "http://www.youtube.com/watch?v=-e8Zeq7ieAE",
        "description": "FFIX You're Not Alone - YouTube"
    },
    {
        "title": "Melodies of Life FFIX",
        "category": "Guitare - Accoustique",
        "url": "http://www.youtube.com/watch?v=f4RmIqNZc4I&playnext=1&list=PL904764D55CB612BE&feature=results_video",
        "description": "Melodies of Life FFIX - YouTube"
    },
    {
        "title": "FFVI Searching Friends",
        "category": "Guitare - Accoustique",
        "url": "http://www.youtube.com/watch?v=0ytTyMGbDZA&list=PL904764D55CB612BE",
        "description": "FFVI Searching Friends - YouTube"
    },
    {
        "title": "Melodies of Life's from Final Fantasy IX",
        "category": "Guitare - Accoustique",
        "url": "http://www.youtube.com/watch?v=oLHDbruVjQg",
        "description": "Melodies of Life's from Final Fantasy IX (acoustic guitar solo) - YouTube"
    },
    {
        "title": "Final Fantasy VII - Costa Del Sol",
        "category": "Guitare - Accoustique",
        "url": "https://www.songsterr.com/a/wsa/nobuo-uematsu-costa-del-sol-tab-s48928",
        "description": "Costa Del Sol Tab by Nobuo Uematsu | Songsterr Tabs with Rhythm"
    },
    {
        "title": "The Price of Freedom, Crisis Core: Final Fantasy VII",
        "category": "Guitare - Accoustique",
        "url": "https://www.gametabs.net/tabs/crisis-core-final-fantasy-vii/the-price-of-freedom",
        "description": "Gametabs | The Price of Freedom, Crisis Core: Final Fantasy VII | Zelos"
    },
    {
        "title": "Blade's Exaltation (FFXIV Dawntrail Battle Theme)",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=vvRiUgYDu-Q&ab_channel=AntonBetita",
        "description": "Blade's Exaltation (FFXIV Dawntrail Battle Theme) | Fingerstyle Guitar - YouTube"
    },
    {
        "title": "Glitter Gulch Mine [Banjo-Tooie]",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/grant-kirkhope-glitter-gulch-mine-banjo-tooie-ppf",
        "description": "Grant Kirkhope - Glitter Gulch Mine [Banjo-Tooie] Accords - Chordify"
    },
    {
        "title": "Octopath Traveler - The Cliftlands",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/xi-mu-kang-zhi-songs/kurifurando-de-fang-chords",
        "description": "Octopath Traveler - The Cliftlands Accords - Chordify"
    },
    {
        "title": "Glitter Gulch Mine - Banjo Tooie",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=G5QnnPwDFFQ&ab_channel=gabocarina96",
        "description": "Glitter Gulch Mine - Banjo Tooie (Acoustic Cover) | Gabocarina96 - YouTube"
    },
    {
        "title": "Chaos Temple (Final Fantasy)",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=kYhZLpQun4Y&ab_channel=AnggarNegarawanPasaribu",
        "description": "Guitar Tab - Chaos Temple (Final Fantasy) OST Fingerstyle Tutorial Sheet Lesson #Anp - YouTube"
    },
    {
        "title": "Wild Arms - To The End Of The Wilderness -To a New Journey",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/michiko-naruke-to-the-end-of-the-wilderness-to-a-new-journey-therealness000",
        "description": "Michiko Naruke - To The End Of The Wilderness -To a New Journey- Accords - Chordify"
    },
    {
        "title": "Wild Arms - Alone in the World,",
        "category": "Guitare - Accoustique",
        "url": "https://www.gametabs.net/tabs/wild-arms/alone-in-the-world",
        "description": "Gametabs | Alone in the World, Wild Arms | Jack the Cow"
    },
    {
        "title": "The Witcher - TOSS A COIN TO YOUR WITCHER",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=dF7g8TnvvaI&ab_channel=AndyGuitar",
        "description": "TOSS A COIN TO YOUR WITCHER Guitar Lesson Tutorial How to play - YouTube"
    },
    {
        "title": "Final Fantasy VI OST - Shadow's theme Accords",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/zhi-song-shen-fu-songs/shadounotema-chords",
        "description": "Final Fantasy VI OST - Shadow's theme Accords - Chordify"
    },
    {
        "title": "Zelda Breath of the Wild: Rito Village",
        "category": "Guitare - Accoustique",
        "url": "https://chordify.net/chords/zelda-breath-of-the-wild-rito-village-fingerstyle-guitar-cover-tab-tomokiye-guitar",
        "description": "Zelda Breath of the Wild: Rito Village - Fingerstyle Guitar Cover【TAB】 Accords - Chordify"
    },
    {
        "title": "THE LEGEND OF ZELDA OCARINA OF TIME - KAKARIKO VILLAGE",
        "category": "Guitare - Accoustique",
        "url": "https://tabs.ultimate-guitar.com/tab/misc-computer-games/the-legend-of-zelda-ocarina-of-time-kakariko-village-chords-2860730",
        "description": "THE LEGEND OF ZELDA OCARINA OF TIME - KAKARIKO VILLAGE CHORDS by Misc Computer Games"
    },
    {
        "title": "Gears- DRAGONFORCE",
        "category": "MAO - PRESET",
        "url": "https://www.uberproaudio.com/who-plays-what/148-dragonforce-herman-li-guitar-gear-rig-and-equipment",
        "description": "Dragonforce - Herman Li Guitar Gear Rig and Equipment"
    },
    {
        "title": "Guitar Rig",
        "category": "MAO - PRESET",
        "url": "https://www.native-instruments.com/en/community/user-libraries/guitar-rig/",
        "description": "User Libraries : Guitar Rig | Community"
    },
    {
        "title": "AudioZ - Tapping Method TUTORiAL",
        "category": "Guitare - Cours",
        "url": "https://audioz.download/tutorials/285037-download_dan-mumm-the-infinite-tapping-method-tutorial.html",
        "description": "Download Dan Mumm The Infinite Tapping Method TUTORiAL » AudioZ"
    },
    {
        "title": "Picking",
        "category": "Guitare - Cours",
        "url": "https://www.youtube.com/watch?v=fvq-BtbsVnQ",
        "description": "Le picking pour débutant. - YouTube"
    },
    {
        "title": "Son Metal",
        "category": "Guitare - Cours",
        "url": "https://loudguitar.fr/son-metal-comment-faire-un-gros-son-de-guitare/",
        "description": "Son Metal : Comment Faire Un Gros Son de Guitare ?"
    },
    {
        "title": "Cours - anais-bazoge",
        "category": "Guitare - Cours",
        "url": "https://anais-bazoge.teachable.com/courses",
        "description": "Anaïs Bazoge"
    },
    {
        "title": "La Chelousphere",
        "category": "Guitare - Cours",
        "url": "https://lachelousphere.com/mon-compte/telechargements/",
        "description": "Mon compte 🎸 La Chelousphère"
    },
    {
        "title": "Accessoires",
        "category": "Guitare - Entretiens",
        "url": "https://www.youtube.com/watch?v=raVYm3F63yM&ab_channel=FlorentGarcia",
        "description": "Les accessoires les PLUS UTILES pour guitariste - YouTube"
    },
    {
        "title": "Manche",
        "category": "Guitare - Entretiens",
        "url": "https://www.youtube.com/watch?v=-5_7JeW7NnQ&ab_channel=PIRATECUSTOMGUITAR",
        "description": "comment PRENDRE SOIN de son MANCHE ! le tuto complet - YouTube"
    },
    {
        "title": "Cambridge Music Technology",
        "category": "MAO - Lesson",
        "url": "https://cambridge-mt.com/",
        "description": "Cambridge Music Technology"
    },
    {
        "title": "SoundGym",
        "category": "MAO - Lesson",
        "url": "https://www.soundgym.co/",
        "description": "SoundGym | Audio Ear Training Online"
    },
    {
        "title": "Ambient Sounds",
        "category": "MAO - GUIDE (FX & Sound Design)",
        "url": "https://mynoise.net/",
        "description": "Background Noises • Ambient Sounds • Relaxing Music | myNoise ®"
    },
    {
        "title": "Mixing Secrets",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://archive.org/details/mixing-secrets/Mixing%20Secrets/mode/1up",
        "description": "Mixing Secrets by Mike Senior 2011 : Mike Senior : Free Download, Borrow, and Streaming : Internet Archive"
    },
    {
        "title": "Ableton - ROAR",
        "category": "MAO - DAW",
        "url": "https://www.ableton.com/fr/blog/roar-meet-live-12s-new-processing-powerhouse/",
        "description": "Roar: la nouvelle centrale de traitement de Live 12 | Ableton"
    },
    {
        "title": "Projet Home Studio - Probleme interface",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://www.projethomestudio.fr/craquements-interface-audio/",
        "description": "Craquements, Interfaces Audio : Comment Régler ces Problèmes ? | Projet Home Studio"
    },
    {
        "title": "Drum Rack",
        "category": "MAO - GUIDE (FX & Sound Design)",
        "url": "https://www.francisbaconnet.com/comment-exploiter-pleinement-le-drum-rack/",
        "description": "Comment exploiter à 100% le Drum Rack"
    },
    {
        "title": "Quels INSTRUMENTS Créer EN PREMIER Dans un Morceau",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://la-guerre-des-potards.com/production-musicale-instruments-morceau/#:~:text=%E2%80%93%20Le%20kick%20(pr%C3%A9sent%20sur%20chaque,caisses%20claires%2C%20cymbales%E2%80%A6).",
        "description": "Production Musicale - Quels INSTRUMENTS Créer EN PREMIER Dans un Morceau ?"
    },
    {
        "title": "Ordre Comp & EQ",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://www.projethomestudio.fr/egaliseur-compression-dans-quel-ordre/",
        "description": "EQ et Compression : Dans Quel Ordre ? | Projet Home Studio"
    },
    {
        "title": "Professor EQ",
        "category": "MAO - GUIDE (EQ)",
        "url": "https://www.projethomestudio.fr/professeurEQ/",
        "description": "ProfesseurEQ | Projet Home Studio"
    },
    {
        "title": "Blogs Synthctrl",
        "category": "MAO - GUIDE (Styles & Themes)",
        "url": "https://synthctrl.com/blogs/blog/carpenter-brut-techno-killer-breakdown",
        "description": "Carpenter Brut Turbo Killer Breakdown – Synth Ctrl"
    },
    {
        "title": "SONGBPM",
        "category": "MAO - GUIDE (Styles & Themes)",
        "url": "https://songbpm.com/searches/dc4ac958-b9d4-4fdb-b87c-39370168f3dc",
        "description": "BPM and key for hollywood burns | SongBPM | songbpm.com"
    },
    {
        "title": "SONGBPM",
        "category": "MAO - GUIDE (Styles & Themes)",
        "url": "https://songbpm.com/@carpenter-brut",
        "description": "BPM and key for songs by Carpenter Brut | Tempo for Carpenter Brut songs | SongBPM | songbpm.com"
    },
    {
        "title": "Comment écrire des progressions d'accords sombres",
        "category": "MAO - GUIDE (Styles & Themes)",
        "url": "https://musiversal.com/blog/learn-dark-chord-progressions#:~:text=A%20simple%20trick%20to%20make,chord%20with%20the%20same%20root.&text=While%20this%20works%20great%20as,really%20emphasize%20the%20minor%20chord.",
        "description": "Comment écrire des progressions d'accords sombres : Guide du producteur de musique pour créer des atmosphères effrayantes"
    },
    {
        "title": "Audiofanzine - Mastering",
        "category": "MAO - GUIDE (Mastering)",
        "url": "https://fr.audiofanzine.com/mastering/editorial/dossiers/tout-sur-le-home-mastering.html",
        "description": "Synthèse de notre série sur le mastering en home studio - Audiofanzine"
    },
    {
        "title": "Ozone - IZOTOPE",
        "category": "MAO - GUIDE (Mastering)",
        "url": "https://fr.audiofanzine.com/suite-logicielle-de-mastering/izotope/ozone-11-advanced/editorial/tests/test-d-izotope-ozone-advanced-11.html",
        "description": "Test d’Izotope Ozone Advanced 11 : Retour du magicien d’Ozone - Audiofanzine"
    },
    {
        "title": "Comp - OTT",
        "category": "MAO - GUIDE (Compresseur)",
        "url": "https://www.productionmusiclive.com/blogs/news/explained-ott-compressor?srsltid=AfmBOorRqkGAjL1f37ZQJN__Yxv50dmTWgw3wuSg3OrAFvDAAGWmC0ks",
        "description": "Explication : compresseur OTT (et comment l'utiliser)"
    },
    {
        "title": "Comp - Sidechain",
        "category": "MAO - GUIDE (Compresseur)",
        "url": "https://www.projethomestudio.fr/sidechain/",
        "description": "Sidechain : le Guide Complet | Projet Home Studio"
    },
    {
        "title": "Comp Glue",
        "category": "MAO - GUIDE (Compresseur)",
        "url": "https://www.projethomestudio.fr/compression-glue-sonore/",
        "description": "Mixage & Glue Sonore : C'est Quoi, Concrètement ? | Projet Home Studio"
    },
    {
        "title": "Compression Multibande",
        "category": "MAO - GUIDE (Compresseur)",
        "url": "https://www.projethomestudio.fr/compression-multibande/#:~:text=C'est%20l%C3%A0%20qu'arrive,chacune%20pouvant%20%C3%AAtre%20compress%C3%A9e%20ind%C3%A9pendamment.",
        "description": "Compression Multibande : Faites Comme les Pros ! | Projet Home Studio"
    },
    {
        "title": "L 2 - Fabfilter",
        "category": "MAO - GUIDE (Compresseur)",
        "url": "https://www.projethomestudio.fr/tests/plugin-fabfilter-pro-l-2/",
        "description": "Test Plugin : Le Limiteur Pro-L 2 de Fabfilter | Projet Home Studio"
    },
    {
        "title": "Réglé son compresseur",
        "category": "MAO - GUIDE (Compresseur)",
        "url": "https://www.projethomestudio.fr/reglages-compresseur-audio/",
        "description": "Réglage d'un Compresseur Audio (Expliqué Simplement) | Projet Home Studio"
    },
    {
        "title": "5 Types de Compresseurs",
        "category": "MAO - GUIDE (Compresseur)",
        "url": "https://deveniringeson.com/5-types-de-compression-audio",
        "description": "deveniringeson.com/5-types-de-compression-audio"
    },
    {
        "title": "Copresseur avis - Projet Home Studio",
        "category": "MAO - GUIDE (Compresseur)",
        "url": "https://www.projethomestudio.fr/compresseur-audio-analogique/",
        "description": "5 Compresseurs Audio Analogiques à Connaître Absolument ! | Projet Home Studio"
    },
    {
        "title": "Mix Tuto",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://www.musicguymixing.com/audio-mixing-tutorials/",
        "description": "Audio Mixing Tutorials - Music Guy Mixing"
    },
    {
        "title": "EQ Guitar Elec",
        "category": "MAO - GUIDE (EQ)",
        "url": "ps://www.musicguymixing.com/category/electric-guitar/",
        "description": "Electric Guitar Archives - Music Guy Mixing"
    },
    {
        "title": "EQ HI HATS",
        "category": "MAO - GUIDE (EQ)",
        "url": "https://www.musicguymixing.com/hi-hat-eq/",
        "description": "The Best Hi Hat EQ Settings - Music Guy Mixing"
    },
    {
        "title": "EQ Guide",
        "category": "MAO - GUIDE (EQ)",
        "url": "https://www.projethomestudio.fr/eq-egalisation/",
        "description": "EQ : Comment Utiliser un Egaliseur ? | Projet Home Studio"
    },
    {
        "title": "EQ Kick",
        "category": "MAO - GUIDE (EQ)",
        "url": "https://www.projethomestudio.fr/reglages-egalisation-grosse-caisse/",
        "description": "Comment Egaliser une Grosse Caisse (Kick) ? | Projet Home Studio"
    },
    {
        "title": "EQ Best settings",
        "category": "MAO - GUIDE (EQ)",
        "url": "https://emastered.com/fr/blog/best-equalizer-settings",
        "description": "Les meilleurs réglages de l'égaliseur : Le guide définitif"
    },
    {
        "title": "Basses Fréquences dans le Mixage",
        "category": "MAO - GUIDE (EQ)",
        "url": "https://www.monter-son-home-studio.fr/finalisation-mixage-et-mastering/108-maitriser-les-basses-frequences-dans-le-mixage.html",
        "description": "Maitriser les Basses Fréquences dans le Mixage - Monter son Home Studio"
    },
    {
        "title": "Panoramique audio",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://emastered.com/fr/blog/audio-panning",
        "description": "Qu'est-ce que le panoramique audio et comment l'utiliser dans votre musique ?"
    },
    {
        "title": "Audiofanzine - guide du mixage audio",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://fr.audiofanzine.com/prise-de-son-mixage/editorial/dossiers/sommaire-des-principaux-chapitres.html",
        "description": "Sommaire des principaux chapitres du guide du mixage audio sur MAO en home studio - Audiofanzine"
    },
    {
        "title": "Limiteur, Soft et Hard Clipper",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://www.projethomestudio.fr/difference-clipper-limiteur",
        "description": "Limiteur, Soft et Hard Clipper : Quelle Différence ? | Projet Home Studio"
    },
    {
        "title": "Audiofanzine - Mixage",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://fr.audiofanzine.com/prise-de-son-mixage/editorial/dossiers/programme-de-mixage-en-12-etapes.html",
        "description": "12 conseils pour un mixage audio réussi en home studio - Audiofanzine"
    },
    {
        "title": "Guide du mixage",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://www.homelyrecords.com/blog/categories/guidedumixage",
        "description": "Guide du mixage"
    },
    {
        "title": "Apprendre le Home Studio",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://apprendre-le-home-studio.fr/comment-bien-mixer-ta-musique-au-home-studio-le-guide-complet-en-5-etapes/",
        "description": "Mixage audio: le guide complet en 5 étapes | Apprendre le Home Studio"
    },
    {
        "title": "landr - comment-mixer-sa-musique",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://www.landr.com/fr/comment-mixer-sa-musique/",
        "description": "Mixer sa musique : Le bon guide pour sonner comme un pro"
    },
    {
        "title": "Mixage et Mastering Audio - Differences",
        "category": "MAO - GUIDE (Outils)",
        "url": "https://www.projethomestudio.fr/definition-mixage-mastering/#:~:text=le%20mixage%2C%20qui%20m%C3%A9lange%20plusieurs,'%C3%A9chelle%20de%20l'album.",
        "description": "Mixage et Mastering Audio : Quelle Différence ? | Projet Home Studio"
    },
    {
        "title": "Audiofanzine - Avant Mix",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://fr.audiofanzine.com/prise-de-son-mixage/editorial/dossiers/mise-a-plat-premiere-partie.html",
        "description": "Avant de mixer votre projet en MAO en home studio, faites une mise à plat - Audiofanzine"
    },
    {
        "title": "ShortCut Ableton",
        "category": "MAO - DAW",
        "url": "https://emastered.com/fr/blog/ableton-live-shortcuts",
        "description": "100+ Raccourcis Ableton Live pour accélérer les choses"
    },
    {
        "title": "Packs Ableton",
        "category": "MAO - DAW",
        "url": "https://www.ableton.com/fr/packs/sequencers/",
        "description": "Sequencers | Ableton"
    },
    {
        "title": "Kontakt - « Library not found »",
        "category": "MAO - DAW",
        "url": "https://www.milongamusic.com/contourner-lerreur-library-not-found-kontakt/",
        "description": "Contourner l’erreur « Library not found » dans Kontakt"
    },
    {
        "title": "Ableton shortcuts",
        "category": "MAO - DAW",
        "url": "https://www.ableton.com/fr/manual/live-keyboard-shortcuts/",
        "description": "Raccourcis-clavier de Live — Ableton Reference Manual Version 11 | Ableton"
    },
    {
        "title": "samplefocus",
        "category": "MAO - GUIDE (FX & Sound Design)",
        "url": "https://samplefocus.com/categories/vocals",
        "description": "Free Vocals samples, sounds, and loops | Sample Focus"
    },
    {
        "title": "Séquenceur Hyperion",
        "category": "MAO - PLUGIN & VST",
        "url": "https://www.soundonsound.com/reviews/wavesequencer-hyperion",
        "description": "Séquenceur d'ondes Hyperion"
    },
    {
        "title": "SoundToys",
        "category": "MAO - PLUGIN & VST",
        "url": "https://fr.audiofanzine.com/plugin/soundtoys/",
        "description": "Effets et traitements logiciels Soundtoys"
    },
    {
        "title": "lalal ia",
        "category": "MAO - GUIDE (Outils)",
        "url": "https://www.lalal.ai/fr/?gad_source=1&gad_campaignid=18569033667&gbraid=0AAAAACTgyH0Lxhw9nczXZfaBYvR7G0VGl&gclid=Cj0KCQjwwZDFBhCpARIsAB95qO1YmdRz-Q5Qynn19lR2ageS4hApnKfPUMXu4XBvvrZZHZDQAPmfZqQaAuB3EALw_wcB",
        "description": "Suppresseur vocal & Séparateur IA instrumental | LALAL.AI"
    },
    {
        "title": "Songs With The Same Chords",
        "category": "MAO - GUIDE (Outils)",
        "url": "https://www.hooktheory.com/trends#",
        "description": "Songs With The Same Chords"
    },
    {
        "title": "Frequence notes",
        "category": "MAO - GUIDE (Outils)",
        "url": "http://jeanjacques.dialo.free.fr/frequenc.htm",
        "description": "Frequence notes"
    },
    {
        "title": "AI Melody Generator",
        "category": "MAO - GUIDE (Outils)",
        "url": "https://dopeloop.ai/melody-generator/?source=korben.info",
        "description": "AI Melody Generator"
    },
    {
        "title": "LoopShelter",
        "category": "MAO - GUIDE (Outils)",
        "url": "https://loopshelter.com/",
        "description": "LoopShelter"
    },
    {
        "title": "BasicPitch",
        "category": "MAO - GUIDE (Outils)",
        "url": "https://basicpitch.spotify.com/",
        "description": "Basic Pitch: An open source MIDI converter from Spotify - Demo"
    },
    {
        "title": "Générer des mélodie",
        "category": "MAO - GUIDE (Outils)",
        "url": "https://korben.info/generer-melodies-midi.html",
        "description": "Comment générer des mélodies qui restent dans la tête ? | Insolite | Le site de Korben"
    },
    {
        "title": "Waves Ulitmates",
        "category": "MAO - PLUGIN & VST",
        "url": "https://plugintorrent.com/waves-ultimate-v2024-11-29-r2r-vst-vst3-aax-win-x64/\" ADD_DATE=\"1733687490\" ICON=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADYElEQVR4nEyTXWhcVRDHZ87H3r3Z7qZJbYhpmzb1m6aVupiPPljyYBVUIlX6VFoEET8oUhBERWh96KOtotggYlAxtA+iESUiaKXWBiMJ+agFU2nNNg3ZDdm4ye7de+85Z5yNbcmBy+EyZ+Y/85sZBTcPASDyNXhfR5vU6rBC6gGiNkQUDmDGCjwfRtHn+y//MQVrDq79GWrvflUKfDMD2BQRwcpNax1H9zn8v0QlR+7kY1PDx//X5ADHAAR/7rsdnR80au+V0MYwqpUZ8z2RVwpreTU5ovYgcNlqpNJKQdHGZ7yJ4YO/sJ88x5G+b+96qUF7x1dsHJ9N18G39WmV95NYEQKWnIPpOMLxpCcXE9q1BUG8QSUeXNrYjC/kZ3/Coa3ZO20mMb4eYMOZVJJ+rM/IDBFVq1VQOoFbWpphb3cnpPwknRw4i93LgTu0UqYAILIm7lBxWh5sRLHxigBzcV2dTHPKURzjM71PwqED+2Hr5k2rHCYv/Yni9Mc0kkphNtKUja1fkPJ5BSh6NOOe9DwMpII0q0fM5pGuDpjJ5eD0J/0wNjEJz/Y+BZ5WWFguwYTWsDs2DFHsrVFqDZl4UUqsEWPKq825NpODUx9+BFf57szuBs1OqxZr6YaxWCEBEqhVOOfwdjeRIDYGGurTkEhoEAzxxNtvwODAZ9D+wP0QRREIlmE97iGhAxLCAF332L+RHJUrAT39+KP0VX8f7Hk4C0FQhc0tLeB5HuQXFiAKQ3BC4B3sn0JBxkFOBSY+b6TetzM0NMhx773nLlyfycB8vsDZxHDi3ffgt5ERuDD8OxeIpFh+F0vzwGFA5le5SydnMn7q8BYCvySQvs5dx+KNOej/4kuYLyxgyKqjo+MQhxGVtcau2FIvV1+01lxZLh2R51aWlnrqG12T5++72xgzV6mIgckpMVvIo5KSUDIs34dQALfPuuccmnqp9bVq+f0jVy99Kmuj/Nri/MU9mYbtmxL+QzujGLcltNFJHyxPYNJYaGXyTxiwB0hig1LqclAeeuuvsRdLAGbtMuGp7TuObfPXHW2WKs2zAJXaenLNKe5SkunPmTiajSp9L09Pvs7moOYk165zd7HwM5H7QUhpAmtTxlkvdC5aMNE/f4fBNxcWF46+k5vu4+fm1ib/BwAA//9fmidoAAAABklEQVQDAHZKmiA1+95gAAAAAElFTkSuQmCC",
        "description": "Waves - Ultimate v2024.11.29 - R2R (VST, VST3, AAX) [WIN x64] - Plugintorrent.com"
    },
    {
        "title": "Ableton Live",
        "category": "MAO - DAW",
        "url": "https://www.ableton.com",
        "description": "Station de travail audionumérique principale."
    },
    {
        "title": "Metallica - Nothing Else Matters",
        "category": "Guitare - Accoustique",
        "url": "https://www.youtube.com/watch?v=tAGnKpE4NCI",
        "description": "Tablature et tutoriel vidéo."
    },
    {
        "title": "FabFilter Pro-Q 4",
        "category": "MAO - PLUGIN & VST",
        "url": "https://www.fabfilter.com",
        "description": "Égaliseur paramétrique de référence."
    },
    {
        "title": "Guide Compression Vocale",
        "category": "MAO - GUIDE (Mixage)",
        "url": "https://www.youtube.com/watch?v=example",
        "description": "Astuces et réglages du compresseur."
    }
];

let musicResources = JSON.parse(localStorage.getItem('sanctuary_music_vault')) || defaultMusicResources;

function addMusicResource(title, category, url, description) {
    const newEntry = { title, category, url, description };
    musicResources.unshift(newEntry);
    localStorage.setItem('sanctuary_music_vault', JSON.stringify(musicResources));
    if (typeof filterAndRenderMusic === 'function') {
        filterAndRenderMusic();
    }
    return newEntry;
}

function resetMusicVault() {
    localStorage.removeItem('sanctuary_music_vault');
    musicResources = [...defaultMusicResources];
    if (typeof filterAndRenderMusic === 'function') filterAndRenderMusic();
}