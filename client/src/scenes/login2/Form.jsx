import { useState,useEffect } from "react";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import axios from 'axios';
import { setLogin } from '../authSlice';


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",

};

const Form4 = () => {
  
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    
  
    // Log the contents of the FormData object
    console.log('FormData field names:');
    for (let key of formData.keys()) {
    console.log(key);
}
  
    try {
      const response = await axios.post('http://localhost:8800/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const savedUser = response.data;
      onSubmitProps.resetForm();
  
      if (savedUser) {
        setPageType('login');
      }
    } catch (error) {
      console.error(error);
    }
  };
// const register = async (values, onSubmitProps) => {
//   const formData = new FormData();
//   for (let value in values) {
//     formData.append(value, values[value]);
//   }
//   formData.append("picture", values.picture);

//   try {
//     const response = await axios.post("http://localhost:8800/register", formData);
//     const savedUser = response.data;
//     onSubmitProps.resetForm();

//     if (savedUser) {
//       setPageType("login");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
// Inside your component


// Inside the login function

const login = async (values, onSubmitProps) => {
  const response = await axios.post("http://localhost:8800/login", values);
  onSubmitProps.resetForm();
  if (response.data.message) {
    setLoginStatus(response.data.message);
    
  } else {
    setLoginStatus(response.data[0].firstName);
    navigate("/dashboard");
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8800/login");
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].firstName);
        console.log(response.data.user[0].firstName);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);
  
// const login = async (values, onSubmitProps) => {
//   const loggedInResponse = await fetch("http://localhost:8800/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(values),
//   });
//   const loggedIn = await loggedInResponse.json();
//   console.log(loggedIn);
//   onSubmitProps.resetForm();
//   if (loggedIn) {
//     dispatch(setLogin(loggedIn.user));
//     navigate("/dashboard");
//   }
// };
const handleFormSubmit = async (values, onSubmitProps) => {
  console.log('Form submitted:', values);
  if (isLogin) await login(values, onSubmitProps);
  if (isRegister) await register(values, onSubmitProps);
};


  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${colors.greenAccent[500]}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${colors.greenAccent[500]}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            <Typography fontSize={"11px"} color={"red"}>{loginStatus}</Typography>
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: colors.primary[500],
                color: colors.greenAccent[500],
                "&:hover": { backgroundColor: colors.greenAccent[500],color: colors.primary[500] },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: colors.grey[500],
                "&:hover": {
                  cursor: "pointer",
                  color: colors.grey[100],
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form4;
