import { useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    // console.log(error);
    return (
        <div className="text-center space-y-2 mt-52">
            <h1 className="text-4xl font-semibold">Oops!!!</h1>
            <p>Sorry, an unexpected error occurred.</p>
            <p><i>{error.statusText|| error.status}</i></p>
        </div>
    );
};

export default ErrorPage;