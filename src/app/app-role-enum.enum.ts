export enum AppRoleEnum {
        SITE_ADMIN=1,
        ORG_ADMIN=2,
        STUIDENT=3,
        TEACHER=4,
        CASHIER=5   
}

export enum AddFeeMasterActionEnum
{
        SCHOOL_LEVEL=1,
        CLASS_LEVEL=2,
        STUDENT_LEVEL=3
}

export enum FetchTermFeeTypeEnum
{
        GETBY_HEADID=1,
        GETBY_FEEMASTERID=0
}

export enum ConcessionTypeEnum
{
        OUTSTANDING_STUDENT=1,
        REFERRAL=2,
        OTHER=3
}

export enum PayTypeEnum
{
        CASH=1,
        BANK=2,
        GPAY=3
}