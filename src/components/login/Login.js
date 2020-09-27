import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../../actions/user';
import MainNavbar from '../admin-navbar/main-navbar';
import './login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { login } = this.props;
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    login(userData);
  };

  passwordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleLoginChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  componentWillReceiveProps = (nextProps) => {
    const alertMessage =
      nextProps.loginErrors && toast.error('L\'adresse e-mail ou le mot de passe est incorrect');

    return !nextProps.loading && alertMessage;
  };
  render() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      if(user.type === 'client'){
      return <Redirect to='/'/>
      }
      else{
        return <Redirect to='/addproduct'/>        
      }
    }
    return (
      <div id='layout'>
        <div className='container'>
        <MainNavbar/>
          <div>
            <div className='form'>
              <ToastContainer
                position={toast.POSITION.TOP_CENTER}
                className='toastMessages'
                style={{ width: '500px' }}
              />
              <div className='header'>
                <h3 className='text-center font-weight-light my-4'>Connexion</h3>
              </div>
              <div className='body'>
                <form className='form-group' onSubmit={this.handleSubmit}>
                  <label className='small mb-1'>E-mail</label>
                  <input
                    name='email'
                    type='text'
                    placeholder='Entrer l&apos;adresse e-mail'
                    className='form-control py-4'
                    onChange={this.handleLoginChange}
                  ></input>
                  <br></br>
                  <label className='small mb-1'>Mot de passe</label>
                  <input
                    type='password'
                    placeholder='Entrer le mot de passe'
                    className='form-control py-4'
                    onChange={this.passwordChange}
                  ></input>
                  <div className='form-group'>
                    <button className='btn btn-secondary'>Connexion</button>
                  </div>
                </form>
              </div>
              <div className='footer'>
                <Link to='/signup'>Besoin d'un compte? S'inscrire!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginErrors: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapStateToProps = ({ user: { token, loading, loginErrors, data } }) => ({
  token,
  loading,
  loginErrors,
  data,
});

export default connect(mapStateToProps, { login })(Login);
