var React = require('react');
var DefaultLayout = require('../layouts/default')

function Home(props) {

    return (

        <DefaultLayout title={"Home"}>
            <div className="background_profile">
                <h1>{props.velkomsthilsen}</h1>

                <a href='/'>Main</a>
                <ul>
                    <li>Name: {props.user.name} </li>
                    <li>Email: {props.user.email} </li>
                </ul>
            </div>
        </DefaultLayout>
    );
}

module.exports = Home;

