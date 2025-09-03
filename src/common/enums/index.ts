export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TransactionTypeEnum {
  INCOME = 'income', // ورود پول (درآمد)
  EXPENSE = 'expense', // خروج پول (مخارج)
  TRANSFER = 'transfer', // انتقال بین حساب‌های شخصی
  LOAN = 'loan', // وام (می‌تواند ورود یا خروج باشد)
  DEBT = 'debt', // قرض (می‌تواند ورود یا خروج باشد)
  ADJUSTMENT = 'adjustment', // تعدیل و اصلاح
  PERSON_TRANSFER = 'person_transfer', // انتقال بین اشخاص (اعضای خانواده، دوستان)
}
