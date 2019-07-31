# 等额本息计算方法
def monthlyPayment1(principal, rate, duration):
    monthly_rate = rate / (12 * 100)   # convert 4.9 to 0.049 and  monthly interest rate
    month_amounts =  duration

    # 每月月供
    monthly_payment = (principal * monthly_rate * (1 + monthly_rate) ** month_amounts) / (
    (1 + monthly_rate) ** month_amounts - 1)
    #总利息
    total_interest_payable = monthly_payment * month_amounts - principal
    print('-----------------------------------')
    print ('Total interest payable is %.2f ' % total_interest_payable)

    for i in range (1, month_amounts + 1):
        #每月应还利息
        monthly_interest_payable = principal * monthly_rate * ((1 + monthly_rate) ** month_amounts - (1 + monthly_rate) ** (i - 1 ))/ ((1 + monthly_rate) ** month_amounts -1)
        #每月应还本金
        monthly_principal_payable = principal * monthly_rate * (1 + monthly_rate) ** (i - 1)/ ((1 + monthly_rate) ** month_amounts -1)
        #每月利息占比
        monthly_interest_percentage = monthly_interest_payable * 100 / monthly_payment

        print('-----------------------------------')
        print ('%dth monthly payment is : %.2f (Interest: %.2f and Principal: %.2f)' % (i, monthly_payment,monthly_interest_payable,monthly_principal_payable))
        # print('%dth month interest percentage is %.2f %%' % (i,monthly_interest_percentage))

    return

# 等额本金计算方法
def monthlyPayment2(principal, rate, duration):
    monthly_rate = rate / (12 * 100)
    total_interest = 0
    # 每月本金
    for i in range (1, duration+1):
        monthly_principal = principal / duration
        monthly_interest = principal * (1 - (i-1)/duration) * monthly_rate
        monthly_payment = monthly_principal + monthly_interest
        total_interest += monthly_interest
        print('-----------------------------------')
        print ('%dth monthly payment is : %.2f (Interest: %.2f and Principal: %.2f)' % (i, monthly_payment,monthly_interest,monthly_principal))
    total_payment = total_interest + principal
    print('-----------------------------------')
    print ('Total payment is %.2f ' % total_payment)
    print ('Total interest is %.2f ' % total_interest)


if __name__ == '__main__':
    # principal = int(input('Please input your loan amounts:'))
    # year_rate = float(input('Please input Year Debt Interest Rate (%):(such as 4.9,it means 4.9%)'))
    # year_duration = int(input('Please input Debt month Duration (3/6/9/12/24/36):'))
    # # monthlyPayment1(principal, year_rate, year_duration)
    monthlyPayment1(10000, 24, 12)
    monthlyPayment2(10000, 24, 12)