class PatientsIndexView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      patients: [],
      filteredPatients: []
    }
    this.onSearch = this.onSearch.bind(this);
    this.loadPatients = this.loadPatients.bind(this);
  }

  onSearch(searchInput) {
    this.setState({ searchInput}, this.loadPatients);
  }

  loadPatients() {
    let patients = this.state.patients;
    if(this.state.searchInput.length === 0) {
      this.setState({ filteredPatients: patients});
    } else {
      let filteredPatients = patients.filter((patient) => {
        if(patient.first_name && patient.first_name.includes(this.state.searchInput)) {
          return patient;
        }
      })
      this.setState({
        filteredPatients: filteredPatients
      });
    }
  }

  componentWillReceiveProps({patients}) {
    this.setState({
      patients: patients,
      filteredPatients: patients
    });
  }

  componentDidMount() {
    this.setState({
      patients: this.props.patients,
      filteredPatients: this.props.patients
    });
  }

  render () {
    return (
      <PatientsRenderView
        patients={this.state.filteredPatients}
        onSearch={this.onSearch}
      />
    );
  }
}
