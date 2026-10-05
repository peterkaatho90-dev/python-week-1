# Part C - List Report

items = ["bread", "avocado", "milk", "sweet potatoes", "tea"]

# 1. Numbered list
number = 1
for item in items:
    print(str(number) + ". " + item)
    number = number + 1

# 2. Count names with more than 4 letters
long_count = 0
for item in items:
    if len(item) > 4:
        long_count = long_count + 1
print("Items with more than 4 letters:", long_count)

# 3. Longest name (loop comparison, no max())
longest = items[0]
for item in items:
    if len(item) > len(longest):
        longest = item
print("Longest item name:", longest)
