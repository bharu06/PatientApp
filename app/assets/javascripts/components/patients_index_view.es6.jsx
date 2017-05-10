class PatientsIndexView extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <PatientsRenderView
        patients={this.props.patients}
      />
    );
  }
}
