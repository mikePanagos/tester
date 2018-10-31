
def countingToTen (i):
    if(i>10):
        return "Sorry"
    elif(i==10):
        return str(10)+" "
    else:
        return str(i)+" "+countingToTen(i+1)+" "




print (countingToTen(0))

