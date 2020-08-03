import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function ViewRating() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
    </div>
  );
}
