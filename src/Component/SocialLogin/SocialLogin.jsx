import { FaGoogle } from "react-icons/fa6";
import useAuth from "../Hook/useAuth";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";



const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleSignIn =()=>{
        googleSignIn()
        .then(result=>{
            const userInfo = {
                email : result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                navigate('/');
            })
        })
    }
    return (
        <div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn rounded-full border-[#D1A054]">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;