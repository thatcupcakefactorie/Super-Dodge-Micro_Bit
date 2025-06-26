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
            if (Player.get(LedSpriteProperty.X) <= 0) {
                Player.set(LedSpriteProperty.X, 4)
            } else {
                Player.move(-1)
            }
        }
    }
    if (DifficultyMenu) {
        music.play(music.createSoundExpression(WaveShape.Square, 957, 210, 204, 155, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        DifficultyMenu = false
    }
})
function Opening () {
    gameActive = false
    DifficultyMenu = false
    GameOver = false
    basic.showString("Super Dodge!")
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
        basic.pause(100)
        basic.showLeds(`
            # # . # #
            . . # . .
            . . # . .
            . # . # .
            # # # # #
            `)
        basic.pause(100)
    }
    basic.pause(2000)
    basic.clearScreen()
    basic.showString("Difficulty?")
    DifficultyMenu = true
    while (DifficultyMenu) {
        basic.showNumber(Difficulty)
    }
    basic.clearScreen()
    startGame(0)
}
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
            if (Player.get(LedSpriteProperty.X) >= 4) {
                Player.set(LedSpriteProperty.X, 0)
            } else {
                Player.move(1)
            }
        }
    }
    if (DifficultyMenu) {
        Difficulty += 1
        if (Difficulty > 9) {
            Difficulty = 0
        }
    }
})
let newPosition: game.LedSprite = null
let Difficulty = 0
let LoopCount = 0
let Enemy: game.LedSprite[] = []
let Player: game.LedSprite = null
let GameOver = false
let DifficultyMenu = false
let gameActive = false
basic.showLeds(`
    . . # . .
    . . # # .
    . . # . .
    # # # # #
    . # # # .
    `)
gameActive = false
DifficultyMenu = false
GameOver = false
basic.pause(5000)
basic.clearScreen()
basic.showString("V.1.1.1")
basic.showIcon(IconNames.Happy)
basic.pause(2000)
basic.clearScreen()
Opening()
