import React  from "react";
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from "@material-ui/core/es/Paper/Paper";
import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    paper: {
        padding: theme.spacing(1),
    },
    popover: {
        zIndex: 1300
    }
});


class TriggeredPopper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
        this.timeout = null;
    }
    onMouseOut = (e) => {
        const self = this;
        console.log('mouse out', e.currentTarget);
        if(this.timeout===null) {
            this.timeout = setTimeout(() => {
                const {onVisibleChange=()=>{}} = self.props;
                self.setState({anchorEl: null});
                onVisibleChange(false);
                self.timeout = null
            }, 750);
        }
    };
    render() {
        const {state:{anchorEl}, props:{content, placement, children, classes, trigger, visible=false, onVisibleChange=()=>{}}} = this;
        let events;
        let paperEvents = {};
        if(trigger==='hover'){
            events = {
                onMouseOver:(e)=>{
                    if(this.timeout !== null){
                        clearTimeout(this.timeout);
                        this.timeout = null;
                    }
                    if(this.state.anchorEl === null) {
                        this.setState({anchorEl: e.currentTarget});
                        onVisibleChange(true);
                    }
                },
                onMouseOut: this.onMouseOut
            };
            paperEvents = {
                onMouseEnter:(e)=>{
                if(this.timeout !== null){
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }},
                onMouseLeave:this.onMouseOut
            };
        }else if(trigger==='click'){
            events = {
                onClick: (e) => {
                    this.setState({anchorEl: e.currentTarget});
                    onVisibleChange(true);
                }
            }
        }
        const patchedChildren = React.cloneElement(children, {
            ...children.props,
            ...events
        });
        return (
            <>
                {patchedChildren}
                <Popper
                    id="mouse-over-popover"
                    className={classes.popover}
                    open={trigger==='click'?visible:(trigger==='hover'?anchorEl !== null:false)}
                    anchorEl={anchorEl}
                    placement={placement}
                >
                    <Paper
                        className={classes.paper}
                        {...paperEvents}
                    >
                        {content}
                    </Paper>
                </Popper>
            </>
        );
    }
}

export default withStyles(styles)(TriggeredPopper);

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HoverTriggeredPopper() {
  const classes = useStyles();

  return (
    <div>
        <TriggeredPopper content={
             <div className={classes.paper}>The content of the Popper.</div>
        } placement={'bottom-start'} trigger={'hover'}
        >
          <button aria-describedby={id} type="button">
            Toggle Popper
          </button>
        </TriggeredPopper>
    </div>
  );
}

export default function ClickTriggeredPopper() {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
        <TriggeredPopper 
            content={<div className={classes.paper}>The content of the Popper.</div>} 
            placement={'bottom-start'} 
            trigger={'click'} 
            visible={visible}
            onVisibleChange={(visible)=>setVisible(visible)}
        >
          <button aria-describedby={id} type="button">
            Toggle Popper
          </button>
        </TriggeredPopper>
    </div>
  );
}
