class Form extends React.Component {

  state = {open: false, email: '', password: '', email_error_text: null, password_error_text: null, disabled: true};

  handleTouchTap() {
      this.setState({
          open: true,
      });
  }

  isDisabled() {
      let emailIsValid = false;
      let passwordIsValid = false;

      if (this.state.email === "") {
          this.setState({
              email_error_text: null
          });
      } else {
          if (validateEmail(this.state.email)) {
              emailIsValid = true
              this.setState({
                  email_error_text: null
              });
          } else {
              this.setState({
                  email_error_text: "Sorry, this is not a valid email"
              });
          }
      }

      if (this.state.password === "" || !this.state.password) {
          this.setState({
              password_error_text: null
          });
      } else {
          if (this.state.password.length >= 6) {
              passwordIsValid = true;
              this.setState({
                  password_error_text: null
              });
          } else {
              this.setState({
                  password_error_text: "Your password must be at least 6 characters"
              });
          }
      }

      if (emailIsValid && passwordIsValid) {
          this.setState({
              disabled: false
          });
      }
  }

  changeValue(e, type) {
      const value = e.target.value;
      const nextState = {};
      nextState[type] = value;
      this.setState(nextState, () => {
          this.isDisabled()
      });
  }

  login() {
      createUser(this.state.email, this.state.password);
      this.setState({
          open: false
      });
  }

  render() {

      let {open, email, password, email_error_text, password_error_text, disabled} = this.state;

      const standardActions = (
          <FlatButton
              containerElement={<Link to="/portal" />}
              disabled={this.state.disabled}
              label="Submit"
              onClick={this.login.bind(this)} 
          />
      );

      return (
          <div style={styles.container}>
              <Dialog
                  open={this.state.open}
                  title="Enter Your Details to Login"
                  actions={standardActions}
              >
                  <span className="hint--right hint--bounce" data-hint="Enter in your email address">
                      <TextField
                          hintText="Email"
                          floatingLabelText="Email"
                          type="email"
                          errorText={this.state.email_error_text}
                          onChange={e => this.changeValue(e, 'email')} 
                      />
                  </span>
                  <br />
                  <span className="hint--right hint--bounce" data-hint="Enter your password">
                      <TextField
                          hintText="Password"
                          floatingLabelText="Password"
                          type="password"
                          errorText={this.state.password_error_text}
                          onChange={e => this.changeValue(e, 'password')} 
                      />
                  </span>
              </Dialog>
              <h1>VPT</h1>
              <h2>Project DALI</h2>
              <RaisedButton
                  label="Login"
                  primary={true}
                  onTouchTap={this.handleTouchTap.bind(this)} 
              />
          </div>
      );
  }
}

export default Form;