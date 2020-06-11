

var React = require('react');
var DefaultLayout = require('../layouts/default')

function Register(props) {

    return (

        <DefaultLayout title={"Register"}>
            <div className="background">
                <h1>{props.velkomsthilsen}</h1>

                <img alt="Qries" src="../public/assets/images/img-register.png"/>

                <form method='post' action='/register'>
                    <input name='name' placeholder='Name' required />
                    <input type='email' name='email' placeholder='Email' required />
                    <input type='password' name='password' placeholder='Password' required />
                    <input type='submit' />
                </form>
                <section className="login_registrer">
                    <a href='/login'>Login</a>
                </section>
            </div>
        </DefaultLayout>
    );
}

module.exports = Register;