import React from 'react';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { CartContext } from "../../components/Cart/CartContext";
import Button from '@material-ui/core/Button';

    
    
    export const PaystackHookExample = ({email}) => {
        const [cart, dispatchCart] = React.useContext(CartContext);

        // const [userMail, setUserMail] = React.useState('')
        

        const config = {
            reference: (new Date()).getTime(),
            email: email || "mail@mail.com",
            amount: Math.round(cart.totalPrice * 100),
            publicKey: 'pk_test_a476bd0273651babf2cdf0d063bb56ae89425717',
        };

        // if (email) {
        //     config.email = userMail
        // }

        const initializePayment = usePaystackPayment(config);
        return (
            <div>
            <Button 
                onClick={() => {
                    initializePayment()
                }} 
                variant="contained" 
                color="primary"
            >
                Complete Payment
            </Button>
            </div>
        );
    };
    
    function Paystack({config, email}) {

        const componentProps = {
            ...config,
            text: 'Paystack Button Implementation',
            onSuccess: () => null,
            onClose: () => null
        };
    
      return (
        <>
            <PaystackHookExample />
            {/* <PaystackButton {...componentProps} /> */}
            {/* <PaystackConsumer {...componentProps} >
                {({initializePayment}) => <button onClick={() => initializePayment()}>Paystack Consumer Implementation</button>}
            </PaystackConsumer> */}
        </>
      );
    }
