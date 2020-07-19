import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm({values, handleChange}) {


  // const onSubmit = (data, e) => {
  //       e.preventDefault();
  //       console.log(data)
        // Axios.post(`${baseURL}auth/local`, data)
        //     .then(function (response) {
        //         console.log(response);
        //         // window.location = "http://localhost:3000/";
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    // };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={handleChange('address')}
            defaultValue={values.address}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="secondAddress"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={handleChange('secondAddress')}
            defaultValue={values.secondAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={handleChange('city')}
            defaultValue={values.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          id="state"
           name="state" 
           label="State/Province/Region" 
           fullWidth 
            onChange={handleChange('state')}
            defaultValue={values.state}
           />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={handleChange('zip')}
            defaultValue={values.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            onChange={handleChange('country')}
            defaultValue={values.country}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="E-mail"
            fullWidth
            autoComplete="email"
            type="email"
            onChange={handleChange('email')}
            defaultValue={values.email}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
