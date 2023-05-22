import math

def verify_puzzle(numlist):
    correctness = True

    # check if row-wise, 
    # no need checking last element (valued 0, stands for empty tile)
    for i in range(len(numlist)-1):
        if i+1 != numlist[i]:
            correctness = False
            break

    if correctness == False:
    # check if column-wise
        n = int(math.sqrt(len(numlist)))
        for i in range(n):
            for j in range(n):
                if j*n+i+1 != len(numlist) and numlist[j*n+i] != i*n+j+1:
                    correctness = False
                    break

    return correctness
