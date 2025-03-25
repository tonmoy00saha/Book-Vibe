import { Link } from 'react-router-dom';
import authenticationimg from '../../assets/authentication1.png'
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const {createuser} = useContext(AuthContext);

    const onSubmit = (data)=>{
        createuser(data.email, data.password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200 p-28">
        <div className="hero-content flex flex-col md:flex-row-reverse md:gap-48">
            <div className="">
                <img src={authenticationimg} alt="" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm " id="">
                <h2 className="text-3xl font-bold text-center">SignUp</h2>
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">**This field is required**</span>}
                    </div>
                   
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/
                        })} placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <span className="text-red-600">**This field is required**</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-600">**Password must be 6 characters**</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-600">**Password must have one uppercase,one lowercase one number and one special character**</span>}

                        <div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-[#D1A054B3] text-white">SignUp</button>
                    </div>
                </div>
                <div className='divider'></div>
                {/* <div className='text-center'>
                <SocialLogin></SocialLogin>
                </div> */}
                <p className="text-center text-[#D1A054]"><small>Already registered? <Link to="/login">Go to log in</Link></small></p>

            </form>

        </div>
    </div>
    );
};

export default SignUp;