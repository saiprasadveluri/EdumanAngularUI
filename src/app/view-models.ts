export class ChalanVM {
    public chlnId:string|undefined;
    public stuMapId:string|undefined;
    public  chlnNum :string|undefined;
    public stdId :string|undefined;
    public regdNo:string|undefined;
    public  name :string|undefined;
    public stndardname :string|undefined;
    public TotalDue:number=0;
    public info:ChalanInfoVM[]=[];
   // public List<SelectListItem> PayOptions { get; set; } = new List<SelectListItem>();
    //public int SelPayOpt { get; set; }
    public logoBase64 :string|undefined;
}

export class ChalanInfoVM{
    public fID:string|undefined;
    public  hN:string|undefined;
    public termNo:number=0;
    public totAmt:number=0;
    public paid:number=0;
    public due:number=0;
    public dueMon:number=0;
    public concession:number=0;
}

export class PayChalanVM
    { 
        public hidChlnId :string|undefined;
        public selPayOpt:number=0;
        public payNotes :string|undefined;
    }


    export class FeeCollectionReceiptLineVM
    {
        public FeeHeadName :string|undefined;
        public termNo:number=0;
        public amt:number=0;
    }

    export class FeeCollectionReceiptVM
    {
        public successFalg:number=0;

        public msg :string|undefined;
        public success:number=0;
        public regdNo:string|undefined;
        public name:string|undefined;
        public payType:number=0;
        public paydate:Date|undefined;
        public notes:string|undefined;
        public lines:FeeCollectionReceiptLineVM[]=[];
        public totFee:number=0;
        public LogoBase64:string|undefined;
        public totAmount:number=0;
        public inWords:string|undefined;
    }