import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paystack from "./Paystack"
import {PaystackHookExample} from "./Paystack"


export default function PaymentForm() {

  const [email, setEmail] = React.useState("")

  const handleChange = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Make Payment
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
           type="email" 
           required 
           id="email" 
           label="E-Mail" 
           fullWidth 
           autoComplete="cc-email" 
           name="email"
           onChange={handleChange}
           />
        </Grid>
        <Grid item xs={12}>

        <PaystackHookExample 
        email={email} 
        />

        </Grid>
      </Grid>
    </React.Fragment>
  );
}
