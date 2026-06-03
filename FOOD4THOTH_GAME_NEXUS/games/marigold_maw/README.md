# MARIGOLD MAW
*A luck-grid descent in four parts. Yellow Submarine palette, Mesoamerican folk-print art.*

## How to play

**Open `index.html` in a modern browser.** That's it.

Because the game uses React + Babel via CDN, the **first load needs an internet connection**.
After that everything runs locally and is cached.

### What you do

You play one of up to four characters — start with the Honey Boy, unlock the others
by sending coins up to the Surface in the **Winch Bucket**.

Each floor is a **4×4 grid of unknown tiles**. Hover a row to see the percentage chance
of landing on each tile, then click the row — the game randomly drops you onto one.
You always kill the monster, but if your matching stat (STR or MAG) is lower than the
monster's damage, you take the difference as HP.

Visit enough tiles to unlock the door, then descend through:
1. **The Roots** — peaceful but tricky.
2. **The Drowned Hall** — magic damage rises.
3. **The Glass Furnace** — physical damage rises, traps double.
4. **The Hollow Sun** — the boss waits in the centre.

Between floors you'll meet:
- **The Peddler** — buys items and Teeth (passive charms) for gold.
- **The Listening Statue** — pick a wish that bends the next floor's odds.
- **The Fishing Pool** — cast for gold, items, or an old shoe.
- **The Winch Bucket** — bank gold to the Surface; only banked gold survives your death.

### Sun abilities (chargeable, one per character)
- **Honey Boy** — *Hum a Tune.* Pick any tile directly.
- **Bone Bride** — *Wail.* Slay every monster on this floor.
- **Octopus King** — *Eight Reach.* Open a whole row at once.
- **Mariachi Skull** — *Serenade.* Heal to full and gain a Smoke Petal.

### Items
Honey Vial · Thunder Stone · Mirror Coin · Smoke Petal · Gold Tongue · Calling Bell.

### Charms / Teeth
Crow Feather · Iron Tooth · Salt Vial · Lucky Sigil · Wax Seal · Bone Idol · Sparrow Wing · Marigold Petal.

## What's in this zip
- `index.html` — entry point
- `styles.css` — the look (palette, animations)
- `game.js` — all the gameplay (data, art, screens, state)

## Tips
- The little **!** badge on a tile means that monster will hurt you.
  The **★** means you outclass it (it dances, helpless).
- If audio doesn't play, tap once anywhere — browsers require a click to unlock sound.
- Save data lives in `localStorage` under the key `marigold-maw-save-v1`.
- Press the speaker icon on the title to mute everything (including voice).

## Credits
A working prototype hand-built by Claude as a tribute to *Sol Cesto*
and to The Beatles' *Yellow Submarine*. All art is original SVG; all music
and voices are synthesised in the browser.
