import React  from "react";
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from "@material-ui/core/es/Paper/Paper";

const styles = (theme) => ({
    paper: {
        padding: theme.spacing(1),
    },
    popover: {
        zIndex: 1300
    }
});


class PopoverComponent extends React.Component {
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

export default withStyles(styles)(PopoverComponent);
