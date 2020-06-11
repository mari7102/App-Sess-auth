var React = require('react');
var DefaultLayout = require('./layouts/default')

function Index(props) {

    return (

        <DefaultLayout title={"Forsiden"}>
            <div className="background">
                <h1>{props.velkomsthilsen}</h1>

                {props.userId ?
                    <>
                        <a href='/home'>Home</a>
                        <form method='post' action='/logout'>
                            <button>Logout</button>
                        </form>
                    </>
                    :
                    <>
                    <ul>
                        <li><a href='/login'>Login</a></li>
                        <li><a href='/register'>Register</a></li>
                    </ul>
                        
                    </>
                }
            </div>
        </DefaultLayout>
    );
}

module.exports = Index;