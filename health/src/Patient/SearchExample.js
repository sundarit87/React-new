import React from 'react'
import SomeCoolComponent from 'some-cool-component'
import MUIPlacesAutocomplete, { geocodeByPlaceID } from 'mui-places-autocomplete'
 
class Example extends React.Component {
  constructor() {
    super()
 
    // Setup your state here...
    this.state = { coordinates: null }
 
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }
 
  onSuggestionSelected(suggestion) {
    geocodeByPlaceID(suggestion.place_id).then((results) => {
      // Add your business logic here. In this case we simply set our state with the coordinates of
      // the selected suggestion...
 
      // Just use the first result in the list to get the geometry coordinates
      const { geometry } = results[0]
 
      const coordinates = {
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      }
 
      this.setState({ coordinates })
    }).catch((err) => {
      // Handle any errors that occurred when we tried to get geospatial data for a selected
      // suggestion...
    })
  }
 
  render() {
    // Your render logic here...
  }
}
 
export default Example