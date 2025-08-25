export enum CurrencyEnum {
    IRR = 'IRR',
    USD = 'USD',
    EUR = 'EUR',
    TRY = 'TRY',
}

export enum AccountTypeEnum {
    CASH = 'CASH',
    BANK = 'BANK',
    DIGITAL = 'DIGITAL', // مثل کیف پول
}

export enum TransactionTypeEnum {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
    INTERNAL_TRANSFER = 'INTERNAL_TRANSFER',
    SAVINGS = 'SAVINGS',
    LOAN = 'LOAN',
    REPAYMENT = 'REPAYMENT',
}
export enum TransactionStatusEnum {
    CONFIRMED = 'CONFIRMED',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
}
export enum LoanStatusEnum {
    PENDING = 'PENDING',        // وام در حال بررسی یا ثبت اولیه
    ACTIVE = 'ACTIVE',          // وام فعال است و بازپرداخت شروع نشده یا ادامه دارد
    PAID_OFF = 'PAID_OFF',      // وام کامل بازپرداخت شده
    CANCELLED = 'CANCELLED',    // وام لغو شده
}``