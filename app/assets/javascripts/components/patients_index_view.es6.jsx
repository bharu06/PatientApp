class PatientsIndexView extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        {
          this.props.patients.map((patient) => {
            return(
              <h1> {patient.first_name} </h1>
            );
          })
        }
      </div>
    );
  }
}
