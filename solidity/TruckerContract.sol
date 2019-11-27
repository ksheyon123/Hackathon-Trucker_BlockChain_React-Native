pragma solidity ^0.5.0;

import "./TrcToken.sol";

contract TruckerContract {

    TrcToken private trcTokenContract;
    address payable private deployer;

    /*
    배송 상태 {상차지 확인, 하차지 확인}
    */
    enum State { UP_CHECK,
    DOWN_CHECK }

    /*
    물품 Struct 
    price 가격
    seller_owner 물품 주인
    = 프라이버시로 인해 가격만 TX에 제공
    */
    struct Product {
        uint price;
        address payable companys_owner;
    }

    /*
    화주 Struct 
    account 사용자 계좌
    paymentArray 배송내역
    */
    struct Company {
        address account;
        uint ableBalance;
        uint[] paymentArray;
    } 

    /*
    차주 Struct 
    account 사용자 계좌
    paymentArray 배송내역
    */
    struct Trucker {
        address account;
        uint[] paymentArray;
    } 

    /*
    결제 Struct 
    price 토큰 가격
    truckerAddress 판매자 계좌주소
    comapnyAddress 구매자 계좌주소
    state 배송상태
    */
    struct Payment {
        uint price;
        address payable truckerAddress;
        address payable comapnyAddress;
        State state;
    }

    uint private productId; //물품 번호
    uint private paymentId; //배송 번호

    mapping(address => Company) companyList;
    mapping(uint => Payment) payList;
    mapping(uint => Product) productList;

    constructor(TrcToken _trcTokenContract) public {
        trcTokenContract = _trcTokenContract;
        deployer = msg.sender;
        productId = 0;
        paymentId = 0;
    }

    event evtUpLoadProductFromTrucker();
    event evtDownLoadProductFromTrucker();


    //결제 내역 갯수 0이 아닌가
    modifier isZeroId(uint _id) {
        require( _id != 0 );
        _;
    }

    //결제 내역 갯수가 초과를 했는가?
    modifier isOverPayment(uint _payCount) {
        require( _payCount <= _get_payment_count() );
        _;
    }


    //물품 갯수 불러오기
    function _get_product_count() view public isZeroId(productId) returns (uint)  { 
        return productId-1;
    }


    /*
    ============================상차지 부분================================
    */
    //상차지에 물건을 실을때.
    function _load_up_product(address payable _companyAddress, address payable _truckerAddress, uint _price) public payable {
        require(_productId <= _get_product_count());
        require(companyList[_companyAddress].ableBalance >= companyList[_companyAddress].ableBalance - _price);
        require( (companyList[_companyAddress].ableBalance - _price) >= 0 );
        companyList[_companyAddress].paymentArray.push(paymentId);
        payList[paymentId].price = _price;
        payList[paymentId].companyAddress = _companyAddress;
        payList[paymentId].truckerAddress = _truckerAddress;
        payList[paymentId].state = State.UP_CHECK;

        //토큰으로 구매하는 부분
        trcTokenContract.approve(_companyAddress, _companyAddress, 0);
        trcTokenContract.increaseAllowance(_companyAddress, _companyAddress, _price);
        
        companyList[_companyAddress].ableBalance -= _price;

        _add_payid();
        emit evtUpLoadProductFromTrucker();
    }

    //하차지에 물건을 내릴때
    function _load_down_product(uint _payId) public 
    isPurchaseCompletion(payList[_payId].state) isOverPayment(_payId) {
        trcTokenContract.transferFrom(payList[_payId].companyAddress, payList[_payId].companyAddress, 
        payList[_payId].truckerAddress, payList[_payId].price);
        payList[_payId].state = State.DOWN_CHECK;
        companyList[payList[_payId].companyAddress].ableBalance += payList[_payId].price;
        emit evtDownLoadProductFromTrucker();
    }

     /*
    ===========================토큰 구매 부분============================
    */
    //토큰 구매
    //web에서 현금만큼만 구매할 수 있도록 제어 해줘야함.
    function _token_purchase(address _companyAddress, uint _value) public {
        trcTokenContract.approve(deployer, _companyAddress, _value);
        trcTokenContract.transferFrom(deployer, _companyAddress, _companyAddress, _value);
        userLcompanyListist[_companyAddress].ableBalance += _value;
    }


    /*
    ===========================Balance get ============================
    */
    function _get_ablebalance(address _companyAddress) public view returns (uint balance) {
        return companyList[_companyAddress].ableBalance;
    }

    //Real Balance get
    function _get_balanceOf(address _address) public view returns (uint balance) {
        return trcTokenContract.balanceOf(_address);
    }

}