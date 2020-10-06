import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getUserProfile, updateUserProfile } from "../../src/lib/apiProfile";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  test: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  }
}));

export default function userProfilePage({ user, ctx }) {

  const classes = useStyles();

  const [userInfo, setUserInfo] = React.useState(null);
  const [expectNewPassword, setExpectNewPassword] = React.useState(false);
  const [userInfoState, setUserInfoState] = React.useState(null);

  React.useEffect(() => getUserInfo(), []);

  React.useEffect(() => setUserInfoState({ ...userInfo }), [userInfo]);

  const getUserInfo = () => {
    if (user && user._id) {
      getUserProfile(user._id).then(thisUser => {
        setUserInfo(thisUser);
      })
    }
  };

  const handleChange = path => name => event => {
    if (path) {
      setUserInfoState({
        ...userInfoState,
        [path]: {
          ...userInfoState[path],
          [name]: event.target.value
        }
      });
    } else {
      setUserInfoState({
        ...userInfoState,
        [name]: event.target.value
      });
    }
  };

  const handleChangePassword = event => {
    setExpectNewPassword(event.target.checked);
  };

  const handleUpdateProfile = () => {
    let newUserInfo = { ...userInfoState };
    if (expectNewPassword && userInfoState.password && userInfoState.password.password1) {
      newUserInfo.password = userInfoState.password.password1;
    };
    setUserInfo(newUserInfo);
    console.log(" ======= NEW INFO", newUserInfo)

    updateUserProfile(newUserInfo);
  }

  return userInfo ? (
    <div className={classes.root}>
      <Paper>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <h3>User profile</h3>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              {userInfoState.name || ""}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={expectNewPassword}
                  onChange={handleChangePassword}
                />
              }
              label="Change password"
            />
          </Grid>

          {expectNewPassword ? (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  type="password"
                  id="password1-input"
                  label="Password"
                  helperText="Enter your new password"
                  onChange={handleChange("password")("password1")}
                  value={userInfoState.password ? userInfoState.password.password1 : ""}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  disabled={userInfoState.password && userInfoState.password.password1 ? false : true}
                  size="small"
                  type="password"
                  id="password2-input"
                  label="Confirm password"
                  error={userInfoState.password && userInfoState.password.password1 != userInfoState.password.password2}
                  helperText={userInfoState.password && userInfoState.password.password1 ? "Confirm your new password" : null}
                  onChange={handleChange("password")("password2")}
                  value={userInfoState.password ? userInfoState.password.password2 : ""}
                />
              </Grid>
            </>
          ) : null
          }

          <Grid item xs={6} md={6}>
            <TextField
              size="small"
              id="firstName-input"
              label="First name"
              onChange={handleChange()("firstName")}
              value={userInfoState.firstName || ""}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <TextField
              size="small"
              id="lastName-input"
              label="Last name"
              onChange={handleChange()("lastName")}
              value={userInfoState.lastName || ""}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Button variant="success" size="sm"
              // disabled={userInfoState.password && userInfoState.password.password1 ? false : true}
              onClick={() => handleUpdateProfile()}>
              Update profile
            </Button>
          </Grid>

        </Grid>
      </Paper>
    </div>
  ) : null;
};

userProfilePage.getInitialProps = async (ctx) => getAuth(ctx);