import "./styles.css";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { Button } from "@mui/material";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  // const [acceptDate,setAcceptDate] = useState()
  const [cancelCall, setCancelCall] = useState(null);

  const handleDateChange = (newValue, context) => {
    console.log("context change", context);
    setTempDate(newValue); // Update temporary date on every change
    console.log(tempDate, selectedDate, "data change");
  };

  const handleAccept = (value, context) => {
    // if(selectedDate){}
    console.log("context accept", context);
    setSelectedDate(tempDate); // Update the final selected date only when the user confirms
  };

  const handleClose = () => {
    console.log("context close");
    // if (selectedDate) {
    //   setTempDate(selectedDate);
    // }
    if (cancelCall) {
      cancelCall();
    }
    // setOpen(true);
  };

  const CustomActionBar = ({ onAccept, onCancel }) => {
    return (
      <div>
        <Button
          onClick={() => {
            setCancelCall(onCancel);
            setOpen(false);
          }}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onAccept();
            setOpen(false);
            setSelectedDate(tempDate);
          }}
          style={{
            backgroundColor: "green",
            color: "white",
            marginLeft: "8px",
          }}
        >
          Custom OK
        </Button>
      </div>
    );
  };

  console.log("final", selectedDate, tempDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        // onClose={() => alert("closed")}
        // disableOpenPicker
        // closeOnSelect={false}
        value={selectedDate} // Use tempDate until confirmed
        onChange={handleDateChange}
        // onAccept={handleAccept} // Update only on accept (OK button click)
        open={open}
        onOpen={() => setOpen(true)}
        onClose={handleClose}
        slots={{
          actionBar: CustomActionBar, // Replace the default ActionBar
        }}
        slotProps={{
          layout: {
            sx: {
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "12px",
              alignItems: "flex-end",
            },
          },
        }}
        // onClose={() => setOpen(false)}
        // autoFocus
        // value={value}
        // onChange={(valuesf) => setValue(valuesf)}
        // onAccept={(valuesf) => setValue(valuesf)}
        views={["year", "day", "hours", "minutes", "seconds"]}
      />
    </LocalizationProvider>
  );
}
