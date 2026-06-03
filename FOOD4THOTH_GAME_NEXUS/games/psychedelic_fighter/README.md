# BAD TRIP COMBAT

A psychedelic SVG fighting game in pure HTML/CSS/JS.
**Dr. Seuss meets Fear & Loathing meets Heavy Metal Magazine meets 2001.**

## How to Play

Just open **`index.html`** in any modern browser (Chrome / Firefox / Safari).
No build step. No server needed. Headphones recommended 🎧.

> The first time you click anything, the browser will start the audio engine
> (Web Audio policy requires a user gesture).

## 📱 iPhone & iPad

The game is built for iOS Safari. **Hold your phone in landscape.**

- A **D-pad and action buttons** appear during fights — multi-touch is
  supported, so you can hold a direction with one thumb and press
  punch/kick/special with the other.
- In **Versus P1 vs P2** mode, both players get their own touch controls
  (P1 left half of the screen, P2 right half — works great on iPad).
- In portrait, a "rotate your device" overlay covers the fight (menus
  still work in portrait if you'd rather browse the roster that way).
- Pinch-zoom and double-tap-zoom are disabled during gameplay.
- Add to your Home Screen via Safari's Share menu for a fullscreen
  app-like experience.

If audio doesn't start: tap the 🔊 button in the corner, or just tap
anywhere on the screen first. iOS requires a user tap before any sound
can play.

## Modes

- **TOURNAMENT** — Fight 10 randomized opponents, then face the boss **THE EYE**.
  Beating the tournament unlocks The Eye as a playable character (saved in localStorage).
- **VERSUS — Player vs CPU** — Pick fighter, pick stage, fight the AI.
- **VERSUS — Player vs Player** — Local 2-player on one keyboard.

## Controls

| Action | Player 1 | Player 2 |
|---|---|---|
| Move | A / D | ← / → |
| Jump | W | ↑ |
| Crouch / Block | S | ↓ |
| Punch (8 dmg) | F | J |
| Kick (12 dmg) | G | K |
| **Special** ✦ (25 dmg, costs 50 meter) | H | L |

Best of 3 rounds, 60 seconds each. KO or most-health-at-time wins.
Meter fills as you take and deal damage. Hold ↓ + facing opponent to **block**
(reduces damage to ~25%).

On phones / tablets, **touch controls** appear automatically during fights
(P1 only — there's no good way to do P2 on a single touchscreen).

## What's Inside

- 11 fighters (10 + 1 unlockable boss): Loraxon, Alyce, Gonzo Raoul, Bucky Dome,
  Voyager X, Taarna, Zorth, Cheshire Mk.III, McKenn-X, Sister Plasma, **The Eye**.
- 11 stages, each with its own animated SVG background.
- 11 procedural music tracks (one per stage), generated live with Tone.js — no audio files.
- Win, lose, and full ending cutscenes for every character (animated SVG).
- All artwork is hand-coded SVG. There are no image files.

## Files

```
index.html        - shell, screen markup
styles.css        - all styling
characters.js     - 11 fighters (SVG render + stats + endings)
stages.js         - 11 stages (SVG backgrounds)
music.js          - Tone.js procedural soundtrack + SFX
cutscenes.js      - win/lose/ending SVG cutscenes
game.js           - state machine, fight engine, AI, tournament
```

## A Note on the "Videos"

The original brief asked for win/lose mini-videos and a tournament-ending
movie per character. Since this game is generated entirely as code in a single
conversation (no media pipeline), every "video" is actually an animated SVG
scene built per character with their own palette and story beats. They behave
the same: triggered at the right moment, watched, then dismissed.

## Tips

- Specials cost meter — bait an opponent into whiffing, then punish with **H**.
- The boss is genuinely harder. He blocks more, attacks more, and reads inputs faster.
- If audio doesn't start, click the 🔊 button to toggle it, or click anywhere to grant
  autoplay permission.

Enjoy the trip.
