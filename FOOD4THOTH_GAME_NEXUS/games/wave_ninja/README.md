# Psychedelic Wave Ninja Battle — Concept Base

This is a new base prototype built from the working fighter animation idea, but shifted into a zoomed-out action game concept.

## What it includes

- Zoomed-out perspective
- One chosen champion
- Multiple enemies fighting at once
- Waves of enemies
- Multiple levels
- Different animated psychedelic backgrounds
- Platforms and ledges
- Jumping physics
- Punching
- Kicking
- Jump-punching
- Jump-kicking
- Special attacks
- Auto Movie Mode
- Playable Mode with keyboard or iPhone touch controls
- Boss level with Lord Kaleidojaw
- Procedural tap-start music for iOS

## How to run

Open `index.html`.

For iPhone:
1. Open in Safari or Chrome.
2. Tap `START WAVES + MUSIC`.
3. Choose `Auto Movie Mode` to watch it play itself.
4. Choose `Playable Mode` to use touch buttons.

## Controls

Keyboard:
- A / D or arrows: move
- W / Space / Up: jump
- F: punch
- G: kick
- H: special

Touch:
- Left / Right
- Jump
- Punch
- Kick
- Special

## Design purpose

This is meant as the base for the next evolution:

- Bruce Lee / John Wick style one-character-vs-many sequence
- Ninja battle movement
- Platform fighting
- Enemies coming in waves
- Boss progression
- Expanding rooms, backgrounds, hazards, and story moments


## Defeated Enemy Dissolve Patch

Defeated enemies now:
- become passable immediately
- stop attacking and stop blocking movement
- fall down under gravity
- land on the nearest platform or floor
- fade/dissolve into particles
- disappear after the dissolve completes


## Forward Movement + Auto Regen Patch

This version fixes the freeze after the first wave.

Changes:
- After all active enemies are defeated, the hero enters an `advance` state.
- In Auto Movie Mode, the hero keeps moving forward while the next wave/level loads.
- The hero slowly recharges health in Auto Movie Mode.
- Between waves, auto health regeneration is faster.
- Added a visible NEXT WAVE arrow cue.
- Reworked the wave transition lock so the next wave cannot get stuck.


## Next Wave Spawn Fix

This version fixes the bug where the next wave/new level never appeared after clearing level one.

Cause:
- The transition lock accidentally blocked the scheduled `spawnWave()` call.

Fix:
- Scheduled next-wave calls are now allowed.
- Level transitions explicitly release the lock.
- Added a failsafe so the hero cannot stay stuck in advance mode.


## Platform Escape Patch

Auto Movie Mode now detects when the hero is stuck on a platform above enemies.

New behavior:
- If enemies are below and the hero cannot reach them, the hero turns toward a platform edge.
- The hero walks off the platform.
- The hero drops down to the lower area.
- Normal chase/fight behavior resumes afterward.


## Enemy Platform Escape Patch

Enemies now have the same platform drop intelligence as the hero.

New behavior:
- If an enemy is stuck on a platform above the hero,
- it turns toward a platform edge,
- walks off / drops down,
- then resumes chasing and attacking normally.


## Fast Mode + Suit Lapel Style Patch

Changes:
- Fast Action is now much faster: 1.75x instead of 1.25x.
- Added Ultra Chaos mode at 2.35x.
- Fighter bodies now use a suit/jacket silhouette with:
  - dark jacket body
  - shirt panel
  - colored lapels
  - tie/seam shape
  - button details


## Grand Finale Patch

This version adds a true boss-ending celebration.

When the boss is defeated:
- the game enters a dedicated finale state
- the camera recenters for a cinematic victory shot
- huge celebration text appears
- repeated particle/firework bursts fill the scene
- the HUD updates to show victory
- a finale overlay banner appears
- the menu returns after the full celebration finishes


## Speed + Power-Up + Hero Strength Patch

Changes:
- Ultra speed is now the default standard speed.
- Added faster modes:
  - Hyper Riot at 3.15x
  - MAXIMUM MELTDOWN at 4.25x
- Main hero is stronger against waves:
  - higher max health
  - stronger attacks
  - temporary opening buffs
  - faster auto-mode health regeneration
- Added pickups:
  - Health
  - Mega Health
  - Power Boost
  - Shield
  - Haste
- Defeated enemies can drop pickups.
- Pickups are magnetized toward the hero when close.
- Boosts show a glowing ring around the hero.
