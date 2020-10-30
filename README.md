## To sync your code with the repo's

1. `git fetch --all`
2. `git reset --hard origin/master`

The above commands will result in your local repo mirroring the remote's code exactly.  Any changes you've made to files, committed or not, will be replaced by the files in the remote (origin).


// state:
    - wrongLetters // array - provides the number of wrong guesses as well - figure out
        if they have lost - add
    - secretWord // string
    - guessWord // string
    - gameStatus // null = in progress;
        "Good luck" - > "YOU'RE A FAILURE" || "YOU WON GOOD FOR U".
# hangman
