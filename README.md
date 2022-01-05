## A fun competitive and customizable game for teams!

Built using react (hooks), styled components, react router.

## Live link at https://team-timeout.netlify.app/create

- Currently for desktop only :)

![Play game screenshot](https://github.com/sarit-chaet-hudis/team-timeout/blob/main/src/Assets/images/Screenshot2.JPG)
![Create new game screenshot](https://github.com/sarit-chaet-hudis/team-timeout/blob/main/src/Assets/images/Screenshot1.JPG)
![Team Timout Flowchart](https://github.com/sarit-chaet-hudis/team-timeout/blob/main/src/Assets/images/team%20timeout-general%20flow.jpg)

## Game Walkthrough

1. Customize game: Choose gameblocks that represent everyday team activities
2. Get unique link to your team game
3. Play and see your team's highscores!

## Known issues and Todos

- Sometimes last highscore isn't saved correctly
- Use global state management to simplify code
- Each player should only appear once in highscore table
- Blocks can sometimes be swapped with adjacent blocks
- New game button doesn't reshuffle the blocks
- Game mechanics (valid moves) doesn't consider boundaries (but no errors)

## Acknowledgements

- Game logic mostly based on [Ania Kubow's tutorial](https://github.com/kubowania/candy-crush-reactjs/blob/main/src/App.js) which was a huge time saver! I did clean/reuse/generalize quite a bit.

bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Emoji picker component by [emoji-picker-react](https://github.com/ealush/emoji-picker-react). worked like a charm and out of the box!!
