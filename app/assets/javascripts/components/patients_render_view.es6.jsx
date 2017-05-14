class PatientsRenderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
  }

  render () {
    return (
    <div className="panel-body">
      <div className="table-responsive">
      <ul>
      <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            ref={(ele) => (this.searchInput = ele)} />
          <button
            className="btn"
            type="button"
            onClick={(e) => this.props.onSearch(this.searchInput.value)}>
            Search
          </button>
        </div>
        </ul>
        <table className="table table-condensed bg-th table-striped dataTable no-footer">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.patients.map((patient) => {
                return(
                  <tr key={patient.id}>
                    <td><a href={"/patients/"+patient.id}>{`${patient.first_name} ${patient.last_name}`}</a></td>
                    <td>{patient.age }</td>
                    <td>{patient.phone}</td>
                    <td>{patient.dob}</td>
                    <td>{patient.gender}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
    );
  }
}
