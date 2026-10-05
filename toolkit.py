# Python Toolkit
# A menu-driven program with four small tools:
# a guessing game, a to-do list, a calculator and a name formatter.

import random


def show_menu():
    """Print the main menu."""
    print()
    print("==============================")
    print("   PYTHON TOOLKIT MENU")
    print("==============================")
    print("1. Number Guessing Game")
    print("2. To-Do List")
    print("3. Simple Calculator")
    print("4. Name Formatter")
    print("5. Quit")


# TOOL 1 - Number Guessing Game
# The computer picks a number from 1 to 20. The player has 6 tries and gets
# "too high" / "too low" hints. Uses a loop and conditionals.
def guessing_game():
    secret = random.randint(1, 20)
    max_tries = 6
    tries = 0
    print("\nI'm thinking of a number between 1 and 20. You have 6 tries!")

    while tries < max_tries:
        guess_text = input(f"Guess #{tries + 1}: ").strip()

        # Only count the try if the player typed a whole number
        if not guess_text.isdigit():
            print("Please enter a whole number.")
            continue

        guess = int(guess_text)
        tries += 1

        if guess == secret:
            if tries == 1:
                print("Brilliant! You got it on your first try!")
            else:
                print(f"Brilliant! You got it in {tries} tries!")
            return
        elif guess < secret:
            print("Too low!")
        else:
            print("Too high!")

    print(f"Out of tries! The number was {secret}. Better luck next time.")


# TOOL 2 - To-Do List
# The player can add tasks, remove a task by its number, or view the list.
# The list is created in main() so it survives between menu visits.
def todo_list(tasks):
    print("\n--- To-Do List ---")

    while True:
        action = input("add / remove / show / back: ").strip().lower()

        if action == "add":
            task = input("What is the task? ").strip()
            if task == "":
                print("A task can't be empty.")
            else:
                tasks.append(task)
                print(f"Added '{task}'. You now have {len(tasks)} task(s).")

        elif action == "remove":
            if len(tasks) == 0:
                print("Your list is empty, nothing to remove.")
            else:
                number = input("Number of the task to remove: ").strip()
                if number.isdigit() and 1 <= int(number) <= len(tasks):
                    removed = tasks.pop(int(number) - 1)
                    print(f"Removed '{removed}'.")
                else:
                    print(f"Please enter a number from 1 to {len(tasks)}.")

        elif action == "show":
            if len(tasks) == 0:
                print("Your to-do list is empty. Nice and clear!")
            else:
                position = 1
                for task in tasks:
                    print(f"{position}. {task}")
                    position += 1

        elif action == "back":
            print("Returning to the main menu.")
            return

        else:
            print("Please type add, remove, show or back.")


# TOOL 3 - Simple Calculator
# Asks for two numbers and an operator (+, -, *, /) and prints the result.
# Uses conditionals to pick the operation and to avoid dividing by zero.
def calculator():
    print("\n--- Simple Calculator ---")
    try:
        first = float(input("First number: "))
        second = float(input("Second number: "))
    except ValueError:
        print("That wasn't a valid number. Back to the menu!")
        return

    operator = input("Operator (+, -, *, /): ").strip()

    if operator == "+":
        result = first + second
    elif operator == "-":
        result = first - second
    elif operator == "*":
        result = first * second
    elif operator == "/":
        if second == 0:
            print("You can't divide by zero!")
            return
        result = first / second
    else:
        print(f"Sorry, '{operator}' isn't an operator I know.")
        return

    print(f"{first} {operator} {second} = {result}")


# TOOL 4 - Name Formatter
# Takes a name in any capitalisation and shows it neatly formatted, with
# initials and the number of letters. Uses string methods and a loop.
def name_formatter():
    print("\n--- Name Formatter ---")
    name = input("Enter your full name: ").strip()

    if name == "":
        print("You didn't type anything!")
        return

    parts = name.title().split()   # split() also removes extra spaces
    neat_name = " ".join(parts)
    initials = ""
    letter_count = 0

    for part in parts:
        initials += part[0] + "."
        letter_count += len(part)

    print(f"Formatted name: {neat_name}")
    print(f"Initials: {initials}")
    print(f"Your name has {letter_count} letters.")


# MAIN PROGRAM
# Shows the menu again and again until the player chooses Quit.
def main():
    tasks = []  # shared to-do list, kept for the whole session

    print("Welcome to the Python Toolkit! Let's get started.")

    while True:
        show_menu()
        choice = input("Choose an option (1-5): ").strip()

        if choice == "1":
            guessing_game()
        elif choice == "2":
            todo_list(tasks)
        elif choice == "3":
            calculator()
        elif choice == "4":
            name_formatter()
        elif choice == "5":
            print("Thanks for using the Python Toolkit. Goodbye!")
            break
        else:
            print(f"Sorry, '{choice}' is not a valid option. Please pick a number from 1 to 5.")


main()
