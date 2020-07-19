import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));

export default function AccountDetails() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);
    const classes = useStyles();

    return (
        <div style={{ marginLeft: "0 auto", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Merchant Bank Information
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.root}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="outlined-flexible-fname"
                        label="First Name"
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        inputRef={register({ required: true, maxLength: 80 })}
                        // value={value}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-flexible-lname"
                        label="Last Name"
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        inputRef={register({ required: true, maxLength: 100 })}
                        // value={value}
                        variant="outlined"
                    />
                </div>

                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="E-Mail"
                        type="email"
                        placeholder="Email"
                        name="Email"
                        inputRef={register({
                            required: true,
                            pattern: /^\S+@\S+$/i,
                        })}
                        // value={value}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-multiline-flexible"
                        label="Phone Number"
                        type="tel"
                        placeholder="Phone number"
                        name="phone"
                        ref={register({
                            required: true,
                            minLength: 6,
                            maxLength: 12,
                        })}
                        // value={value}
                        variant="outlined"
                    />
                </div>

                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Bank Name"
                        type="text"
                        placeholder="Bank Name"
                        name="bankName"
                        ref={register({ required: true })}
                        // value={value}
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-multiline-flexible"
                        label="Account Number"
                        type="number"
                        placeholder="Account Number"
                        name="accountNumber"
                        ref={register({ required: true })}
                        // value={value}
                        variant="outlined"
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={(classes.button, classes.submit)}
                    startIcon={<SaveIcon />}
                    type="submit"
                    style={{ marginTop: "2%" }}
                >
                    Save
                </Button>
            </form>
        </div>
    );
}
