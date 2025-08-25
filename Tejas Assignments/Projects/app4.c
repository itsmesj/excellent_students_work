#include <stdio.h>

#define MAX_NUM 100  

int main() {
    int arr[] = {1, 3, 5, 3, 7, 1, 3, 9, 5, 5, 1, 0};
    int size = sizeof(arr) / sizeof(arr[0]);

    int freq[MAX_NUM] = {0}; 
    for (int i = 0; i < size; i++) {
        if (arr[i] >= 0 && arr[i] < MAX_NUM) {
            freq[arr[i]]++;
        }
    }
    printf("Number frequencies in array:\n");
    for (int i = 0; i < MAX_NUM; i++) {
        if (freq[i] > 0) {
            printf("%d : %d\n", i, freq[i]);
        }
    }

    return 0;
}
