import { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";

import CouponService from "../services/coupons";

const CouponInput = ({ user, discount }) => {
  console.log("USER IS:", user)
  let username = user.username
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [not, setNot] = useState("");

  const toggle = () => {
    setOpen(!open);
  };

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        //console.log("ID is:", id)
        const res = await CouponService.getCoupons();
        const FoundCoupon = res.find((el) => el.code === coupon);

        console.log("Input coupon is:", coupon)
        console.log("Found coupon is:", FoundCoupon)

        if (!FoundCoupon) {
          setNot("Incorrect coupon code");
          setTimeout(() => {
            setNot("");
          }, 5000);
          return;
        }

        if (FoundCoupon.used.includes(username)) {
          setNot("You have already used this coupon.");
          setTimeout(() => {
            setNot("");
          }, 5000);
          return;
        }

        if (FoundCoupon && !FoundCoupon.used.includes(username)) {
          discount(FoundCoupon.discount);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          await CouponService.useCoupon(username, FoundCoupon.id);
        }
      } catch (exception) {
        console.log(exception);
      }
    },
    [coupon, discount, username]
  );

  return (
    <div>
      <Button
        variant="contained"
        sx={{ backgroundColor: "lightcoral" }}
        onClick={toggle}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Coupons
        </Typography>
      </Button>
      <Dialog open={open} onClose={toggle}>
        <DialogTitle>Enter Coupon Code</DialogTitle>
        <DialogContent>
          <DialogContentText>{not}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Code"
            fullWidth
            variant="standard"
            value={coupon}
            onChange={({ target }) => setCoupon(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submit}>Submit</Button>
          <Button onClick={toggle}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CouponInput;
