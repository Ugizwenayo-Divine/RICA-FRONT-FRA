import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { signup } from '../../actions/user';
import MainNavbar from '../admin-navbar/main-navbar';
import './signup.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: '',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { signup } = this.props;
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      gender: this.state.gender,
    };

    signup(userData);
  };

  genderChange = (event) => {
    this.setState({ gender: event.target.value });
  };
  handleSignupChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  componentWillReceiveProps = (nextProps) => {
    const alertMessage =
      (nextProps.message && toast.success(nextProps.message)) ||
      (nextProps.loginErrors && toast.error(nextProps.loginErrors));

    return !nextProps.loading && alertMessage;
  };
  render() {
    return (
      <div id='layout'>
        <div className='container'>
          <ToastContainer
            position={toast.POSITION.TOP_CENTER}
            className='toastMessages'
            style={{ width: '750px' }}
          />
          <MainNavbar/>
          <div className='card-form'>
            <div className='card-header'>
              <h3 className='text-center font-weight-light my-4'>
              Créer un compte
              </h3>
            </div>
            <div className='card-body'>
              <form onSubmit={this.handleSubmit}>
                <div className='form-row'>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Prénom</label>
                    <input
                      name='firstName'
                      className='form-control py-4'
                      placeholder='Entrez votre prénom'
                      onChange={this.handleSignupChange}
                    ></input>
                  </div>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Nom de famille</label>
                    <input
                      name='lastName'
                      className='form-control py-4'
                      placeholder='Entrer le nom de famille'
                      onChange={this.handleSignupChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label className='small mb-1'>E-mail</label>
                  <input
                    name='email'
                    type='email'
                    className='form-control py-4'
                    placeholder='Entrer l&apos;adresse e-mail'
                    onChange={this.handleSignupChange}
                  ></input>
                </div>
                <div className='form-row'>
                  <div className='col-md-4'>
                    <label className='small mb-1'>Numéro de téléphone</label>
                    <input
                      name='phoneNumber'
                      className='form-control py-4'
                      placeholder='Entrez le numéro de téléphone'
                      onChange={this.handleSignupChange}
                    ></input>
                  </div>
                  <div className='col-md-4'>
                    <label className='small mb-1'>Mot de passe</label>
                    <input
                      name='password'
                      type='password'
                      className='form-control py-4'
                      placeholder='Entrer le mot de passe'
                      onChange={this.handleSignupChange}
                    ></input>
                  </div>
                  <div className='col-md-4'>
                    <label className='small mb-1'>Le genre</label>
                    <br />
                    <div class='form-check'>
                      <input
                        type='checkbox'
                        class='form-check-input'
                        value='Male'
                        onChange={this.genderChange}
                      />
                      <label class='form-check-label'>Mâle</label>
                      <br></br>
                      <input
                        type='checkbox'
                        class='form-check-input'
                        value='Female'
                        onChange={this.genderChange}
                      />
                      <label class='form-check-label'>Femelle</label>
                    </div>
                  </div>
                </div>
                <br />
                <div className='form-group'>
                  <button className='btn btn-secondary btn-block'>
                  Créer un compte
                  </button>
                </div>
              </form>
            </div>
            <div className='card-footer'>
              <Link to='/login'>Avoir un compte? Aller à la connexion</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Signup.propTypes = {
  message: PropTypes.string,
  loginErrors: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapStateToProps = ({
  user: { token, loading, loginErrors, message },
}) => ({
  token,
  loading,
  loginErrors,
  message,
});
export default connect(mapStateToProps, { signup })(Signup);
