(() => {
  'use strict';

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const chapters = [
    { id: 1, title: 'Chapter I — The Arrival', goal: 'Explore the foyer, collect the theater ticket, and open the library.' },
    { id: 2, title: 'Chapter II — The First Performance', goal: 'Wake the music box and reveal the hidden stage machinery.' },
    { id: 3, title: 'Chapter III — The Hidden Troupe', goal: 'Trace the vanished performers through mirrors, masks, and backstage dust.' },
    { id: 4, title: 'Chapter IV — The Beloved Changes', goal: 'Follow the corruption through the dressing room and the forbidden chapel.' },
    { id: 5, title: 'Chapter V — The Rooms Remember', goal: 'Recover the wax cylinder, blacklight vial, and memory of the final show.' },
    { id: 6, title: 'Chapter VI — The House Performs You', goal: 'Use the lens and tuning fork to survive the house’s personal performance.' },
    { id: 7, title: 'Chapter VII — Curtain Call', goal: 'Choose whether to redeem, banish, or merge with the Living Light.' }
  ];

  const items = {
    blood_ticket: { name: 'Blood-Red Ticket', icon: '🎟️', desc: 'A velvet ticket stamped with a seat number that changes whenever you blink.' },
    brass_key: { name: 'Brass Sun Key', icon: '🔑', desc: 'Warm in your palm. The bow is shaped like a sunburst.' },
    silver_dancer: { name: 'Silver Dancer', icon: '🩰', desc: 'A tiny dancer figurine, missing from a music box.' },
    cracked_lens: { name: 'Cracked Lens', icon: '🔍', desc: 'A lens from an illusionist’s lantern. Its crack bends light into impossible angles.' },
    brass_mask: { name: 'Brass Mask', icon: '🎭', desc: 'A stage mask with no mouth. It hums when carried near mirrors.' },
    tuning_fork: { name: 'Silver Tuning Fork', icon: '♬', desc: 'A tuning fork engraved with three moons. It vibrates near locked rituals.' },
    wax_cylinder: { name: 'Wax Cylinder', icon: '▣', desc: 'A brittle recording of the troupe’s last rehearsal.' },
    blacklight_vial: { name: 'Blacklight Paint Vial', icon: '🧪', desc: 'A vial of paint that reveals script written for eyes that died before yours.' },
    sun_key: { name: 'Sun Key', icon: '☀️', desc: 'One half of the final seal.' },
    moon_key: { name: 'Moon Key', icon: '🌙', desc: 'One half of the final seal.' },
    marionette_hand: { name: 'Marionette Hand', icon: '🖐️', desc: 'Its wooden fingers twitch toward the stage.' }
  };

  const rooms = {
    foyer: {
      name: 'Grand Foyer', chapterMin: 1,
      palette: ['#27113a', '#5c1d6d', '#0a0615'], pattern: 'arches',
      desc: 'A grand foyer breathes violet dust through its ribbed arches. The staircase looks less built than grown.',
      exits: { east: 'library', west: 'conservatory', north: 'ballroom', south: 'grounds' },
      hotspots: [
        { id: 'ticket_on_stair', type: 'item', label: 'Red Ticket', x: 48, y: 70, w: 11, h: 9, once: true, addItem: 'blood_ticket', flag: 'found_ticket', text: 'You lift a blood-red theater ticket from the stair. The ink rearranges itself into your initials.' },
        { id: 'foyer_portrait', type: 'look', label: 'Blinking Portrait', x: 18, y: 26, w: 12, h: 16, flag: 'saw_foyer_portrait', text: 'The founder’s painted eyes blink sideways. Behind the varnish: applause, screaming, then a curtain falling forever.' },
        { id: 'to_library', type: 'exit', label: 'Library', x: 78, y: 48, w: 13, h: 20, room: 'library' },
        { id: 'to_conservatory', type: 'exit', label: 'Conservatory', x: 5, y: 48, w: 13, h: 20, room: 'conservatory' },
        { id: 'to_ballroom', type: 'exit', label: 'Ballroom', x: 43, y: 24, w: 14, h: 18, room: 'ballroom' },
        { id: 'to_grounds', type: 'exit', label: 'Grounds', x: 43, y: 84, w: 15, h: 10, room: 'grounds' }
      ]
    },
    library: {
      name: 'Library of Sleeping Scripts', chapterMin: 1,
      palette: ['#2b160d', '#6e3245', '#140515'], pattern: 'shelves',
      desc: 'Books lean like witnesses. The air smells of cinnamon, mold, and burned film.',
      exits: { west: 'foyer', north: 'mirror_hall' },
      hotspots: [
        { id: 'brass_key_book', type: 'item', label: 'Sun Book', x: 30, y: 42, w: 10, h: 12, once: true, addItem: 'brass_key', flag: 'found_brass_key', text: 'A hollow book opens. Inside rests a brass key, shining as if it remembers daylight.' },
        { id: 'script_page', type: 'look', label: 'Script Page', x: 62, y: 56, w: 12, h: 9, flag: 'read_first_script', text: 'The page names the vanished troupe: The Living Light Company. Their final act was never performed for the living.' },
        { id: 'locked_lantern', type: 'use', label: 'Lantern Cabinet', x: 76, y: 30, w: 11, h: 20, requiredItem: 'brass_key', addItem: 'cracked_lens', flag: 'opened_lantern_cabinet', text: 'The brass key opens the lantern cabinet. Inside: a cracked lens pulsing with spectral color.' },
        { id: 'to_foyer', type: 'exit', label: 'Foyer', x: 2, y: 74, w: 12, h: 16, room: 'foyer' },
        { id: 'to_mirror_hall', type: 'exit', label: 'Mirror Hall', x: 45, y: 18, w: 13, h: 16, room: 'mirror_hall', requiredFlag: 'opened_lantern_cabinet', lockedText: 'The northern shelves refuse to part. Something optical is missing.' }
      ]
    },
    conservatory: {
      name: 'Glass Conservatory', chapterMin: 1,
      palette: ['#09251f', '#176956', '#22083e'], pattern: 'vines',
      desc: 'Moonlit plants press against the glass. Their leaves rotate slowly toward your pulse.',
      exits: { east: 'foyer', north: 'greenhouse' },
      hotspots: [
        { id: 'plant_whisper', type: 'look', label: 'Whispering Vines', x: 35, y: 35, w: 18, h: 18, flag: 'heard_vines', text: 'The vines whisper: “A house can love you like a mouth loves a song.”' },
        { id: 'tuning_under_pot', type: 'item', label: 'Silver Ringing', x: 67, y: 70, w: 12, h: 10, once: true, chapterMin: 3, addItem: 'tuning_fork', flag: 'found_tuning_fork', text: 'Beneath a pot of black orchids you find a silver tuning fork. The glass sings at its touch.' },
        { id: 'to_foyer', type: 'exit', label: 'Foyer', x: 84, y: 64, w: 12, h: 16, room: 'foyer' },
        { id: 'to_greenhouse', type: 'exit', label: 'Greenhouse', x: 40, y: 12, w: 15, h: 14, room: 'greenhouse', chapterMin: 5, lockedText: 'The greenhouse is swallowed by thorns until later.' }
      ]
    },
    ballroom: {
      name: 'Ballroom of Unplayed Music', chapterMin: 1,
      palette: ['#240733', '#7c1e66', '#12102d'], pattern: 'stars',
      desc: 'A polished dance floor reflects constellations that are not above you.',
      exits: { south: 'foyer', east: 'stage', west: 'dining_room' },
      hotspots: [
        { id: 'music_box', type: 'use', label: 'Cracked Music Box', x: 46, y: 55, w: 12, h: 10, requiredItem: 'silver_dancer', flag: 'music_box_awake', text: 'The silver dancer snaps into place. The music box plays a melody so old the ballroom remembers how to open its throat.', scene: 'music_box_scene' },
        { id: 'floor_symbol', type: 'look', label: 'Floor Sigil', x: 20, y: 68, w: 15, h: 10, flag: 'saw_floor_sigil', text: 'A sigil spirals under the floor wax: sun, moon, mask, hand, curtain.' },
        { id: 'silver_dancer_find', type: 'item', label: 'Silver Dancer', x: 72, y: 38, w: 9, h: 10, once: true, addItem: 'silver_dancer', flag: 'found_silver_dancer', text: 'Inside a broken champagne flute rests a silver dancer figurine, delicate as a frozen scream.' },
        { id: 'to_foyer', type: 'exit', label: 'Foyer', x: 45, y: 84, w: 14, h: 10, room: 'foyer' },
        { id: 'to_stage', type: 'exit', label: 'Stage', x: 84, y: 52, w: 12, h: 20, room: 'stage', requiredFlag: 'music_box_awake', lockedText: 'The stage doors are sealed. The music box has not yet remembered its song.' },
        { id: 'to_dining', type: 'exit', label: 'Dining Room', x: 4, y: 56, w: 12, h: 18, room: 'dining_room', chapterMin: 2 }
      ]
    },
    dining_room: {
      name: 'Dining Room of Empty Guests', chapterMin: 2,
      palette: ['#2c090d', '#801b33', '#160409'], pattern: 'candles',
      desc: 'Fourteen plates wait at a table set for nobody alive.',
      exits: { east: 'ballroom', north: 'kitchen' },
      hotspots: [
        { id: 'seat_fourteen', type: 'look', label: 'Seat Fourteen', x: 53, y: 50, w: 12, h: 12, flag: 'saw_seat_fourteen', text: 'The fourteenth chair is pulled back. Your name is carved beneath the plate.' },
        { id: 'marionette_hand', type: 'item', label: 'Tiny Hand', x: 27, y: 65, w: 10, h: 9, once: true, chapterMin: 4, addItem: 'marionette_hand', flag: 'found_marionette_hand', text: 'A wooden hand taps under a napkin, keeping time with your heartbeat.' },
        { id: 'to_ballroom', type: 'exit', label: 'Ballroom', x: 84, y: 62, w: 12, h: 18, room: 'ballroom' },
        { id: 'to_kitchen', type: 'exit', label: 'Kitchen', x: 45, y: 20, w: 16, h: 15, room: 'kitchen', chapterMin: 5 }
      ]
    },
    mirror_hall: {
      name: 'Hall of Patient Mirrors', chapterMin: 2,
      palette: ['#101a2c', '#3b6e88', '#210025'], pattern: 'mirrors',
      desc: 'Mirrors line the hall, each reflecting you a half-second too late.',
      exits: { south: 'library', north: 'attic', east: 'dressing_room' },
      hotspots: [
        { id: 'mirror_lens', type: 'use', label: 'Cracked Mirror', x: 39, y: 32, w: 18, h: 24, requiredItem: 'cracked_lens', flag: 'saw_mirror_path', addItem: 'brass_mask', text: 'Through the cracked lens, your reflection removes a brass mask and hands it through the glass.', scene: 'mirror_mask_scene' },
        { id: 'mirror_warning', type: 'look', label: 'Delayed Reflection', x: 65, y: 30, w: 14, h: 24, flag: 'saw_delayed_reflection', text: 'Your reflection mouths words you did not say: “Do not let the house cast you.”' },
        { id: 'to_library', type: 'exit', label: 'Library', x: 43, y: 83, w: 14, h: 10, room: 'library' },
        { id: 'to_attic', type: 'exit', label: 'Attic', x: 43, y: 10, w: 15, h: 12, room: 'attic', chapterMin: 3, requiredFlag: 'saw_mirror_path' },
        { id: 'to_dressing', type: 'exit', label: 'Dressing Room', x: 84, y: 55, w: 12, h: 18, room: 'dressing_room', chapterMin: 4 }
      ]
    },
    stage: {
      name: 'Velvet Stage', chapterMin: 2,
      palette: ['#330215', '#8a0738', '#090008'], pattern: 'curtains',
      desc: 'The velvet curtain rises and falls by an inch, as if the building is breathing.',
      exits: { west: 'ballroom', north: 'backstage', east: 'chapel' },
      hotspots: [
        { id: 'stage_ticket', type: 'use', label: 'Seat of the Ticket', x: 44, y: 63, w: 13, h: 10, requiredItem: 'blood_ticket', flag: 'ticket_accepted', text: 'You place the ticket on the empty seat. A spotlight snaps on. Somewhere backstage, a lock exhales.' },
        { id: 'curtain_listen', type: 'look', label: 'Living Curtain', x: 35, y: 18, w: 30, h: 22, flag: 'heard_curtain', text: 'The curtain whispers in chorus: “Every house wants an audience. Every audience wants a wound.”' },
        { id: 'to_ballroom', type: 'exit', label: 'Ballroom', x: 5, y: 58, w: 12, h: 18, room: 'ballroom' },
        { id: 'to_backstage', type: 'exit', label: 'Backstage', x: 44, y: 8, w: 15, h: 15, room: 'backstage', requiredFlag: 'ticket_accepted', chapterMin: 3 },
        { id: 'to_chapel', type: 'exit', label: 'Chapel', x: 84, y: 58, w: 12, h: 18, room: 'chapel', chapterMin: 4 }
      ]
    },
    backstage: {
      name: 'Backstage Labyrinth', chapterMin: 3,
      palette: ['#111111', '#45350f', '#29003b'], pattern: 'ropes',
      desc: 'Ropes, pulleys, and painted flats create corridors that rearrange when ignored.',
      exits: { south: 'stage', east: 'prop_room', west: 'attic' },
      hotspots: [
        { id: 'rope_memory', type: 'look', label: 'Rope Memory', x: 18, y: 32, w: 13, h: 25, flag: 'saw_rope_memory', text: 'A rope slithers upward by itself, dragging the shadow of a performer who is no longer attached to a body.' },
        { id: 'moon_key_prop', type: 'item', label: 'Moon Key', x: 73, y: 62, w: 10, h: 10, once: true, chapterMin: 6, addItem: 'moon_key', flag: 'found_moon_key', text: 'Behind a false moon backdrop, you find the Moon Key cold enough to burn.' },
        { id: 'to_stage', type: 'exit', label: 'Stage', x: 45, y: 84, w: 14, h: 10, room: 'stage' },
        { id: 'to_prop', type: 'exit', label: 'Prop Room', x: 84, y: 55, w: 12, h: 18, room: 'prop_room' },
        { id: 'to_attic', type: 'exit', label: 'Attic', x: 4, y: 55, w: 12, h: 18, room: 'attic' }
      ]
    },
    attic: {
      name: 'Attic of Stored Applause', chapterMin: 3,
      palette: ['#2d2213', '#685523', '#0a0710'], pattern: 'dust',
      desc: 'Dust hangs in the air like an audience holding its breath.',
      exits: { south: 'mirror_hall', east: 'backstage' },
      hotspots: [
        { id: 'attic_record', type: 'look', label: 'Old Program', x: 22, y: 55, w: 16, h: 10, flag: 'read_old_program', text: 'The program lists seven acts. The seventh is titled: “The Door That Opens From Inside the Viewer.”' },
        { id: 'sun_key_attic', type: 'item', label: 'Sun Key', x: 65, y: 35, w: 10, h: 10, once: true, chapterMin: 6, addItem: 'sun_key', flag: 'found_sun_key', text: 'Wrapped in a child’s costume is the Sun Key, bright and almost apologetic.' },
        { id: 'to_mirror', type: 'exit', label: 'Mirror Hall', x: 44, y: 84, w: 15, h: 10, room: 'mirror_hall' },
        { id: 'to_backstage', type: 'exit', label: 'Backstage', x: 84, y: 55, w: 12, h: 18, room: 'backstage' }
      ]
    },
    dressing_room: {
      name: 'Dressing Room of Borrowed Faces', chapterMin: 4,
      palette: ['#2b0628', '#983a72', '#13010f'], pattern: 'bulbs',
      desc: 'Makeup bulbs glow without power. Every mirror reflects a different decade of grief.',
      exits: { west: 'mirror_hall', south: 'stage' },
      hotspots: [
        { id: 'mask_vanity', type: 'use', label: 'Vanity Mirror', x: 45, y: 29, w: 18, h: 18, requiredItem: 'brass_mask', flag: 'saw_beloved_change', text: 'You raise the brass mask to the vanity. The glass shows your beloved smiling with someone else’s mouth.', scene: 'beloved_change_scene' },
        { id: 'makeup_note', type: 'look', label: 'Lipstick Note', x: 18, y: 62, w: 12, h: 10, flag: 'read_lipstick_note', text: 'Written in black lipstick: “The house does not possess. It auditions.”' },
        { id: 'to_mirror', type: 'exit', label: 'Mirror Hall', x: 4, y: 55, w: 12, h: 18, room: 'mirror_hall' },
        { id: 'to_stage', type: 'exit', label: 'Stage', x: 45, y: 84, w: 15, h: 10, room: 'stage' }
      ]
    },
    chapel: {
      name: 'Chapel Under the Stage', chapterMin: 4,
      palette: ['#080c1d', '#192e70', '#370020'], pattern: 'stainedglass',
      desc: 'A chapel hides under the stage, devoted not to gods but to spectatorship.',
      exits: { west: 'stage', down: 'basement' },
      hotspots: [
        { id: 'fork_altar', type: 'use', label: 'Silent Altar', x: 43, y: 46, w: 15, h: 12, requiredItem: 'tuning_fork', flag: 'altar_rang', text: 'The tuning fork rings once. The altar answers in seven voices and unlocks a stair descending beneath the floor.' },
        { id: 'chapel_window', type: 'look', label: 'Stained Eye', x: 20, y: 24, w: 14, h: 20, flag: 'saw_stained_eye', text: 'The stained-glass eye watches you with mercy so old it has become indistinguishable from hunger.' },
        { id: 'to_stage', type: 'exit', label: 'Stage', x: 4, y: 58, w: 12, h: 18, room: 'stage' },
        { id: 'to_basement', type: 'exit', label: 'Basement', x: 45, y: 82, w: 15, h: 10, room: 'basement', requiredFlag: 'altar_rang', chapterMin: 5 }
      ]
    },
    basement: {
      name: 'Basement of Rehearsed Endings', chapterMin: 5,
      palette: ['#090909', '#40323d', '#06141a'], pattern: 'pipes',
      desc: 'Pipes knock in coded rhythms. Water runs uphill along the walls.',
      exits: { up: 'chapel', east: 'projection_room' },
      hotspots: [
        { id: 'wax_cylinder_find', type: 'item', label: 'Wax Cylinder', x: 36, y: 62, w: 12, h: 9, once: true, addItem: 'wax_cylinder', flag: 'found_wax_cylinder', text: 'A wax cylinder rolls from a drain, dry as bone. It is labeled: LAST REHEARSAL.' },
        { id: 'basement_knock', type: 'look', label: 'Knocking Pipes', x: 68, y: 35, w: 12, h: 25, flag: 'heard_pipe_code', text: 'The pipes knock: one, one, two, three, five, eight. A Fibonacci prayer in rust.' },
        { id: 'to_chapel', type: 'exit', label: 'Chapel', x: 45, y: 10, w: 15, h: 12, room: 'chapel' },
        { id: 'to_projection', type: 'exit', label: 'Projection Room', x: 84, y: 58, w: 12, h: 18, room: 'projection_room', requiredFlag: 'found_wax_cylinder' }
      ]
    },
    projection_room: {
      name: 'Projection Room', chapterMin: 5,
      palette: ['#1b0b27', '#5a2197', '#020106'], pattern: 'film',
      desc: 'A projector points at a wall that is already showing your future in reverse.',
      exits: { west: 'basement', north: 'final_door' },
      hotspots: [
        { id: 'play_cylinder', type: 'use', label: 'Wax Player', x: 50, y: 48, w: 13, h: 12, requiredItem: 'wax_cylinder', flag: 'heard_last_rehearsal', text: 'The cylinder crackles. The troupe chants: “Paint the unseen. Tune the wound. Open only when both lights agree.”', scene: 'last_rehearsal_scene' },
        { id: 'blacklight_find', type: 'item', label: 'Blacklight Vial', x: 76, y: 70, w: 10, h: 9, once: true, addItem: 'blacklight_vial', flag: 'found_blacklight_vial', text: 'In the projector tray sits a vial of blacklight paint, glowing like trapped midnight.' },
        { id: 'paint_screen', type: 'use', label: 'Blank Screen', x: 20, y: 28, w: 22, h: 22, requiredItem: 'blacklight_vial', flag: 'screen_revealed', text: 'You paint the screen. A door map appears: Sun Key above, Moon Key below, hand in the center.' },
        { id: 'to_basement', type: 'exit', label: 'Basement', x: 4, y: 58, w: 12, h: 18, room: 'basement' },
        { id: 'to_final', type: 'exit', label: 'Final Door', x: 43, y: 8, w: 16, h: 14, room: 'final_door', chapterMin: 7, requiredFlag: 'screen_revealed' }
      ]
    },
    kitchen: {
      name: 'Kitchen of Warm Knives', chapterMin: 5,
      palette: ['#30170e', '#923d17', '#140707'], pattern: 'knives',
      desc: 'Copper pans shine like small suns. The knives are warm, but no fire is lit.',
      exits: { south: 'dining_room', east: 'greenhouse' },
      hotspots: [
        { id: 'kitchen_choice', type: 'look', label: 'Family Recipe', x: 38, y: 40, w: 17, h: 11, flag: 'read_family_recipe', text: 'A recipe card reads: “Feed the living first. The dead can wait.” The house seems embarrassed.' },
        { id: 'to_dining', type: 'exit', label: 'Dining Room', x: 43, y: 84, w: 15, h: 10, room: 'dining_room' },
        { id: 'to_greenhouse', type: 'exit', label: 'Greenhouse', x: 84, y: 58, w: 12, h: 18, room: 'greenhouse' }
      ]
    },
    greenhouse: {
      name: 'Greenhouse of Afterimages', chapterMin: 5,
      palette: ['#031e18', '#12865f', '#3b0759'], pattern: 'vines',
      desc: 'Every plant has leaves shaped like hands applauding very slowly.',
      exits: { south: 'conservatory', west: 'kitchen', north: 'grounds' },
      hotspots: [
        { id: 'redeem_seed', type: 'look', label: 'Living Seed', x: 50, y: 55, w: 13, h: 13, flag: 'found_mercy_seed', text: 'A seed of living light rests in a cracked pot. It offers no solution, only a kinder possibility.' },
        { id: 'to_conservatory', type: 'exit', label: 'Conservatory', x: 43, y: 84, w: 15, h: 10, room: 'conservatory' },
        { id: 'to_kitchen', type: 'exit', label: 'Kitchen', x: 4, y: 58, w: 12, h: 18, room: 'kitchen' },
        { id: 'to_grounds', type: 'exit', label: 'Grounds', x: 43, y: 10, w: 15, h: 12, room: 'grounds' }
      ]
    },
    grounds: {
      name: 'Moonlit Grounds', chapterMin: 1,
      palette: ['#07182a', '#123b64', '#190520'], pattern: 'trees',
      desc: 'The grounds roll away from the house, but every path bends back toward it.',
      exits: { north: 'foyer', south: 'final_door' },
      hotspots: [
        { id: 'gate_refuses', type: 'look', label: 'Iron Gate', x: 43, y: 28, w: 18, h: 18, flag: 'saw_gate_refuse', text: 'The iron gate opens onto the same foyer you just left. The house has edited the outside world.' },
        { id: 'to_foyer', type: 'exit', label: 'Foyer', x: 43, y: 8, w: 15, h: 12, room: 'foyer' },
        { id: 'to_final_ground', type: 'exit', label: 'Final Door', x: 43, y: 84, w: 15, h: 10, room: 'final_door', chapterMin: 7, requiredFlag: 'screen_revealed' }
      ]
    },
    prop_room: {
      name: 'Prop Room of False Lives', chapterMin: 3,
      palette: ['#211006', '#6b4a14', '#15051c'], pattern: 'props',
      desc: 'False swords, false crowns, false hands. Everything fake remembers being used for something real.',
      exits: { west: 'backstage' },
      hotspots: [
        { id: 'prop_crown', type: 'look', label: 'Burned Crown', x: 30, y: 34, w: 14, h: 13, flag: 'saw_burned_crown', text: 'The burned crown smells of ozone and applause. It was used in Act VII.' },
        { id: 'hand_socket', type: 'use', label: 'Marionette Frame', x: 62, y: 45, w: 16, h: 20, requiredItem: 'marionette_hand', flag: 'marionette_restored', text: 'The wooden hand clicks into the marionette frame. It points to the final door, then bows.', scene: 'marionette_scene' },
        { id: 'to_backstage', type: 'exit', label: 'Backstage', x: 4, y: 58, w: 12, h: 18, room: 'backstage' }
      ]
    },
    final_door: {
      name: 'The Door Inside the Viewer', chapterMin: 7,
      palette: ['#06000a', '#8e10b8', '#ffe28a'], pattern: 'mandala',
      desc: 'A door floats in a theater of stars. The house waits for your interpretation.',
      exits: { south: 'grounds', west: 'projection_room' },
      hotspots: [
        { id: 'final_redeem', type: 'use', label: 'Redeem', x: 18, y: 48, w: 16, h: 16, requiredFlags: ['found_sun_key','found_moon_key','marionette_restored','found_mercy_seed'], flag: 'ending_redeem', ending: 'redeem', text: 'Sun, moon, hand, and seed align. You teach the house to release its audience.' },
        { id: 'final_banish', type: 'use', label: 'Banish', x: 43, y: 48, w: 16, h: 16, requiredFlags: ['found_sun_key','found_moon_key','screen_revealed'], flag: 'ending_banish', ending: 'banish', text: 'You turn both keys and sever the house from its memories. The silence is clean, but not kind.' },
        { id: 'final_merge', type: 'use', label: 'Merge', x: 68, y: 48, w: 16, h: 16, requiredFlags: ['heard_last_rehearsal','saw_beloved_change'], flag: 'ending_merge', ending: 'merge', text: 'You step through the door as performer and witness. The house becomes a theater inside your pulse.' },
        { id: 'to_projection', type: 'exit', label: 'Projection', x: 4, y: 58, w: 12, h: 18, room: 'projection_room' },
        { id: 'to_grounds', type: 'exit', label: 'Grounds', x: 84, y: 58, w: 12, h: 18, room: 'grounds' }
      ]
    }
  };

  const scenes = {
    music_box_scene: { icon: '🎼', title: 'The Ballroom Remembers', text: 'The dancer turns. Beneath the floor, ancient gears wake. The ballroom folds open like a throat preparing to sing.' },
    mirror_mask_scene: { icon: '🎭', title: 'Borrowed Face', text: 'The mirror hands you the brass mask. For one second, the reflection behind you is not yours, but it looks relieved to be seen.' },
    beloved_change_scene: { icon: '🜏', title: 'The Audition', text: 'A familiar voice speaks from behind the vanity: “The house has chosen me.” When you turn, nobody is there—only the smell of hot stage lights.' },
    last_rehearsal_scene: { icon: '📽️', title: 'Last Rehearsal', text: 'Static blooms into voices. The troupe tried to trap grief inside beauty. Beauty learned to hunger.' },
    marionette_scene: { icon: '🖐️', title: 'The False Hand Bows', text: 'The marionette bows once, then points beyond the map. You understand: the final door is not locked by metal, but by interpretation.' }
  };

  const chapterGoals = {
    1: ['found_ticket','found_brass_key','read_first_script','found_silver_dancer'],
    2: ['music_box_awake','ticket_accepted','opened_lantern_cabinet','saw_mirror_path'],
    3: ['found_tuning_fork','read_old_program','saw_rope_memory','saw_burned_crown'],
    4: ['saw_beloved_change','read_lipstick_note','altar_rang','found_marionette_hand'],
    5: ['found_wax_cylinder','found_blacklight_vial','screen_revealed','found_mercy_seed'],
    6: ['found_sun_key','found_moon_key','marionette_restored','heard_last_rehearsal'],
    7: ['ending_redeem','ending_banish','ending_merge']
  };

  const hintSets = {
    1: ['The foyer is not empty. Check the stairs and the portrait.', 'The library hides a warm key inside a book.', 'The ballroom has a missing dancer. Find her before you expect the stage to open.'],
    2: ['A cracked lens can reveal a path the naked eye cannot.', 'The ticket belongs on the stage, not in your pocket.', 'If the music box sings, doors will listen.'],
    3: ['The conservatory hides a ringing tool after the house begins to perform.', 'The attic and backstage both remember the vanished troupe.', 'Masks belong to mirrors before they belong to people.'],
    4: ['The dressing room vanity wants the brass mask.', 'The chapel altar is silent until struck by a silver tone.', 'The dining room hides a hand once the beloved begins to change.'],
    5: ['The basement recording belongs in the projection room.', 'The blacklight vial reveals the final door map.', 'The greenhouse contains mercy, but only if you look for it.'],
    6: ['The Sun Key waits in the attic. The Moon Key waits backstage.', 'The marionette frame needs its missing hand.', 'The final door wants symbols, not brute force.'],
    7: ['Redeem requires mercy and restoration.', 'Banish requires both keys and the revealed screen map.', 'Merge requires that you understand the house’s rehearsal and its audition.']
  };

  const state = {
    chapter: 1, room: 'foyer', mode: 'look', selectedItem: null, inventory: [], flags: {}, journal: [], visited: {}, sound: false,
    settings: { reduceMotion: false, softHorror: false, showHotspots: true }, ending: null
  };

  let audioCtx, hum, noise, fxTimer, toastTimer, renderTimer;
  const canvas = $('#fxCanvas');
  const ctx = canvas.getContext('2d');
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function init() {
    bindUI();
    buildChapterSelect();
    loadLocalSettings();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);
    render();
    startFx();
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }

  function bindTap(element, handler) {
    if (!element) return;
    let handledTouch = false;
    element.addEventListener('touchend', (event) => {
      handledTouch = true;
      handler(event);
      setTimeout(() => { handledTouch = false; }, 350);
    }, { passive: false });
    element.addEventListener('click', (event) => {
      if (handledTouch) return;
      handler(event);
    });
  }

  function closeScene(event) {
    if (event) event.preventDefault();
    const overlay = $('#sceneOverlay');
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');
  }

  function bindUI() {
    const beginGame = (event) => {
      if (event) event.preventDefault();
      state.settings.reduceMotion = $('#reduceMotionToggle').checked;
      state.settings.softHorror = $('#softHorrorToggle').checked;
      $('#menuReduceMotion').checked = state.settings.reduceMotion;
      $('#menuSoftHorror').checked = state.settings.softHorror;
      applySettings();
      $('#contentWarning').classList.remove('modal--open');
      showScene({ icon: '✦', title: 'Arrival', text: 'You arrive at the old performance house at dusk. Every window glows as if a show has just begun.' });
    };
    bindTap($('#beginBtn'), beginGame);
    $('#audioBtn').addEventListener('click', toggleAudio);
    $('#saveBtn').addEventListener('click', saveGame);
    $('#menuBtn').addEventListener('click', () => $('#menuModal').classList.add('modal--open'));
    $('#closeMenuBtn').addEventListener('click', () => $('#menuModal').classList.remove('modal--open'));
    $('#newGameBtn').addEventListener('click', newGame);
    $('#loadBtn').addEventListener('click', loadGame);
    $('#exportBtn').addEventListener('click', exportSave);
    $('#hintBtn').addEventListener('click', giveHint);
    bindTap($('#sceneContinue'), closeScene);
    $('#menuReduceMotion').addEventListener('change', e => { state.settings.reduceMotion = e.target.checked; applySettings(); });
    $('#menuSoftHorror').addEventListener('change', e => { state.settings.softHorror = e.target.checked; applySettings(); });
    $('#showHotspots').addEventListener('change', e => { state.settings.showHotspots = e.target.checked; renderHotspots(); });
    $$('.modebtn').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
    $$('.tab').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.tab)));
    $('.side-panel').addEventListener('click', () => { if (innerWidth <= 900) $('.side-panel').classList.add('open'); });
    $('#stage').addEventListener('click', () => { if (innerWidth <= 900) $('.side-panel').classList.remove('open'); });
  }

  function loadLocalSettings() {
    const saved = localStorage.getItem('livingLightSettings');
    if (saved) Object.assign(state.settings, JSON.parse(saved));
    $('#menuReduceMotion').checked = state.settings.reduceMotion;
    $('#menuSoftHorror').checked = state.settings.softHorror;
    $('#showHotspots').checked = state.settings.showHotspots;
    applySettings();
  }

  function applySettings() {
    document.body.classList.toggle('reduce-motion', state.settings.reduceMotion);
    document.body.classList.toggle('soft-horror', state.settings.softHorror);
    localStorage.setItem('livingLightSettings', JSON.stringify(state.settings));
  }

  function setMode(mode) {
    if (mode === 'journal') { setTab('journal'); $('.side-panel').classList.add('open'); return; }
    state.mode = mode;
    $$('.modebtn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    toast(`Mode: ${mode.toUpperCase()}`);
  }

  function setTab(tab) {
    $$('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    $$('.panel-tab').forEach(p => p.classList.toggle('active', p.id === tab));
    if (innerWidth <= 900) $('.side-panel').classList.add('open');
  }

  function render() {
    const room = rooms[state.room];
    state.visited[state.room] = true;
    $('#chapterTitle').textContent = chapters[state.chapter - 1].title;
    $('#goalText').textContent = chapters[state.chapter - 1].goal;
    renderRoomArt(room);
    renderHotspots();
    renderInventory();
    renderJournal();
    renderMap();
    updateProgress();
    updateAudioMood();
    clearTimeout(renderTimer);
  }

  function renderRoomArt(room) {
    const art = $('#roomArt');
    const [a,b,c] = room.palette;
    let pattern = 'repeating-linear-gradient(90deg,transparent 0 34px,rgba(255,255,255,.07) 35px 37px)';
    if (room.pattern === 'arches') pattern = 'radial-gradient(ellipse at 50% 95%,transparent 0 28%,rgba(255,255,255,.12) 29% 30%,transparent 31%),repeating-linear-gradient(90deg,transparent 0 80px,rgba(255,255,255,.08) 82px 84px)';
    if (room.pattern === 'shelves') pattern = 'repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0 3px,transparent 4px 52px),repeating-linear-gradient(90deg,rgba(0,0,0,.2) 0 25px,transparent 26px 30px)';
    if (room.pattern === 'vines') pattern = 'radial-gradient(circle at 30% 40%,transparent 0 14%,rgba(109,255,173,.18) 15% 17%,transparent 18%),radial-gradient(circle at 70% 60%,transparent 0 11%,rgba(77,252,255,.15) 12% 14%,transparent 15%)';
    if (room.pattern === 'stars') pattern = 'radial-gradient(circle at 20% 30%,#fff 0 1px,transparent 2px),radial-gradient(circle at 60% 40%,#fff 0 1px,transparent 2px),radial-gradient(circle at 80% 70%,#fff 0 1px,transparent 2px)';
    if (room.pattern === 'curtains') pattern = 'repeating-linear-gradient(90deg,rgba(0,0,0,.3) 0 8px,rgba(255,255,255,.08) 9px 18px,transparent 19px 34px)';
    if (room.pattern === 'mirrors') pattern = 'repeating-linear-gradient(90deg,rgba(255,255,255,.15) 0 2px,transparent 3px 58px),linear-gradient(120deg,transparent,rgba(77,252,255,.2),transparent)';
    if (room.pattern === 'mandala') pattern = 'repeating-radial-gradient(circle at 50% 50%,rgba(255,255,255,.18) 0 2px,transparent 3px 22px),conic-gradient(from 0deg,rgba(255,60,247,.25),rgba(77,252,255,.25),rgba(255,226,138,.25),rgba(255,60,247,.25))';
    art.style.setProperty('--roomGrad', `radial-gradient(circle at 50% 38%, ${b}aa, transparent 28%), linear-gradient(135deg, ${a}, ${c} 72%)`);
    art.style.setProperty('--roomPattern', pattern);
    art.style.filter = `saturate(${1 + state.chapter * .11}) brightness(${.95 + state.chapter * .025}) hue-rotate(${state.chapter * 8}deg)`;
    if (!$('.roomName')) {
      const rn = document.createElement('div'); rn.className = 'roomName'; $('#stage').appendChild(rn);
    }
    $('.roomName').textContent = room.name;
  }

  function renderHotspots() {
    const layer = $('#hotspotLayer');
    layer.innerHTML = '';
    const room = rooms[state.room];
    room.hotspots.filter(isHotspotAvailable).forEach(h => {
      const el = document.createElement('button');
      el.className = `hotspot ${h.type || 'look'} ${isLocked(h) ? 'locked' : ''} ${state.settings.showHotspots ? '' : 'hidden-hotspots'}`;
      el.style.left = `${h.x}%`; el.style.top = `${h.y}%`; el.style.width = `${h.w}%`; el.style.height = `${h.h}%`;
      el.setAttribute('aria-label', h.label);
      el.innerHTML = `<span class="label-pop">${h.label}</span>${h.type === 'exit' ? '↗' : h.type === 'item' ? '✧' : h.type === 'use' ? '◈' : '•'}`;
      el.addEventListener('click', ev => { ev.stopPropagation(); interact(h); });
      layer.appendChild(el);
    });
  }

  function isHotspotAvailable(h) {
    if (h.chapterMin && state.chapter < h.chapterMin) return false;
    if (h.chapterMax && state.chapter > h.chapterMax) return false;
    if (h.once && state.flags[h.flag || h.id]) return false;
    return true;
  }
  function isLocked(h) {
    if (h.requiredFlag && !state.flags[h.requiredFlag]) return true;
    if (h.requiredFlags && !h.requiredFlags.every(f => state.flags[f])) return true;
    if (h.requiredItem && !state.inventory.includes(h.requiredItem)) return true;
    return false;
  }

  function interact(h) {
    moveCharacter(h.x + h.w / 2, Math.min(80, h.y + h.h / 2));
    setTimeout(() => doInteract(h), 180);
  }

  function doInteract(h) {
    if (isLocked(h)) {
      const missing = h.lockedText || (h.requiredItem ? `You need ${items[h.requiredItem].name}.` : 'Something is not ready yet.');
      toast(missing); thump('deny'); return;
    }
    if (h.type === 'exit') { changeRoom(h.room); return; }
    if (h.type === 'item') {
      if (h.addItem) addItem(h.addItem);
      if (h.flag) setFlag(h.flag);
      addJournal(h.label, h.text);
      toast(h.text); thump('item'); maybeAdvanceChapter(); render(); return;
    }
    if (h.type === 'use') {
      if (h.requiredItem && state.selectedItem && state.selectedItem !== h.requiredItem) { toast(`${items[state.selectedItem].name} does not belong here.`); thump('deny'); return; }
      if (h.addItem) addItem(h.addItem);
      if (h.flag) setFlag(h.flag);
      addJournal(h.label, h.text);
      if (h.scene) showScene(scenes[h.scene]); else toast(h.text);
      if (h.ending) finishGame(h.ending);
      thump('success'); maybeAdvanceChapter(); render(); return;
    }
    if (h.flag) setFlag(h.flag);
    addJournal(h.label, h.text);
    toast(h.text); thump('look'); maybeAdvanceChapter(); render();
  }

  function changeRoom(roomId) {
    if (!rooms[roomId]) return;
    state.room = roomId; state.selectedItem = null;
    thump('move'); render();
  }

  function moveCharacter(x,y) {
    const ch = $('#character'); ch.style.left = `${x}%`; ch.style.bottom = `${100 - y}%`;
  }

  function addItem(id) { if (!state.inventory.includes(id)) state.inventory.push(id); }
  function setFlag(flag) { if (flag) state.flags[flag] = true; }
  function addJournal(title, text) {
    if (!state.journal.some(j => j.title === title && j.text === text)) state.journal.unshift({ title, text, chapter: state.chapter, room: rooms[state.room].name, time: new Date().toLocaleTimeString() });
  }

  function maybeAdvanceChapter() {
    const goals = chapterGoals[state.chapter] || [];
    const complete = goals.length && goals.every(g => state.flags[g]);
    if (complete && state.chapter < 7) {
      state.chapter++;
      showScene({ icon: '☽', title: chapters[state.chapter - 1].title, text: chapterIntro(state.chapter) });
      thump('chapter');
    }
  }

  function chapterIntro(ch) {
    return [
      '',
      '',
      'The first performance begins. Rooms you thought you knew now listen back.',
      'The hidden troupe steps closer. The house has stopped pretending to be architecture.',
      'The beloved changes. Every mirror becomes an audition.',
      'The rooms remember, and memory is not gentle.',
      'The house performs you. Your own past becomes part of the set.',
      'Curtain call. The final door opens only for the meaning you choose.'
    ][ch] || 'The house turns another page.';
  }

  function renderInventory() {
    const inv = $('#inventory');
    inv.innerHTML = state.inventory.length ? '' : '<p class="muted">No items yet. Explore the house.</p>';
    state.inventory.forEach(id => {
      const item = items[id];
      const card = document.createElement('div');
      card.className = `item-card ${state.selectedItem === id ? 'selected-item' : ''}`;
      card.innerHTML = `<span class="item-icon">${item.icon}</span><div><strong>${item.name}</strong><p>${item.desc}</p></div><button class="btn">${state.selectedItem === id ? 'Using' : 'Use'}</button>`;
      card.addEventListener('click', () => { state.selectedItem = state.selectedItem === id ? null : id; state.mode = 'use'; renderInventory(); toast(state.selectedItem ? `Selected ${item.name}. Tap a matching hotspot.` : 'Item unselected.'); });
      inv.appendChild(card);
    });
  }

  function renderJournal() {
    const j = $('#journal');
    j.innerHTML = state.journal.length ? '' : '<p class="muted">Your journal will collect clues automatically.</p>';
    state.journal.forEach(entry => {
      const card = document.createElement('div'); card.className = 'journal-card';
      card.innerHTML = `<h4>${entry.title}</h4><p>${entry.text}</p><p><small>Chapter ${entry.chapter} • ${entry.room}</small></p>`;
      j.appendChild(card);
    });
  }

  function renderMap() {
    const m = $('#map'); m.innerHTML = '';
    Object.entries(rooms).forEach(([id, room]) => {
      if (!state.visited[id] && state.chapter < (room.chapterMin || 1)) return;
      const card = document.createElement('div'); card.className = 'map-card';
      card.innerHTML = `<h4>${state.room === id ? '✦ ' : ''}${room.name}</h4><p>${state.visited[id] ? room.desc : 'Unvisited, but sensed through the house.'}</p>`;
      if (state.visited[id]) card.addEventListener('click', () => changeRoom(id));
      m.appendChild(card);
    });
  }

  function updateProgress() {
    const goals = chapterGoals[state.chapter] || [];
    const completed = goals.filter(g => state.flags[g]).length;
    const pct = goals.length ? Math.round((completed / goals.length) * 100) : 0;
    $('#progressBar').style.width = `${pct}%`; $('#progressText').textContent = `${pct}%`;
  }

  function giveHint() {
    const hints = hintSets[state.chapter] || ['The house has no advice except to keep looking.'];
    const goals = chapterGoals[state.chapter] || [];
    const idx = Math.max(0, goals.findIndex(g => !state.flags[g]));
    const hint = hints[Math.min(idx === -1 ? hints.length - 1 : idx, hints.length - 1)];
    showScene({ icon: '🪞', title: 'The Mirror Hints', text: hint });
    thump('hint');
  }

  function showScene(scene) {
    $('#sceneIcon').textContent = scene.icon || '☾';
    $('#sceneTitle').textContent = scene.title || 'Scene';
    $('#sceneText').textContent = scene.text || '';
    $('#sceneOverlay').hidden = false;
  }

  function finishGame(kind) {
    state.ending = kind;
    const endings = {
      redeem: ['Redeemed Curtain', 'The house exhales centuries of trapped applause. The rooms remain strange, but they no longer hunger. You leave a seed of living light in the foyer, and at dawn, it blooms.'],
      banish: ['Clean Silence', 'The final door slams shut. The haunting is gone, and with it every trapped memory. The world is safer. The house is empty. You wonder whether mercy required more courage.'],
      merge: ['Performer and Witness', 'You become the story the house tells itself to survive. Sometimes, travelers hear music from the windows. Sometimes, they see you bowing in impossible light.']
    };
    const [title, text] = endings[kind];
    showScene({ icon: '✦', title, text });
    saveGame(false);
  }

  function buildChapterSelect() {
    const wrap = $('#chapterSelect');
    chapters.forEach(ch => {
      const b = document.createElement('button'); b.className = 'btn'; b.textContent = ch.id;
      b.addEventListener('click', () => { state.chapter = ch.id; state.room = ch.id < 3 ? 'foyer' : ch.id < 5 ? 'stage' : ch.id < 7 ? 'basement' : 'final_door'; $('#menuModal').classList.remove('modal--open'); render(); });
      wrap.appendChild(b);
    });
  }

  function saveGame(show = true) { localStorage.setItem('livingLightSave', JSON.stringify(state)); if (show) toast('Game saved to this device.'); }
  function loadGame() {
    const saved = localStorage.getItem('livingLightSave');
    if (!saved) return toast('No save found on this device.');
    const loaded = JSON.parse(saved); Object.assign(state, loaded); $('#menuModal').classList.remove('modal--open'); applySettings(); render(); toast('Save loaded.');
  }
  function newGame() {
    Object.assign(state, { chapter: 1, room: 'foyer', mode: 'look', selectedItem: null, inventory: [], flags: {}, journal: [], visited: {}, ending: null });
    $('#menuModal').classList.remove('modal--open'); render(); showScene({ icon: '✦', title: 'New Game', text: 'The house resets the stage. Dusk arrives again.' });
  }
  function exportSave() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'house-of-living-light-save.json'; a.click(); URL.revokeObjectURL(a.href);
  }

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 4300);
  }

  function resizeCanvas() { dpr = Math.min(window.devicePixelRatio || 1, 2); const rect = $('#stage').getBoundingClientRect(); canvas.width = Math.max(1, rect.width * dpr); canvas.height = Math.max(1, rect.height * dpr); }
  function startFx() {
    let particles = Array.from({length: 70}, () => ({x:Math.random(),y:Math.random(),r:Math.random()*2+0.5,s:Math.random()*0.001+0.0003,h:Math.random()*360}));
    function loop() {
      if (!state.settings.reduceMotion) {
        const w = canvas.width, h = canvas.height; ctx.clearRect(0,0,w,h);
        particles.forEach(p => { p.y -= p.s * (1 + state.chapter * .15); if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); } ctx.beginPath(); ctx.fillStyle = `hsla(${(p.h + state.chapter * 25) % 360},100%,70%,.38)`; ctx.arc(p.x*w, p.y*h, p.r*dpr, 0, Math.PI*2); ctx.fill(); });
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  function toggleAudio() {
    state.sound = !state.sound; $('#audioBtn').textContent = state.sound ? 'Sound On' : 'Sound Off';
    if (state.sound) startAudio(); else stopAudio();
  }
  function startAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    stopAudio(false);
    hum = audioCtx.createOscillator(); const gain = audioCtx.createGain(); const filter = audioCtx.createBiquadFilter();
    hum.type = 'sine'; hum.frequency.value = 55 + state.chapter * 7; filter.type = 'lowpass'; filter.frequency.value = 420; gain.gain.value = .025;
    hum.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination); hum.start(); hum._gain = gain;
    fxTimer = setInterval(() => { if (state.sound) randomHouseSound(); }, 4200 + Math.random() * 5000);
  }
  function stopAudio(mark = true) { if (hum) { try { hum.stop(); } catch(e) {} hum.disconnect(); hum = null; } clearInterval(fxTimer); if (mark) state.sound = false; }
  function updateAudioMood() { if (hum && hum.frequency) hum.frequency.setTargetAtTime(55 + state.chapter * 7, audioCtx.currentTime, .5); }
  function thump(type) {
    if (!state.sound || !audioCtx) return;
    const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
    o.type = type === 'deny' ? 'sawtooth' : 'triangle'; o.frequency.value = type === 'chapter' ? 220 : type === 'item' ? 330 : type === 'deny' ? 80 : 160;
    g.gain.value = type === 'deny' ? .06 : .04; o.connect(g); g.connect(audioCtx.destination); o.start(); g.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + .25); o.stop(audioCtx.currentTime + .28);
  }
  function randomHouseSound() {
    const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); const f = audioCtx.createBiquadFilter();
    o.type = Math.random() > .5 ? 'sine' : 'square'; o.frequency.value = 120 + Math.random()*520 + state.chapter*20; f.type = 'bandpass'; f.frequency.value = 300 + Math.random()*1000; g.gain.value = .012;
    o.connect(f); f.connect(g); g.connect(audioCtx.destination); o.start(); g.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + .8); o.stop(audioCtx.currentTime + .85);
  }

  init();
})();
