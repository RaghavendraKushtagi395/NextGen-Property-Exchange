import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import googleLogo from "../assets/googleLogo.png";
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            // Send the user data as JSON in the request body
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log("Could not sign in with Google", error);
        }
    };

    return (
        <button onClick={handleGoogleClick} type="button" className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 p-3 mt-4 rounded-lg cursor-pointer hover:bg-gray-200">
            <img src={googleLogo} alt="Google Logo" className="w-6 h-6 rounded-full" />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
            
        </button>
    );
}
