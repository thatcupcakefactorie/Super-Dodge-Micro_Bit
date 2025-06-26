function startGame (difficulty: number) {
    Player = game.createSprite(2, 4)
    Player.set(LedSpriteProperty.Brightness, 127)
    Enemy = [game.createSprite(randint(0, 4), 0)]
    gameActive = true
    LoopCount = 0
    while (true) {
        basic.pause(2000 / ((LoopCount / 35 + 1) * (Difficulty + 1) / 3))
        if (!(GameOver)) {
            if (Enemy.length > 0) {
                for (let index = 0; index <= Enemy.length - 1; index++) {
                    newPosition = Enemy[index]
                    newPosition.change(LedSpriteProperty.Y, 1)
                    Enemy[index] = newPosition
                }
                for (let index = 0; index <= Enemy.length - 1; index++) {
                    if (Enemy[index].get(LedSpriteProperty.Y) > 3) {
                        if (Enemy[index].isTouching(Player)) {
                            GameOver = true
                            gameOverSequence()
                        }
                        Enemy[index].delete()
                        Enemy.removeAt(index)
                        if (!(GameOver)) {
                            music.play(music.createSoundExpression(WaveShape.Triangle, 2054, 0, 255, 118, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                        }
                    }
                }
                if (Difficulty < 5) {
                    if (randint(0, 1) == 0) {
                        Enemy.push(game.createSprite(randint(0, 4), 0))
                    }
                } else {
                    if (randint(0, 1) == 0) {
                        Enemy.push(game.createSprite(randint(0, 4), 0))
                    }
                }
            } else {
                Enemy.push(game.createSprite(randint(0, 4), 0))
            }
            LoopCount += 1
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (gameActive) {
        if (!(GameOver)) {
            music.play(music.createSoundExpression(WaveShape.Sine, 1725, 1725, 204, 155, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            Player.move(-1)
            if (Player.get(LedSpriteProperty.X) <= 0) {
                Player.set(LedSpriteProperty.X, 4)
            }
        }
    }
    if (DifficultyMenu) {
        music.play(music.createSoundExpression(WaveShape.Square, 957, 210, 204, 155, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        DifficultyMenu = false
    }
})
function gameOverSequence () {
    music.stopAllSounds()
    if (Enemy.length > 0) {
        for (let index = 0; index <= Enemy.length - 0; index++) {
            Enemy.pop().delete()
        }
    }
    Player.delete()
    music.play(music.createSoundExpression(WaveShape.Sawtooth, 1506, 0, 255, 252, 3000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    basic.clearScreen()
    music.play(music.createSoundExpression(WaveShape.Square, 408, 408, 98, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    basic.showString("Game Over!")
    basic.showString("Score..." + convertToText(LoopCount))
    basic.pause(2000)
    control.reset()
}
input.onButtonPressed(Button.B, function () {
    if (gameActive) {
        if (!(GameOver)) {
            music.play(music.createSoundExpression(WaveShape.Sine, 1725, 1725, 204, 155, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            Player.move(1)
            if (Player.get(LedSpriteProperty.X) >= 4) {
                Player.set(LedSpriteProperty.X, 0)
            }
        }
    }
    if (DifficultyMenu) {
        Difficulty += 1
        if (Difficulty > 9) {
            Difficulty = 0
        }
    }
    // This doesn't work. the "show string" block can't be skipped and i cant be bothered to try and recode the entire text system from scratch.
    if (false) {
        MenuIsBeingSkipped = true
        music.stopAllSounds()
        basic.clearScreen()
    }
})
let newPosition: game.LedSprite = null
let LoopCount = 0
let Enemy: game.LedSprite[] = []
let Player: game.LedSprite = null
let Difficulty = 0
let MenuIsBeingSkipped = false
let GameOver = false
let DifficultyMenu = false
let gameActive = false
gameActive = false
DifficultyMenu = false
let SkippableMenu = true
GameOver = false
basic.showString("Super Dodge!")
SkippableMenu = true
basic.showLeds(`
    # # . # #
    . . # . .
    . . # . .
    . # . # .
    # # # # #
    `)
basic.pause(2000)
for (let index = 0; index < 3; index++) {
    basic.showLeds(`
        # # . # #
        . . # . .
        . . # . .
        . . # . .
        # # # # #
        `)
    music.play(music.createSoundExpression(WaveShape.Sawtooth, 452, 452, 151, 151, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    if (MenuIsBeingSkipped) {
        continue;
    }
    basic.pause(100)
    basic.showLeds(`
        # # . # #
        . . # . .
        . . # . .
        . # . # .
        # # # # #
        `)
    if (MenuIsBeingSkipped) {
        continue;
    }
    basic.pause(100)
}
basic.pause(2000)
basic.clearScreen()
SkippableMenu = true
basic.showString("Difficulty?")
SkippableMenu = false
DifficultyMenu = true
while (DifficultyMenu) {
    basic.showNumber(Difficulty)
}
basic.clearScreen()
startGame(0)
