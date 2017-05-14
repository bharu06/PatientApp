class PatientNewView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      age: null,
      dob: '',
      gender: '',
      phone: null,
      info: '',
      firstNameError: '',
      lastNameError: '',
      ageError: '',
      dobError: '',
      genderError: '',
      phoneError: '',
      infoError: ''
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handleDOBChange = this.handleDOBChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.getValidationErrors = this.getValidationErrors.bind(this);
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

  handleGenderChange(e) {
    this.setState({ gender: e.target.value });
  }

  handlePhoneNumberChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleDOBChange(e) {
    this.setState({ dob: e.target.value });
  }

  handleInfoChange(e) {
    this.setState({ info: e.target.value });
  }

  getValidationErrors () {
    let errors = [];
    if (this.state.firstNameError.length > 0) {
      errors.push(
        <div className="alert alert-danger">
          {this.state.firstNameError}
          <button className="close" dataDismiss="alert"></button>
        </div>
       );
    }
    if (this.state.lastNameError.length > 0) {
    errors.push(
      <div className="alert alert-danger">
        {this.state.lastNameError}
        <button className="close" dataDismiss="alert"></button>
      </div>
     );
    }
    if(this.state.ageError.length > 0) {
    errors.push(
        <div className="alert alert-danger">
          {this.state.ageError}
          <button className="close" dataDismiss="alert"></button>
        </div>
       );
    }
    if (this.state.phoneError.length > 0) {
    errors.push(
        <div className="alert alert-danger">
          {this.state.phoneError}
          <button className="close" dataDismiss="alert"></button>
        </div>
       );
    }

    return errors;
  }

  validateAll() {

    let firstNameError = null;
    let lastNameError = null;
    let ageError = null;
    let phoneError = null;
    let flag = 0;
    if (this.state.first_name.length === 0) {
      firstNameError = "please enter first name";
      flag =1;
    }
    if (this.state.last_name.length === 0) {
      lastNameError = "Please enter last name";
      flag =1;
    }
    if (this.state.age === 0) {
      ageError = "please enter age";
      flag =1;
    }
    if (this.state.phone.length === 0){
      phoneError = "please enter phone number";
      flag =1;
    }
    this.setState({
      firtNameError: firstNameError,
      lastNameError: lastNameError,
      ageError: ageError,
      phoneError: phoneError
    });

  }

  onSubmit(e) {
    let url = window.location.origin + '/patients';
    let method = "POST";

    ajaxCall(
      {
        url,
        method: method,
        data: JSON.stringify({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          age: this.state.age,
          dob: this.state.dob,
          gender: this.state.gender,
          phone: this.state.phone,
          extra_info: this.state.info
        })
      },
      (data) => {
        let url = window.location.origin + `/patients/${data.id}`;
        window.location.href = url;
      },
      (error, json) => {
        console.log(error);
        alert("patient crreation unsuccessfull");
      }
    );
  }

  render () {
  let errors = this.getValidationErrors();
    return  (
      <div className="container">
      <div className="panel-body row body">
      {errors}
        <form className="" role="form" onSubmit={this.onSubmit}>
          <ul>
            <li>
              <div className="form-group form-group-default required left">
                <label> First Name :</label>
                <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} required/>
              </div>
              <div className="form-group form-group-default required pull-right">
                <label> Last Name :</label>
                <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} required/>
              </div>
            </li>
            <li>
              <div className="form-group form-group-default required">
                <label> Age :</label>
                <input type="number" step="1" value={this.state.age} onChange={this.handleAgeChange} required/>
              </div>
            </li>
            <li>
              <div className="form-group form-group-default required">
                <label> Gender : </label>
                  <ul>
                    <li>
                      <div className="">
                        <input
                          type="radio"
                          name="Female"
                          value="female"
                          onChange={this.handleGenderChange}
                          checked={this.state.gender === "female"}
                        /> Female
                      </div>
                    </li>
                    <li>
                      <div className="">
                        <input
                          type="radio"
                          name="Male"
                          value="male"
                          onChange={this.handleGenderChange}
                          checked={this.state.gender === "male"}
                        /> Male
                      </div>
                    </li>
                  </ul>
              </div>
            </li>
            <li>
              <div className="form-group form-group-default required">
                <label> Phone Number: </label>
                <input type="tel" value={this.state.phone} onChange={this.handlePhoneNumberChange} required/>
              </div>
            </li>
            <li>
              <div className="form-group form-group-default required">
                <label> Date Of Birth: </label>
                <input type="date" value={this.state.dob} onChange={this.handleDOBChange} required/>
              </div>
            </li>
            <li>
              <div className="form-group form-group-default required">
                <label> Extra Info: </label>
                <input type="text" value={this.state.info} onChange={this.handleInfoChange} required/>
              </div>
            </li>
            <li>
              <div className="form-group text-right" >
                <button type="submit" className="btn btn-primary btn-cons"> Submit </button>
              </div>
            </li>
          </ul>
        </form>
      </div>
      </div>
    );
  }
}
