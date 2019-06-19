import { render } from "react-dom";
import React, { Component } from "react";

import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Message,
  Modal
} from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DatePickerSample extends Component {
  state = {
    date: moment(),
    showModal: false
  };
  handleChangeDate = (date) => {
    this.setState({
      date
    });
  };

  openModal = (e) => {
    console.log("opening modal: ", e);
    this.setState({
      showModal: true
    });
  };

  closeModal = (e) => {
    console.log("closing modal", e);
    this.setState({
      showModal: false
    })
  };

  render() {
    return (
      <Container>
        <Divider hidden />
        <Header as="h1" floated="left">
          Date Picker Modal Bug Example
        </Header>

        <Divider hidden clearing />
        <Button basic onClick={() => this.setState({ showModal: true })}>
          Show
        </Button>
        <Modal
          open={this.state.showModal}
          closeIcon={true}
          onClose={this.closeModal}
        >
          <Modal.Header>Date Picker Test</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Select Date</Header>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleChangeDate}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <Divider hidden clearing />
        <Message info>
          Click show modal button to replicate the issue. When you select the
          date from datepicker, it will also close the modal.
        </Message>
      </Container>
    );
  }
}

export default DatePickerSample
