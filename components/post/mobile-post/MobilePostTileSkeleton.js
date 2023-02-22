import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => ({
  stillSkeletonContainer: {
    height: 0,
    overflow: "hidden",
    paddingTop: "55%",
    position: "relative",
    marginTop: "10px",
    borderRadius: '10px',
  },
  stillSkeleton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: '10px',

  },
  titleSkeletonContainer: {
    margin: '0px 10px 0px 10px'
  },
  titleSkeleton: {
    height: "35px",
    margin: "0px 120px 0px 120px",
    padding: "0px"
  },
  withSkeleton: {
    height: "25px",
    margin: "0px 100px 0px 100px",
    padding: "0px"
  },
  dateSkeleton: {
    height: "25px",
    margin: "0px 120px 0px 120px",
    padding: "0px"
  }
  }));

export default function MobilePostTileSkeleton({ pageSize, desk, type }) {
  const classes = useStyles();
  
  return (
    <Grid container direction="row" >
      {[...Array(pageSize)].map((e, i) => {
        return (
          <Grid item key={i} xs={12} sm={6} md={4} lg={4} xl={3} >
            <div className={classes.stillSkeletonContainer} >
              <Skeleton variant="rect" className={classes.stillSkeleton} />   
            </div>          
            <div className={classes.titleSkeletonContainer} > 
              <Skeleton className={classes.titleSkeleton} />
              <Skeleton className={classes.withSkeleton} />
              <Skeleton className={classes.dateSkeleton} /> 
            </div>
          </Grid>
        )
        })}
    </Grid>
    );
}