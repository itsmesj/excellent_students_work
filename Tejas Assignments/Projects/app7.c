#include <stdio.h>
#include <string.h>

struct BankAccount {
    char accountHolder[100];
    int accountNumber;
    float balance;
};
void createAccount(struct BankAccount *account);
void deposit(struct BankAccount *account, float amount);
void withdraw(struct BankAccount *account, float amount);
void showStatement(struct BankAccount account);

int main() {
    struct BankAccount account;
    int choice;
    float amount;

    createAccount(&account);

    while (1) {
        printf("\n--- BANK MENU ---\n");
        printf("1. Deposit\n");
        printf("2. Withdraw\n");
        printf("3. Show Statement\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter amount to deposit: ");
                scanf("%f", &amount);
                deposit(&account, amount);
                break;
            case 2:
                printf("Enter amount to withdraw: ");
                scanf("%f", &amount);
                withdraw(&account, amount);
                break;
            case 3:
                showStatement(account);
                break;
            case 4:
                printf("Thank you for using our service.\n");
                return 0;
            default:
                printf("Invalid choice. Try again.\n");
        }
    }
}

void createAccount(struct BankAccount *account) {
    printf("Enter account holder name: ");
    scanf(" %[^\n]%*c", account->accountHolder); 
    printf("Enter account number: ");
    scanf("%d", &account->accountNumber);
    printf("Enter initial balance: ");
    scanf("%f", &account->balance);
}

void deposit(struct BankAccount *account, float amount) {
    if (amount > 0) {
        account->balance += amount;
        printf("Deposited %.2f successfully.\n", amount);
    } else {
        printf("Invalid deposit amount.\n");
    }
}

void withdraw(struct BankAccount *account, float amount) {
    if (amount > 0 && amount <= account->balance) {
        account->balance -= amount;
        printf("Withdrawn %.2f successfully.\n", amount);
    } else {
        printf("Invalid or insufficient funds.\n");
    }
}

void showStatement(struct BankAccount account) {
    printf("\n--- ACCOUNT STATEMENT ---\n");
    printf("Account Holder: %s\n", account.accountHolder);
    printf("Account Number: %d\n", account.accountNumber);
    printf("Current Balance: %.2f\n", account.balance);
}
