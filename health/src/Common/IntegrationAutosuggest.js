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
import {updateSpecialist} from '../Patient/action'

const suggestions = [
  { label: 'Allergology'}
  ,{ label: 'Anaesthetics'}
  ,{ label: 'Biological hematology'}
  ,{ label: 'Cardiology'}
  ,{ label: 'Child psychiatry'}
  ,{ label: 'Clinical biology'}
  ,{ label: 'Clinical chemistry'}
  ,{ label: 'Clinical neurophysiology'}
  ,{ label: 'Craniofacial surgery'}
  ,{ label: 'Dental'}
  ,{ label: 'Dermato-venereology'}
  ,{ label: 'Dermatology'}
  ,{ label: 'Endocrinology'}
  ,{ label: 'Gastroenterology'}
  ,{ label: 'General hematology'}
  ,{ label: 'General Practice'}
  ,{ label: 'General surgery'}
  ,{ label: 'Geriatrics'}
  ,{ label: 'Immunology'}
  ,{ label: 'Infectious diseases'}
  ,{ label: 'Internal medicine'}
  ,{ label: 'Laboratory medicine'}
  ,{ label: 'Maxillo-facial surgery'}
  ,{ label: 'Microbiology'}
  ,{ label: 'Nephrology'}
  ,{ label: 'Neuro-psychiatry'}
  ,{ label: 'Neurology'}
  ,{ label: 'Neurosurgery'}
  ,{ label: 'Nuclear medicine'}
  ,{ label: 'Obstetrics'}
  ,{ label: 'Gynecology'}
  ,{ label: 'Ophthalmology'}
  ,{ label: 'Orthopaedics'}
  ,{ label: 'Paediatric surgery'}
  ,{ label: 'Paediatrics'}
  ,{ label: 'Radiation Oncology'}
  ,{ label: 'Radiology'}
  ,{ label: 'Respiratory medicine'}
  ,{ label: 'Rheumatology'}
  ,{ label: 'Stomatology'}
  ,{ label: 'Tropical medicine'}
  ,{ label: 'Urology'}
  ,{ label: 'Venereology'}
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
    height: 10,
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

class IntegrationAutosuggest extends React.Component {
  state = {
    specialist: '',
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
    console.log(newValue);
    this.props.updateSpecialist(newValue);
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
            placeholder: 'Specialist',
            value: this.state.specialist,
            onChange: this.handleChange('specialist'),
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
  updateSpecialist
},dispatch)

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(IntegrationAutosuggest);
export default withStyles(styles)(
  connect('', mapDispatchToProps)(IntegrationAutosuggest)
)
