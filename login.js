import React from "react"
import { Formik } from "formik"
import { Flex, Box, Divider } from "../../layouts"
import { Button, Input, Link} from "../UI"
import { IconFacebook, IconGoogle } from "../../svgIcons"
import { inject, observer} from 'mobx-react';
import { Redirect } from 'react-router-dom';

@inject('authorization', 'user') @observer
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          redirect: null,
            authorizationError: null,
        };
    }

    handleInitValue = () => ({
        username: '',
        password: ''
    });

    handleValidate = values => {
        const errors = {};
        if (!values.username) {
            errors.username = "Required"
        }
        if (!values.password) {
            errors.password = "Required"
        }
        return errors
    };


    handleOnSubmit = (values, { setSubmitting }) => {
        const { authorization: { login } } = this.props;
        setTimeout(() => {
            login({
                username: values.username,
                password: values.password,
            })
                .then(async response => {
                    if(response?.status === 'SUCCESS') {
                        this.setState({ redirect: '/profile/user-info' });
                    }
                    if(response?.status === 'ERROR') {
                        this.setState({ authorizationError: response.error })
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            setSubmitting(false)
        }, 1000)
    };

    handleChangeMiddleware = event => handleChange => {
        const { authorizationError } = this.state;
        if(authorizationError) {
            this.setState({authorizationError: null});
        }
        handleChange(event);
    };
    render() {
        const { redirect, authorizationError } = this.state;
        const { onClose } = this.props;

        if(redirect) {
            onClose();
            window.location.href = redirect;
        }

        return (
            <div className="login">
                <Box mb={3}>
                    <Button
                        fullWidth
                        bold
                        bordered
                        title="Log in with google"
                        icon={<IconFacebook width={20} height={20} />}
                    />
                </Box>
                <Box mb={3}>
                    <Button
                        fullWidth
                        bold
                        bordered
                        title="Log in with facebook"
                        icon={<IconGoogle width={20} height={20} />}
                    />
                </Box>

                <Divider mb={4} title="or" />

                <Formik
                    initialValues={this.handleInitValue}
                    validate={this.handleValidate}
                    onSubmit={this.handleOnSubmit}
                >
                    {({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
                        <form id="form-login" onSubmit={handleSubmit}>
                            <Box mb={5}>
                                <Input
                                    autoFocus={true}
                                    mb={3}
                                    name="username"
                                    label="Username*"
                                    onChange={event => this.handleChangeMiddleware(event)(handleChange)}
                                    initValue={values.username}
                                    onBlur={handleBlur}
                                    isError={errors.username !== undefined || authorizationError !== null}
                                    error={errors.username || authorizationError}
                                    touched={touched.username}
                                />
                            </Box>
                            <Box mb={4}>
                                <Input
                                    mb={3}
                                    type='password'
                                    name="password"
                                    label="Password*"
                                    onChange={event => this.handleChangeMiddleware(event)(handleChange)}
                                    initValue={values.password}
                                    onBlur={handleBlur}
                                    isError={errors.password !== undefined}
                                    error={errors.password}
                                    touched={touched.password}
                                />
                            </Box>

                            <Button
                                bordered
                                title="Submit"
                                fullWidth
                                type="submit"
                            />
                        </form>
                    )}
                </Formik>

                <Flex mt={3}>
                    <Box className="text --gray" mr={2}>
                        Not a member?
                    </Box>
                    <Link
                        acsent
                        underline
                        title="Create an account"
                        href='/registration-step1'/>
                </Flex>
            </div>
        )
    }
}

export default Login
