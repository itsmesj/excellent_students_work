#include <stdio.h>

#define ROW 3
#define COL 3

void displayArrays(int a[ROW][COL], int b[ROW][COL]) {
    printf("Array A:\n");
    for (int i = 0; i < ROW; i++) {
        for (int j = 0; j < COL; j++)
            printf("%d ", a[i][j]);
        printf("\n");
    }

    printf("Array B:\n");
    for (int i = 0; i < ROW; i++) {
        for (int j = 0; j < COL; j++)
            printf("%d ", b[i][j]);
        printf("\n");
    }
}

void multiplyArray(int a[ROW][COL], int factor) {
    printf("Array A multiplied by %d:\n", factor);
    for (int i = 0; i < ROW; i++) {
        for (int j = 0; j < COL; j++)
            printf("%d ", a[i][j] * factor);
        printf("\n");
    }
}

void addArrays(int a[ROW][COL], int b[ROW][COL]) {
    printf("Addition of A and B:\n");
    for (int i = 0; i < ROW; i++) {
        for (int j = 0; j < COL; j++)
            printf("%d ", a[i][j] + b[i][j]);
        printf("\n");
    }
}

void subtractArrays(int a[ROW][COL], int b[ROW][COL]) {
    printf("Subtraction of A - B:\n");
    for (int i = 0; i < ROW; i++) {
        for (int j = 0; j < COL; j++)
            printf("%d ", a[i][j] - b[i][j]);
        printf("\n");
    }
}

void divideArrays(int a[ROW][COL], int b[ROW][COL]) {
    printf("Division of A / B:\n");
    for (int i = 0; i < ROW; i++) {
        for (int j = 0; j < COL; j++) {
            if (b[i][j] != 0)
                printf("%d ", a[i][j] / b[i][j]);
            else
                printf("X "); // X for division by zero
        }
        printf("\n");
    }
}

int main() {
    int a[ROW][COL] = {{1,2,3},{4,5,6},{7,8,9}};
    int b[ROW][COL] = {{9,8,7},{6,5,4},{3,2,1}};
    int choice, factor;

    do {
        printf("\nMenu:\n");
        printf("1. Display Arrays\n");
        printf("2. Multiply Array A by a number\n");
        printf("3. Add Arrays\n");
        printf("4. Subtract Arrays\n");
        printf("5. Divide Arrays\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: displayArrays(a, b); break;
            case 2:
                printf("Enter multiplication factor: ");
                scanf("%d", &factor);
                multiplyArray(a, factor);
                break;
            case 3: addArrays(a, b); break;
            case 4: subtractArrays(a, b); break;
            case 5: divideArrays(a, b); break;
            case 0: printf("Exiting...\n"); break;
            default: printf("Invalid choice!\n");
        }
    } while (choice != 0);

    return 0;
}
