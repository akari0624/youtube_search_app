import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationRounded({pagesCount, rowsPerPage, totalPage, onChangePage}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={pagesCount} onChange={onChangePage} variant="outlined" shape="rounded" rowsPerPage={rowsPerPage}/>
    </div>
  );
}