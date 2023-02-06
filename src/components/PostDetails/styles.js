import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    // borderRadius: '20px',
    objectFit: 'cover',
    // width: '100%',
    // height: '100%',
    maxHeight: '600px',
    maxWidth: '100%',
    height: 'auto',
    // 
    // position: 'relative',
    // // top: 0,
    // // left: 0,
    // zIndex: 1,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    // display: 'flex',
    // justifyContent: 'center'
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex', justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '205px', overflowY: 'auto', marginRight: '29px'
  },

  // canvas styling
  generalBody: {
    margin: '0px',
    // padding: '30px',
    overflow: 'hidden',
    // take out background when done
    // background: '#313131'
  },

  canvas: {
    cursor: "pointer",
  },

  tools: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    paddingTop: '9px',
    paddingBottom: '9px',
  },

  colorField :{
    height: '40px',
    width: '40px',
    minHeight: '40px',
    maxHeight: '40px',
    cursor: 'pointer',
    display: 'inline-block',
    boxSizing: 'border-box',
    borderRadius: '50%',
    border: '3px solid white',
    alignSelf: 'center',
    margin: '0 9px',
  },

  button: {
    alignSelf: 'center',
    width: '80px',
    height: '40px',
    border: '2px solid white',
    cursor: 'pointer',
    color: 'white',
    background: '#222',
    fontWeight: 'bold',
    // margin: '0 9px',
    borderRadius: '5%',

    transitionDuration: '0.4s',
    position: 'relative',
    '&:hover': {
      transitionDuration: '0.1s',
      backgroundColor: '#3A3A3A',
      transition: 'all 0.5s',
      // boxShadow: '0 0 1px 40px white',
      '&:after': {
        boxShadow: '0 0 0 0 white',
        position: 'absolute',
        borderRadius: '4em',
        left: 0,
        top:0,
        opacity: 1,
        transition: '0s',
      },
    },
    '&:active': {
      top: '2px',
    },
  },

  // 
  colorPicker: {
    alignSelf: 'center',
    maring: '0 9px',
    height: '45px',
  },

  penRange1: {
    alignSelf: 'center',
    margin: '0 9px',
    height: '25px',
    width: '25px',
    minHeight: '25px',
    maxHeight: '25px',
    cursor: 'pointer',
    display: 'inline-block',
    boxSizing: 'border-box',
    borderRadius: '50%',
    border: '3px solid white',
  },

  penRange2: {
    alignSelf: 'center',
    margin: '0 9px',
    height: '40px',
    width: '40px',
    minHeight: '40px',
    maxHeight: '40px',
    cursor: 'pointer',
    display: 'inline-block',
    boxSizing: 'border-box',
    borderRadius: '50%',
    border: '3px solid white',
  },

  checkMark: {
    // marginTop: '2px',
    width: '1.5em',
    length: '1.5em',
  },

  resolveBtn:{
    cursor: 'pointer',
  },

  containIdSection:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },

  enterIdSection:{
    marginTop: '15px',
    width: '250px',
    marginLeft: '20px',
    // height: '30px',
  },

  getIdSection:{
    marginTop: '33px',
    width: '250px',
    marginLeft: '22px',
    fontSize: '18px',
  },

  addIdButton:{
    height: '40px',
    width: '140px',
    marginTop: '30px',
    marginLeft: '14px',
  },
  
  showIdButton:{
    height: '40px',
    width: '140px',
    marginLeft: '14px',
    marginTop: '15px',
  },

}));