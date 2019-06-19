import * as Dom from 'react-dom';
import * as React from 'react';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import { MuiThemeProvider } from 'material-ui/styles';

// Material-UI needs the react-tap-event-plugin activated
require("react-tap-event-plugin")();

export class MyComponent extends React.Component {
    const state = {
        selectedDate: new Date()
    }

    private datePickerDialog;

    private setDatePickerDialogReference(ref) {
        // React passes undefined/null if the reference has been unmounted.
        if (ref) {
            // Overwrite the dialog's handleRequestClose and handleWindowKeyUp functions.
            ref.handleWindowKeyUp = (...args) => console.log("Dialog tried to call handleWindowKeyUp.");
            ref.handleRequestClose = (...args) => console.log("Dialog tried to call handleRequestClose.");
        }

        this.datePickerDialog = ref;
    }

    private openDatePicker() {
        this.datePickerDialog.show();
    }

    private openDatePickerOnEnter(e: React.KeyboardEvent<any>) {
        if (e.key === "Enter") {
            this.openDatePicker();
        }
    }

    private setDateReceived(date: Date) {
        this.setState({ selectedDate: date });
    }

    public render() {
        return (
            <div>
                <h1>{`Date Selected: ${this.state.selectedDate.toLocaleDateString()}`}</h1>
                <ol>
                    <li>{`Select the text field.`}</li>
                    <li>{`Press tab to select the button next.`}</li>
                    <li>{`Press enter with the button selected to open the DatePickerDialog.`}</li>
                </ol>
                <input
                    tabIndex={0}
                    type={"text"}
                    style={{ width: 300, margin: "10px, 0" }}
                    value={"Select me, then press tab and enter."}
                    readOnly />
                <div tabIndex={1}>
                    <button
                        type={"button"}
                        onKeyUp={e => this.openDatePickerOnEnter(e)}
                        onClick={e => this.openDatePicker()}>
                        {"Open DatePicker"}
                    </button>
                </div>
                <MuiThemeProvider>
                    <DatePickerDialog
                        ref={r => this.setDatePickerDialogReference(r)}
                        firstDayOfWeek={0 /* Must provide firstDayOfWeek or rendering of calendar will be broken. */}
                        autoOk={false /* Don't close the dialog until the user presses 'Okay'. */}
                        onAccept={date => this.setDateReceived(date)}
                        initialDate={this.state.selectedDate} />
                </MuiThemeProvider>
            </div>
        )
    }
}

(function () {
    Dom.render(<MyComponent />, document.getElementById("contenthost"));
}());
