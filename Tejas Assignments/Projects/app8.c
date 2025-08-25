#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fp;
    char filename[100];
    int n, i;
    
    // Structure to hold user record
    struct Record {
        int id;
        char name[50];
        int age;
    };

    printf("Enter the filename to create: ");
    scanf("%s", filename);

    // Create and open file for writing
    fp = fopen(filename, "w");
    if (fp == NULL) {
        printf("Error creating file!\n");
        return 1;
    }

    printf("How many records do you want to enter? ");
    scanf("%d", &n);

    struct Record rec;

    for (i = 0; i < n; i++) {
        printf("\nRecord %d:\n", i + 1);
        printf("Enter ID: ");
        scanf("%d", &rec.id);
        printf("Enter Name: ");
        scanf(" %[^\n]", rec.name);  // Reads string with spaces
        printf("Enter Age: ");
        scanf("%d", &rec.age);

        // Write record to file
        fprintf(fp, "ID: %d, Name: %s, Age: %d\n", rec.id, rec.name, rec.age);
    }

    fclose(fp);
    printf("\nRecords saved successfully to '%s'.\n", filename);

    return 0;
}
