import React, {useEffect, useState} from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

//popup that tells the user the url they have entered is either invalid or does not exist
//was unfortunately only able to get this popup to show once per session since this popup was not opened directly by a button being clicked
//but shortened urls will not be generated for invalid urls regardless
export const ErrorPopup = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>URL Error</DialogTitle>
        <DialogContent>
          <p>The URL you have typed in is invalid. Please try again!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorPopup;
