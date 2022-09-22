import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  // note material-ui has special media query break point setup. this says for breakpoints that are small or down, do this flexDirection
  [theme.breakpoints.down('sm')]:{
    mainContainer: {
      flexDirection: 'column-reverse'
    }
  }
}));