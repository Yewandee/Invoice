import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './invoice.css'
import { NavLink, } from 'react-router-dom';
import logo from '../images/pelpay.jpg'


const Invoice = () => {

    const Invoicedata = [
        {
            "requestSuccessful": true,
            "responseData": {
                "invoiceNumber": "000073",
                "customer": {
                    "merchantCustomerId": "STARERE",
                    "customerLastName": "test",
                    "customerFirstName": "user",
                    "customerEmail": "string@gmail.com",
                    "customerPhoneNumber": "09087656765",
                    "customerAddress": "string",
                    "customerCity": "string",
                    "customerStateCode": "LA",
                    "customerPostalCode": "100210",
                    "customerCountryCode": "NG",
                    "merchantCode": "tes0000522",
                    "id": 1092538,
                    "isActive": true,
                    "createdDate": "2024-01-10T09:58:09.840187+01:00"
                },
                "amount": 1840000,
                "dueDate": "2024-01-10",
                "invoiceNote": "string",
                "discountAmount": 500,
                "discountType": "Percentage",
                "shippingCost": 0,
                "subTotal": 1840000,
                "tax": 0,
                "taxType": "Percentage",
                "paymentUrl": "https://payment.pelpay.ng/pay?adviceReference=0d952a36-e1a8-48a3-8faa-3abfa1be7ef8",
                "status": "PENDING",
                "paymentReference": "0d952a36-e1a8-48a3-8faa-3abfa1be7ef8",
                "invoiceType": "OneTime",
                "items": [
                    { "id": 129, "name": "Iphone 15", "quantity": 2, "amount": 120000 },
                    { "id": 130, "name": "Macbook Air", "quantity": 4, "amount": 400000 }
                ],
                "paymentHistories": []
            },
            "message": "Successful",
            "responseCode": "00"
        }
    ]

    const userData = Invoicedata[0].responseData;

    const trimDate = (date) => {
        const trimmedData = date
        return trimmedData;
    }

    const status = userData.status
    const getStatusBackgroundColor = (status) => {
        if (status === "PAID") {
            return { backgroundColor: "green" };
        } else if (status === "PENDING") {
            return { backgroundColor: "#666666" }
        } else if (status === "CANCELLED") {
            return { backgroundColor: "red" }
        }
        else {
            return {}
        }
    };

    const discount = userData.discountType
    const getDiscountType = () => {
        if (discount === "Percentage") {
            return ("%")
        }
        else if (discount === "Amount") {
            return ("₦")
        }
        else {
            return
        }
    }

    const tax = userData.taxType
    const getTaxType = () => {
        if (tax === "Percentage") {
            return ("%")
        }
        else if (tax === "Amount") {
            return ("₦")
        }
        else {
            return
        }
    }




    const total = userData.items[0].quantity * userData.items[0].amount
    const subTotal = total + userData.tax + userData.shippingCost + userData.discountAmount

    return (
        // {userData.items.map(val=> )}
        <div className='invoice-body'>

            <div className='status' style={getStatusBackgroundColor(status)}>
                <div className='status-one'>
                    <h3>Invoice Number #{userData.invoiceNumber}</h3>
                </div>
                <div className='status-two'>
                    <h3>{userData.status}</h3>
                </div>
            </div>

            <div className='container'>

                <div className='line-one'>
                    <div className='from'>
                        <h4>From:</h4>
                        <p>{userData.customer.merchantCode}</p>
                    </div>
                    <div className='logo'>
                        <img src={logo} />
                    </div>

                </div>

                <div className='line-two'>

                    <div className='to'>
                        <h4>Bill to:</h4>
                        <p>{userData.customer.customerFirstName} {userData.customer.customerLastName}</p>
                        <p>{userData.customer.customerAddress}</p>
                        <p>{userData.customer.customerCity} {userData.customer.customerCountryCode}</p>
                        <p></p>
                    </div>

                    <div className='issue'>
                        <p>{userData.invoiceNumber}</p>
                        <p>Issued: {trimDate(userData.customer.createdDate)}</p>
                        <p>Due: {userData.dueDate}</p>
                    </div>

                </div>
            </div>

            <div className='items mt-2'>
                <table>
                    <tr>
                        <th>Items</th>
                        <th className='qty'>Quantity</th>
                        <th>Price(NGN)</th>
                    </tr>
                    {userData.items.map((val) => {
                        return (
                            <tr>
                                <td>{val.name}</td>
                                <td>{val.quantity}</td>
                                <td>{val.amount}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>

            <div className='total'>
                <div className='total-one'>
                    <p>Subtotal(NGN):</p>
                    <p>Tax: </p>
                    <p>Shipping:   </p>
                    <p>Discount:  </p>
                    <p>Total(NGN): </p>

                </div>
                <div className='total-two'>
                    <p>{total} </p>
                    <p>{userData.tax} {getTaxType()}</p>
                    <p>{userData.shippingCost}</p>
                    <p> {userData.discountAmount}{getDiscountType()}</p>
                    <p>{subTotal}</p>

                </div >

            </div>

            <div className='payment-btn mt-5' >
                <a href={userData.paymentUrl} className='download'>Download PDF</a>
                <a href={userData.paymentUrl} className='proceed'>Proceed to Payment</a>

            </div>

            <div className='pelpay mt-5'>
                <p className='pelpayy mt-3 '>Secured by PelPay<i class="fa-solid fa-lock lock"></i></p>

            </div>

            <div className='chams'>

            <a href='/' className='website'>www.chamsswitch.com</a>
            </div>



        </div>
    )
}

export default Invoice