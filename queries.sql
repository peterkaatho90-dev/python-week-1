-- SQL Assignment (classicmodels database, MySQL syntax)

-- Question 1: Total payment amount for each payment date (5 latest dates)
SELECT paymentDate, SUM(amount) AS total_amount
FROM payments
GROUP BY paymentDate
ORDER BY paymentDate DESC
LIMIT 5;

-- Question 2: Average credit limit per customer name and country
SELECT customerName, country, AVG(creditLimit) AS avg_credit_limit
FROM customers
GROUP BY customerName, country;

-- Question 3: Total price of products ordered
SELECT productCode,
       quantityOrdered,
       SUM(quantityOrdered * priceEach) AS total_price
FROM orderdetails
GROUP BY productCode, quantityOrdered;

-- Question 4: Highest payment amount for each check number
SELECT checkNumber, MAX(amount) AS highest_amount
FROM payments
GROUP BY checkNumber;
