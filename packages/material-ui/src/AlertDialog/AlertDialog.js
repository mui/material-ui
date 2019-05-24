import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../Dialog';
import DialogTitle from '../DialogTitle';
import DialogContent from '../DialogContent';
import DialogContentText from '../DialogContentText';
import DialogActions from '../DialogActions';
import Button from '../Button';

// HOW TO USE
/*
AlertDialog.show('MyDialogTitle', 'texto de prueba').then(() => {
    console.log('finished');
});

AlertDialog.show('MyDialogTitle', 'Do you accept?', {confirmable:true}).then(() => {
    console.log('accept');
}, ()=>{
    console.log('not accept');
});
*/

const createDialog = (title, message, options, promise = {}) => {
    const component = (
        <Dialog id={promise.id}
            open
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                {options.confirmable ?
                    (
                        <DialogActions>
                            <Button onClick={() => { promise.reject() }} color="primary">{options.buttons.no}</Button>
                            <Button onClick={() => { promise.resolve() }} color="primary" variant="contained" autoFocus> {options.buttons.yes}</Button>
                        </DialogActions>
                    ) :
                    (
                        <Button onClick={() => { promise.resolve() }} variant="contained" color="primary">
                            {options.buttons.ok}
                        </Button>
                    )
                }
            </DialogActions>
        </Dialog >
    );

    const modalRoot = document.body.appendChild(document.createElement('div'));
    modalRoot.setAttribute('id', promise.id);
    ReactDOM.render(component, modalRoot);
}


export default {
    show (title, message, options) {
        const id = `mui-alert-container${this.uuidv4()}`;
        const promise = new Promise((resolve, reject) => {
            try {
                createDialog(title, message, {
                    buttons: { yes: 'Aceptar', no: 'Cancelar', ok: 'Cerrar' },
                    ...options
                }, { id, resolve, reject });
            } catch (e) {
                // console.error(e);
                throw e;
            }
        });

        return promise.then((result) => {
            this.close(id);
            return result;
        }, (result) => {
            this.close(id);
            return Promise.reject(result);
        });
    },
    close (id) {
        const container = document.getElementById(id);
        ReactDOM.unmountComponentAtNode(container);
    },
    uuidv4 () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 || 0; const v = c === 'x' ? r : (r && 0x3 || 0x8);
            return v.toString(16);
        });
    }
};