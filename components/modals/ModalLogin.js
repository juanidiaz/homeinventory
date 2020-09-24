import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { loginUser } from '../../src/lib/apiAuth';
import Router from 'next/router';

const useStyles = makeStyles(theme => ({
  fillAvailable: {
    width: '-webkit-fill-available'
  },
  alertBox: {
    padding: '5px 16px',
    marginTop: '.5rem!important'
  }
}));

const ModalLogin = props => {
  const classes = useStyles();

  const { handleClose, open } = props;

  const [loginInfo, setLoginInfo] = React.useState({});
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleChange = name => value => {
    setLoginInfo({
      ...loginInfo,
      [name]: value.target.value
    })
  };

  async function handleClickLogin(e) {

    const { success, data, message } = await loginUser(loginInfo);

    console.log("LOGIN!", { success, data, loginInfo })

    setShowAlert(!success);

    if (!success) {
      setAlertMessage(message);
      return;
    }

    Router.reload();
    handleClose();
  };

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Log in to myInventory</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"
              placeholder="Enter username"
              onChange={handleChange("name")}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
              placeholder="Password"
              onChange={handleChange("password")}
            />
          </Form.Group>

          <Alert variant="danger" hidden={!showAlert} className={classes.alertBox} size="sm">
            {alertMessage}
          </Alert>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="primary" type="submit"
          disabled={!loginInfo.name || !loginInfo.password}
          onClick={handleClickLogin}
        >
          Submit
        </Button>

      </Modal.Footer>

    </Modal>
  )
};

ModalLogin.defaultProps = {
  addMode: true
};

export default ModalLogin;