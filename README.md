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
### Known Bugs

- ~~Can't run outside of the map or at the edge of the map~~
- ~~Double jumps or multiple jumps outside of the map~~
- ~~Swiping multiple times by holding in `space`/`ArrowDown` (Fixed it so the AI can't abuse it)~~ 
- Animation bugs where longer animations can't be canceled before the determine winner is done i.e player with longer animations don't "*die*" ❌
---
##### TODO:
- Simple bot AI. (Could've done more but it's time to move on) ✔️
- Start buttons to start the battle against bot or local CO-OP ✔️
- Pick between Ninja and Fantasy Man to go against ([If I feel like it, sprites are already implemented](https://cdnmetv.metv.com/z50xp-1619719725-16226-list_items-no.jpg)) ❌
- Reverse the sprites when they run past each other (Sprites don't support it) ❌
- Win streaks (I have an idea on how to solve it but maybe when i return to the project) ❌
- Clean up the code a bit so there isn't to much resued code (AI and game logic for enemy comes to mind). ❌ 
- Multiplayer with [Socket.io](https://socket.io/). ❌
---
### Assets and Resources
[Oak Woods Assets](https://brullov.itch.io/oak-woods)

[Fighter Asset #1 (Samurai)](https://luizmelo.itch.io/martial-hero)

[Fighter Asset #2 (Ninja)](https://luizmelo.itch.io/martial-hero-2)

[Fighter Asset #3 (Fantasy Man)](https://luizmelo.itch.io/fantasy-warrior)

[Tekken 7 OST: Infinite Azure](https://www.youtube.com/watch?v=iV36oKczdzE)

[Animations tutorial](https://youtu.be/MHGgVlrlkYc)

[Mozilla canvas rendering](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

[2bit font style](https://fonts.google.com/share?selection.family=Press%20Start%202P)

[Animate Library `gsap`](https://cdnjs.com/libraries/gsap)

[Audio Library `Howl`](https://howlerjs.com/)

[Chris Courses](https://www.youtube.com/c/ChrisCourses)

[EasyGameDev](https://www.youtube.com/watch?v=6Rmj-4r2lrg&list=PLGvgepw5e1ayt7KaozE7DfQaEQwJD8oBI)

[PothOnProgramming](https://www.youtube.com/watch?v=zbqwFb8DJgQ)

[Multiple Swipes](https://stackoverflow.com/questions/61532192/how-can-i-get-keydown-events-only-once-each-time-the-key-is-pressed-even-if-it)

Couldn't find the sources for the other sound effects and music.

---