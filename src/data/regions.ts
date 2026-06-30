export interface Region {
  id: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  color: string;
  colorDark: string;
  description: string;
  history: string;
  inhabitants: string;
  danger: number;
}

export const regionsData: Region[] = [
  {
    id: 'eldoria',
    name: 'Eldoria',
    path: 'M140,80 C148,72 158,68 168,70 C178,72 186,78 190,74 C194,70 198,62 206,58 C214,54 224,56 232,52 C240,48 244,40 252,38 C260,36 270,40 278,44 C286,48 290,56 296,60 C302,64 312,62 318,66 C324,70 326,78 320,84 C314,90 310,96 312,104 C314,112 322,116 318,124 C314,132 304,136 298,142 C292,148 288,156 282,162 C276,168 268,172 264,178 C260,184 262,192 256,198 C250,204 242,206 236,210 C230,214 224,218 218,214 C212,210 208,204 200,200 C192,196 186,192 178,188 C170,184 164,178 156,174 C148,170 142,162 136,156 C130,150 126,142 122,134 C118,126 116,116 120,108 C124,100 132,94 136,86 Z',
    labelX: 210,
    labelY: 150,
    color: '#8a9a6a',
    colorDark: '#5a6a4a',
    description:
      'A verdant kingdom of ancient forests and rolling hills, where the Great Tree of Lumin stands eternal. The elves and druids who dwell here guard the oldest magic in the realm.',
    history:
      'Founded by the star-fallen Aelindor, who planted the first seed of the Great Tree over ten thousand years ago. Eldoria has never fallen to invasion, protected by the living forest itself.',
    inhabitants:
      'Wood Elves, Druids of the Verdant Circle, Treants, Fae Folk, and the occasional wandering centaur.',
    danger: 2,
  },
  {
    id: 'drakmoor',
    name: 'Drakmoor',
    path: 'M560,50 C570,42 582,38 594,40 C606,42 616,48 626,44 C636,40 648,36 658,40 C668,44 676,52 686,50 C696,48 708,42 716,48 C724,54 728,64 734,72 C740,80 748,86 752,94 C756,102 754,112 758,120 C762,128 770,134 772,142 C774,150 770,160 766,168 C762,176 756,182 752,190 C748,198 752,208 746,216 C740,224 730,228 722,230 C714,232 704,236 696,232 C688,228 682,220 674,216 C666,212 658,208 650,210 C642,212 636,220 628,218 C620,216 614,208 606,204 C598,200 590,196 584,188 C578,180 574,170 568,162 C562,154 558,144 556,134 C554,124 556,114 552,106 C548,98 542,92 538,84 C534,76 532,66 536,58 C540,50 550,46 558,48 Z',
    labelX: 660,
    labelY: 145,
    color: '#b8956a',
    colorDark: '#7a5a3a',
    description:
      'A harsh, volcanic land where dragons roost in obsidian peaks and fire-worshipping clans forge weapons of legend. The sky glows crimson at dusk from the lava flows.',
    history:
      'Once the heart of the Dragon Empire, Drakmoor was scorched in the Great Sundering when the elder wyrm Vorathrax fell from the sky. His bones still smolder beneath Mount Pyre.',
    inhabitants:
      'Dragonborn clans, Fire Giants, Lava Dwarves, Salamanders, and the mysterious Ashborn humans.',
    danger: 5,
  },
  {
    id: 'shadowmere',
    name: 'Shadowmere',
    path: 'M120,280 C128,272 140,268 150,270 C160,272 170,278 180,274 C190,270 198,264 208,260 C218,256 228,258 236,262 C244,266 250,274 256,280 C262,286 268,294 272,302 C276,310 274,320 278,328 C282,336 290,342 292,352 C294,362 288,372 284,380 C280,388 274,394 268,400 C262,406 256,412 250,418 C244,424 236,428 228,430 C220,432 212,436 204,432 C196,428 190,420 182,416 C174,412 166,408 158,402 C150,396 144,388 138,380 C132,372 128,362 124,352 C120,342 118,332 116,322 C114,312 118,300 120,290 Z',
    labelX: 200,
    labelY: 350,
    color: '#9a8a8a',
    colorDark: '#5a4a5a',
    description:
      'A twilight realm of perpetual dusk, where the veil between worlds is thin. Ghostly marshes and ancient ruins dot this haunted landscape, and the dead are said to whisper secrets to those who listen.',
    history:
      'Shadowmere was cursed during the War of the Twin Moons, when the Shadow King attempted to tear open a portal to the Netherworld. The portal was sealed, but the land never saw true daylight again.',
    inhabitants:
      'Shadeborn humans, Wraiths, Bone Oracles, Marsh Hags, and the silent Duskwalkers.',
    danger: 4,
  },
  {
    id: 'frosthaven',
    name: 'Frosthaven',
    path: 'M530,290 C540,282 554,278 566,280 C578,282 588,288 600,284 C612,280 622,276 634,280 C646,284 656,292 666,290 C676,288 686,282 696,286 C706,290 714,300 720,310 C726,320 732,330 736,340 C740,350 738,362 740,372 C742,382 748,392 744,402 C740,412 730,418 720,422 C710,426 700,430 690,426 C680,422 672,414 662,410 C652,406 642,402 632,404 C622,406 614,412 604,410 C594,408 586,400 578,394 C570,388 564,380 558,370 C552,360 548,348 544,338 C540,328 538,318 536,308 C534,298 536,288 532,280 Z',
    labelX: 640,
    labelY: 360,
    color: '#8a9a9a',
    colorDark: '#5a7a7a',
    description:
      'A frozen northern expanse of glittering tundra and towering ice spires. Beneath the aurora-lit skies, resilient clans carve their homes from eternal ice and worship the ancient frost spirits.',
    history:
      'Frosthaven was shaped by the breath of Ymir the World-Serpent, who sleeps beneath the Great Glacier. The first Frostborn learned to forge ice-steel from his frozen scales.',
    inhabitants:
      'Frostborn humans, Ice Trolls, Snow Elves, Yeti, and the majestic Aurora Stags.',
    danger: 3,
  },
  {
    id: 'sunken-isles',
    name: 'Sunken Isles',
    path: 'M160,480 C170,472 184,468 196,470 C208,472 218,478 230,476 C242,474 252,470 264,474 C276,478 286,486 298,484 C310,482 320,478 332,480 C344,482 356,488 368,486 C380,484 390,480 402,482 C414,484 426,488 438,486 C450,484 460,480 472,482 C484,484 496,488 508,486 C520,484 530,480 542,482 C554,484 566,488 578,486 C590,484 600,480 612,482 C624,484 636,488 648,484 C660,480 668,474 678,470 C688,466 698,462 708,458 C718,454 728,450 738,448 C748,446 758,450 766,454 C774,458 780,464 784,472 C788,480 786,490 782,498 C778,506 772,512 762,516 C752,520 740,522 730,520 C720,518 710,514 700,516 C690,518 680,522 670,524 C660,526 650,524 640,528 C630,532 620,534 610,536 C600,538 590,536 580,540 C570,544 560,546 550,548 C540,550 530,548 520,552 C510,556 500,558 490,560 C480,562 470,560 460,564 C450,568 440,570 430,572 C420,574 410,572 400,574 C390,576 380,572 370,570 C360,568 352,562 344,556 C336,550 330,542 322,538 C314,534 304,530 296,526 C288,522 280,518 272,514 C264,510 256,504 248,500 C240,496 232,492 224,488 C216,484 206,482 196,486 C186,490 176,488 168,484 Z M280,500 C290,494 302,490 312,496 C322,502 320,512 314,518 C308,524 296,522 288,516 C280,510 274,504 280,500 Z M420,510 C430,504 442,500 452,506 C462,512 460,522 454,528 C448,534 436,532 428,526 C420,520 414,514 420,510 Z M580,498 C590,492 602,488 612,494 C622,500 620,510 614,516 C608,522 596,520 588,514 C580,508 574,502 580,498 Z',
    labelX: 460,
    labelY: 555,
    color: '#7a8a9a',
    colorDark: '#4a5a6a',
    description:
      'A scattered archipelago of mysterious islands, half-sunk beneath turquoise waves. Coral kingdoms and sunken temples hide treasures of a forgotten maritime empire, guarded by creatures of the deep.',
    history:
      'The Isles are the remnants of the great continent of Thalassia, which sank during the Cataclysm of Tides. The Mer-King still rules from the Sapphire Throne deep beneath the waves.',
    inhabitants:
      'Merfolk, Sea Elves, Coral Golems, Sirens, Kracken-spawn, and the reclusive Tidecallers.',
    danger: 3,
  },
];

export const totalRegions = regionsData.length;
