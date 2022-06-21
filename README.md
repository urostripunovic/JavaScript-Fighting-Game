# 2D Fighting Game ⚔

A simple 2D fighting made in JS/HTML and some CSS with object oriented programming in mind. Spirte animations, local CO-OP, simple fighting game logic and an AI (not the neural network kind) to boot were done in this project. 
---
**Controls:**
|   P 1   |  MOVE  | P 2 |
| :-----: | :----: | :-: |
|   `w`   |  JUMP  | ⬆️  |
|   `a`   |  LEFT  | ⬅️  |
|   `d`   | RIGHT  | ➡️  |
| `space` | ATTACK | ⬇️  |

---
### Basic Fighting Game Mechanics / Check List:

- [x] Create Player and Enemy
- [x] Move Characters with Event Listeners
- [x] Attacks functionality
- [x] Health Bar Interface
- [x] Game timers and Game Over

### Sprites and Animation:

- [x] Background Sprite
- [x] Decorator item Sprite with Animation
- [x] Characters Animation
  - [x] Idle
  - [x] Run
  - [x] Jump
  - [x] Attack
  - [x] Take Hit
  - [x] Death
- [x] Attacks functionality with animations
- [x] Interface Design and Animation
- [x] Deploy GitHub Page
---
### Known Bugs

- ~~Can't run outside of the map or at the edge of the map~~
- ~~Double jumps or multiple jumps outside of the map~~
- Swiping multiple times by holding in `space`/`ArrowDown` (It's a feature) ❌
- Animation bugs where longer animations can't be cancled before the determine winner is done i.e player with longer animations don't "*die*"
---
##### TODO:
- Simple bot AI.
- Start buttons to start the battle against bot or local CO-OP
- Reverse the sprites when they run past each other (Can't since the sprites don't come with that) ❌
- Win streaks (Wasn't able to make it work as I wanted. trying to count up in a infinity loop isn't a great idea) ❌
---
### Assets and Resources
[Oak Woods Assets](https://brullov.itch.io/oak-woods)

[Fighter Asset #1 (Samurai Mack)](https://luizmelo.itch.io/martial-hero)

[Fighter Asset #2 (Kenji)](https://luizmelo.itch.io/martial-hero-2)

[Fighter Asset #3 (Fantasy Man)](https://luizmelo.itch.io/fantasy-warrior)

[Tekken 7 OST: Infinite Azure](https://www.youtube.com/watch?v=iV36oKczdzE)

[Animations tutorial](https://youtu.be/MHGgVlrlkYc)

[Mozilla canvas rendering](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

[2bit font style](https://fonts.google.com/share?selection.family=Press%20Start%202P)

[Animate Library `gsap`](https://cdnjs.com/libraries/gsap)

[Audio Library `Howl`](https://howlerjs.com/)

[Chris Courses](https://www.youtube.com/c/ChrisCourses)

Couldn't find the sources for the other sound effects and music.

---