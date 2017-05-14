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
      infoError: '',
      message: ''
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
    this.createErrorDiv = this.createErrorDiv.bind(this);
    this.getAge = this.getAge.bind(this);

    //validation functions
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
    this.validateAge = this.validateAge.bind(this);
    this.validateDOB = this.validateDOB.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.validateInfo = this.validateInfo.bind(this);

    this.onFinish = this.onFinish.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value}, ()=> {this.validateFirstName});
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
    let age = this.getAge(e.target.value);
    this.setState({
      dob: e.target.value,
      age: age
    });
  }

  handleInfoChange(e) {
    this.setState({ info: e.target.value });
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  getValidationErrors () {
    let errors = [];
    errors.push(this.createErrorDiv(errors, this.state.firstNameError));
    errors.push(this.createErrorDiv(errors, this.state.lastNameError));
    errors.push(this.createErrorDiv(errors, this.state.ageError));
    errors.push(this.createErrorDiv(errors, this.state.dobError));
    errors.push(this.createErrorDiv(errors, this.state.phoneError));
    errors.push(this.createErrorDiv(errors, this.state.infoError));
    console.log(errors);
    return errors;
  }

  createErrorDiv(errors, errorMessage) {
    if(errorMessage != ""){
      return (
        <div className="alert alert-danger alert-dismissable">
           {errorMessage}
        </div>
      );
    }
  }

  validateFirstName() {
    let error = "", validation = false;
    if (this.state.firstName.length === 0) {
      error = "Please enter a valid first name";
      validation = true;
    }
    this.setState({ firstNameError: error });
    return validation;
  }

  validateLastName() {
    let error = "", validation = false;
    if (this.state.lastName.length === 0) {
      error = "Please enter a valid last name";
      validation = true;
    }
    this.setState({ lastNameError: error });
    return validation;
  }

  validateAge() {
    let error = "", validation = false;
    if (!this.state.age || this.state.age < 0) {
      error = "Please enter a valid age";
      validation = true;
    }
    this.setState({ ageError: error });
    return validation;
  }

  validateDOB() {
    let error = "", validation = false;
    if (this.state.dob.length === 0) {
      error = "Please enter a valid date of birth";
      validation = true;
    }
    this.setState({ dobError: error });
    return validation;
  }

  validatePhone() {
    let error = "", validation = false;
    if (!this.state.phone || this.state.phone.length < 6 || this.state.phone.length === 0) {
      error = "Please enter a valid Phone Number";
      validation = true;
    }
    this.setState({ phoneError: error });
    return validation;
  }

  validateInfo() {
    let error = "", validation = false;
    if (this.state.info.length === 0) {
      error = "Please enter a valid info";
      validation = true;
    }
    this.setState({ infoError: error });
    return validation;
  }

  validateAll() {
    let check = this.validateFirstName();
    check = this.validateLastName();
    check = this.validateDOB();
    check = this.validatePhone();
    check = this.validateAge();
    check = this.validateInfo();

    if (!this.validateFirstName() &&
        !this.validateLastName() &&
        !this.validateDOB() &&
        !this.validateAge() &&
        !this.validatePhone() &&
        !this.validateInfo()) {
        return true;
        } else {
        return false;
        }
  }

  onFinish() {
    if (this.validateAll()) {
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
          let url = window.location.origin + `/patients`;
          window.location.href = url;
        },
        (error, json) => {
          alert("patient creation unsucessful");
        }
      );
    }

  }

  render () {
  let errors = this.getValidationErrors();
    return  (
      <div className="container">
      {errors}
      <div className="panel-body row body">
        <form className="" role="form" noValidate>
          <ul>
            <li>
              <div className="">
                <label> First Name :</label>
                <input type="text" value={this.state.firstName} placeholder="Ex.John" onChange={this.handleFirstNameChange} required/>
              </div>
              <div className="">
                <label> Last Name :</label>
                <input type="text" value={this.state.lastName} placeholder="Ex.Deo"onChange={this.handleLastNameChange} required/>
              </div>
            </li>
            <li>
              <div className="">
                <label> Date Of Birth: </label>
                <input type="date" value={this.state.dob} onChange={this.handleDOBChange} required/>
              </div>
            </li>
            <li>
              <div className="">
                <label> Age :</label>
                <input type="number" step="1" value={this.state.age} onChange={this.handleAgeChange} required/>
              </div>
            </li>
            <li>
              <div className="">
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
              <div className="">
                <label> Phone Number: </label>
                <input type="tel" value={this.state.phone} onChange={this.handlePhoneNumberChange} required/>
              </div>
            </li>
            <li>
              <div className="">
                <label> Extra Info: </label>
                <input type="text" value={this.state.info} onChange={this.handleInfoChange} required/>
              </div>
            </li>
            <li>
              <div className="form-group text-right" >
                <button type="button" className="btn btn-primary btn-cons" onClick={this.onFinish}> Submit </button>
              </div>
            </li>
          </ul>
        </form>
      </div>
      </div>
    );
  }
}
