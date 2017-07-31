'use strict';
import * as vscode from 'vscode';

const IDENTIFIER = "commander";
const COMMANDS = {
    RUN_COMMANDS: `${IDENTIFIER}.runCommands`,
    WAIT: `${IDENTIFIER}.wait`
}

type CommandStatement = string | any[];

function runCommands(commandQueue: CommandStatement[]) {
    let p = Promise.resolve() as Promise<any>
    commandQueue.forEach((commandStatement) => {
        p = p.then(() => {
            let command: string;
            let commandArgs: any[];
            if (commandStatement instanceof Array) {
                [command, ...commandArgs] = commandStatement;
            } else {
                command = commandStatement;
                commandStatement = []
            }
            return promisifyCommand(command, commandArgs);
        })
    })
}

function promisifyCommand(command: string, args = []) {
    return new Promise((resolve, reject) => {
        if (command == COMMANDS.WAIT) {
            let [time = 40] = args;
            setTimeout(() => { resolve(); }, time);
            return
        }
        if (command == COMMANDS.RUN_COMMANDS) {
            vscode.window.showWarningMessage(`Using ${COMMANDS.RUN_COMMANDS} inside a command queue. ignoring this now.`);
            return resolve();
        }
        // console.log(`executing command ${command} ${JSON.stringify(args)}`);
        vscode.commands.executeCommand(command, args).then(() => { resolve() })
    })
}

export function activate(context: vscode.ExtensionContext) {
    let commands = [
        vscode.commands.registerCommand(COMMANDS.RUN_COMMANDS, (args) => {
            runCommands(args)
        })
    ]
    context.subscriptions.push(...commands);
}

export function deactivate() { }