#include <stdio.h>
#include <string.h>

void stringUtility(const char *str1, const char *str2) {
    char copy[100];
    char concat[200];
    
    // 1. String Length
    printf("Length of str1: %lu\n", strlen(str1));
    printf("Length of str2: %lu\n", strlen(str2));

    // 2. String Copy
    strcpy(copy, str1);
    printf("Copied str1 into copy: %s\n", copy);

    // 3. String Concatenation
    strcpy(concat, str1);
    strcat(concat, str2);
    printf("Concatenated str1 and str2: %s\n", concat);

    // 4. String Comparison
    int cmp = strcmp(str1, str2);
    if (cmp == 0)
        printf("str1 and str2 are equal.\n");
    else if (cmp < 0)
        printf("str1 is less than str2.\n");
    else
        printf("str1 is greater than str2.\n");
}

int main() {
    const char *string1 = "Hello";
    const char *string2 = "World";

    stringUtility(string1, string2);

    return 0;
}
