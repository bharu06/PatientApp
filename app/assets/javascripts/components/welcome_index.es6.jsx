class WelcomeIndex extends React.Component {
  render () {
    return (
    <div>
    <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">MedicalOffice</a>
    </div>
    <ul className="nav navbar-nav">
      <li className="active"><a href="#">Home</a></li>
      <li><a href="/patients/new">Create Patient</a></li>
      <li><a href="/patients">See all Patients</a></li>
    </ul>
  </div>
</nav>
</div>
    );
  }
}
