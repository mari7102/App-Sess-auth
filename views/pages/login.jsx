var React = require('react');
var DefaultLayout = require('../layouts/default')

function Login(props) {

    return (

        <DefaultLayout title={"Login"}>
            <div className="background">
                <h1>{props.velkomsthilsen}</h1>

                <form method='post' action='/login'>
                    <input type='email' name='email' placeholder='Email' required />
                    <input type='password' name='password' placeholder='Password' required />
                    <input type='submit' />
                </form>
                
                <a  href='/register'>Register</a>
                
            </div>
        </DefaultLayout>
    );
}

module.exports = Login;

