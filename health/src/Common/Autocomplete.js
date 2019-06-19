import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateLocation} from '../Patient/action'
import { blue } from '@material-ui/core/colors';

const suggestions = [

  { label: 'Adambakkam' },
  { label: 'Adyar' },
  { label: 'Alandur' },
  { label: 'Alwarpet' },
  { label: 'Alwarthirunagar' },
  { label: 'Ambattur' },
  { label: 'Aminjikarai' },
  { label: 'Anna Nagar' },
  { label: 'Annanur' },
  { label: 'Arumbakkam' },
  { label: 'Ashok Nagar' },
  { label: 'Avadi' },
  { label: 'Ayanavaram' },
  { label: 'Besant Nagar' },
  { label: 'Basin Bridge' },
  { label: 'Chepauk' },
  { label: 'Chetput' },
  { label: 'Chintadripet' },
  { label: 'Chitlapakkam' },
  { label: 'Choolai' },
  { label: 'Choolaimedu' },
  { label: 'Chrompet' },
  { label: 'Egmore' },
  { label: 'Ekkaduthangal' },
  { label: 'Ennore' },
  { label: 'Foreshore Estate' },
  { label: 'Fort St. George' },
  { label: 'George Town' },
  { label: 'Gopalapuram' },
  { label: 'Government Estate' },
  { label: 'Guindy' },
  { label: 'Gerugambakkam' },
  { label: 'IIT Madras' },
  { label: 'Injambakkam' },
  { label: 'ICF' },
  { label: 'Iyyapanthangal' },
  { label: 'Jafferkhanpet' },
  { label: 'Karapakkam' },
  { label: 'Kattivakkam' },
  { label: 'Kazhipattur' },
  { label: 'K.K. Nagar' },
  { label: 'Keelkattalai' },
  { label: 'Kilpauk' },
  { label: 'Kodambakkam' },
  { label: 'Kodungaiyur' },
  { label: 'Kolathur' },
  { label: 'Korattur' },
  { label: 'Korukkupet' },
  { label: 'Kottivakkam' },
  { label: 'Kotturpuram' },
  { label: 'Kottur' },
  { label: 'Kovilambakkam' },
  { label: 'Koyambedu' },
  { label: 'Kundrathur' },
  { label: 'Madhavaram' },
  { label: 'Madhavaram Milk Colony' },
  { label: 'Madipakkam' },
  { label: 'Madambakkam' },
  { label: 'Maduravoyal' },
  { label: 'Manali' },
  { label: 'Manali New Town' },
  { label: 'Manapakkam' },
  { label: 'Mandaveli' },
  { label: 'Mangadu' },
  { label: 'Mannady' },
  { label: 'Mathur' },
  { label: 'Medavakkam' },
  { label: 'Meenambakkam' },
  { label: 'MGR Nagar' },
  { label: 'Minjur' },
  { label: 'Mogappair' },
  { label: 'MKB Nagar' },
  { label: 'Mount Road' },
  { label: 'Moolakadai' },
  { label: 'Moulivakkam' },
  { label: 'Mugalivakkam' },
  { label: 'Mudichur' },
  { label: 'Mylapore' },
  { label: 'Nandanam' },
  { label: 'Nanganallur' },
  { label: 'Neelankarai' },
  { label: 'Nemilichery' },
  { label: 'Nesapakkam' },
  { label: 'Nolambur' },
  { label: 'Noombal' },
  { label: 'Nungambakkam' },
  { label: 'Otteri' },
  { label: 'Padi' },
  { label: 'Pakkam' },
  { label: 'Palavakkam' },
  { label: 'Pallavaram' },
  { label: 'Pallikaranai' },
  { label: 'Pammal' },
  { label: 'Park Town' },
  { label: 'Parrys Corner' },
  { label: 'Pattabiram' },
  { label: 'Pattaravakkam' },
  { label: 'Pazhavanthangal' },
  { label: 'Peerkankaranai' },
  { label: 'Perambur' },
  { label: 'Peravallur' },
  { label: 'Perumbakkam' },
  { label: 'Perungalathur' },
  { label: 'Perungudi' },
  { label: 'Pozhichalur' },
  { label: 'Poonamallee' },
  { label: 'Porur' },
  { label: 'Pudupet' },
  { label: 'Pulianthope' },
  { label: 'Purasaiwalkam' },
  { label: 'Puthagaram' },
  { label: 'Puzhal' },
  { label: 'Puzhuthivakkam/ Ullagaram' },
  { label: 'Raj Bhavan' },
  { label: 'Ramavaram' },
  { label: 'Red Hills' },
  { label: 'Royapettah' },
  { label: 'Royapuram' },
  { label: 'Saidapet' },
  { label: 'Saligramam' },
  { label: 'Santhome' },
  { label: 'Sembakkam' },
  { label: 'Selaiyur' },
  { label: 'Shenoy Nagar' },
  { label: 'Sholavaram' },
  { label: 'Sholinganallur' },
  { label: 'Sithalapakkam' },
  { label: 'Sowcarpet' },
  { label: 'St.Thomas Mount' },
  { label: 'Tambaram' },
  { label: 'Teynampet' },
  { label: 'Tharamani' },
  { label: 'T. Nagar' },
  { label: 'Thirumangalam' },
  { label: 'Thirumullaivoyal' },
  { label: 'Thiruneermalai' },
  { label: 'Thiruninravur' },
  { label: 'Thiruvanmiyur' },
  { label: 'Tiruverkadu' },
  { label: 'Thiruvotriyur' },
  { label: 'Tirusulam' },
  { label: 'Tiruvallikeni' },
  { label: 'Tondiarpet' },
  { label: 'United India Colony' },
  { label: 'Vandalur' },
  { label: 'Vadapalani' },
  { label: 'Valasaravakkam' },
  { label: 'Vallalar Nagar' },
  { label: 'Vanagaram' },
  { label: 'Velachery' },
  { label: 'Villivakkam' },
  { label: 'Virugambakkam' },
  { label: 'Vyasarpadi' },
  { label: 'Washermanpet' },
  { label: 'West Mambalam' },
  ];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 50,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
    
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
    backgroundColor : 'white',
    
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class Autocomplete extends React.Component {
  state = {
    location: '',
    popper: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
    console.log(newValue)
    this.props.updateLocation(newValue);
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Location',
            value: this.state.location,
            onChange: this.handleChange('location'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          
        />
        <div className={classes.divider} />
         </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators ({
  updateLocation
},dispatch)

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(Autocomplete);

export default withStyles(styles)(
  connect('', mapDispatchToProps)(Autocomplete)
)