# Commander

Commander is a VSCode extension that allows you to run multiple commands with one shortcut.

## Usage
To use Commander, just edit your keybord shortcut config file, and write your command queue, see this example:
```json
   {
        "key": "ctrl+alt+n",
        "command": "commander.runCommands",
        "args": [
            "emacs.cursorDown", "emacs.cursorDown", "emacs.cursorDown", "emacs.cursorDown", "emacs.cursorDown"
        ],
        "when": "editorTextFocus && !suggestWidgetVisibles"
    },
 ```

-----
*Enjoy!*
