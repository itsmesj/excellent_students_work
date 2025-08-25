#include <stdio.h>
#include "app10.h"

char board[3][3];
char currentPlayer = 'X';

void initializeBoard() {
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            board[i][j] = ' ';
}

void printBoard() {
    printf("\n");
    for (int i = 0; i < 3; i++) {
        printf(" %c | %c | %c \n", board[i][0], board[i][1], board[i][2]);
        if (i < 2) printf("---|---|---\n");
    }
    printf("\n");
}

int isWin() {
    for (int i = 0; i < 3; i++) {
        if (board[i][0] == currentPlayer && board[i][1] == currentPlayer && board[i][2] == currentPlayer) return 1;
        if (board[0][i] == currentPlayer && board[1][i] == currentPlayer && board[2][i] == currentPlayer) return 1;
    }
    if (board[0][0] == currentPlayer && board[1][1] == currentPlayer && board[2][2] == currentPlayer) return 1;
    if (board[0][2] == currentPlayer && board[1][1] == currentPlayer && board[2][0] == currentPlayer) return 1;
    return 0;
}

int isDraw() {
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (board[i][j] == ' ') return 0;
    return 1;
}

void switchPlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
}

void aiMove() {
    int i, j;

    // Try to win
    for (i = 0; i < 3; i++)
        for (j = 0; j < 3; j++) {
            if (board[i][j] == ' ') {
                board[i][j] = currentPlayer;
                if (isWin()) return;
                board[i][j] = ' ';
            }
        }

    char opponent = (currentPlayer == 'X') ? 'O' : 'X';
    for (i = 0; i < 3; i++)
        for (j = 0; j < 3; j++) {
            if (board[i][j] == ' ') {
                board[i][j] = opponent;
                if (isWin()) {
                    board[i][j] = currentPlayer;
                    return;
                }
                board[i][j] = ' ';
            }
        }

    if (board[1][1] == ' ') {
        board[1][1] = currentPlayer;
        return;
    }

    int corners[4][2] = {{0,0}, {0,2}, {2,0}, {2,2}};
    for (i = 0; i < 4; i++) {
        int r = corners[i][0], c = corners[i][1];
        if (board[r][c] == ' ') {
            board[r][c] = currentPlayer;
            return;
        }
    }

    int sides[4][2] = {{0,1}, {1,0}, {1,2}, {2,1}};
    for (i = 0; i < 4; i++) {
        int r = sides[i][0], c = sides[i][1];
        if (board[r][c] == ' ') {
            board[r][c] = currentPlayer;
            return;
        }
    }
}

void playGame() {
    int row, col;
    initializeBoard();

    while (1) {
        printBoard();

        if (currentPlayer == 'X') {
            printf("Player %c, enter row and column (0-2): ", currentPlayer);
            scanf("%d %d", &row, &col);

            if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] != ' ') {
                printf("Invalid move. Try again.\n");
                continue;
            }

            board[row][col] = currentPlayer;
        } else {
            printf("AI is making a move...\n");
            aiMove();
        }

        if (isWin()) {
            printBoard();
            printf("Player %c wins!\n", currentPlayer);
            break;
        }

        if (isDraw()) {
            printBoard();
            printf("It's a draw!\n");
            break;
        }

        switchPlayer();
    }
}
int main() {
    playGame();
    return 0;
}
