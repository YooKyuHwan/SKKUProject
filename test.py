import csv

data = [
    ['id', 'name', 'price', 'amount'],
    ['1', 'apple', '5000', '5'],
    ['2', 'pencil', '500', '42'],
    ['3', 'pineapple', '8000', '5'],
    ['4', 'pen', '1500', '10']
]

f = open("data2.csv", "w")
writer = csv.writer(f)

for row in data:
    writer.writerow(row) ## 여기 주목!

f.close()