class PatientNewView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      age: null,
      dob: '',
      gender: '',
      phone: 0,
      extraInfo: ''
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  }

  handleAgeChange(e) {
    this.setState({age: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    let url = window.location.origin + '/patients';
    let method = "POST";

    ajaxCall(
      {
        url,
        method: method,
        data: JSON.stringify({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          age: this.state.age
        })
      },
      (data) => {
        console.log("successfully");
        let url = window.location.origin + `/patients/${data.id}`;
        window.location.href = url;
      },
      (error, json) => {
        console.log("patient crreation unsuccessfull");
      }
    );
  }

  render () {
    return  (
      <div>
        <form className="" role="form" onSubmit={this.onSubmit}>
          <div className="">
            <label> First Name :</label>
            <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} required/>
          </div>
          <div className="">
            <label> Last Name :</label>
            <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} required/>
          </div>
          <div className="">
            <label> Age :</label>
            <input type="number" step="1" value={this.state.age} onChange={this.handleAgeChange} required/>
          </div>
          <div className="" >
            <button type="submit" className="btn btn-primary btn-cons"> Submit </button>
          </div>
        </form>
      </div>

    );
  }
}
