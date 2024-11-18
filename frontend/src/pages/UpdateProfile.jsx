// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UpdateProfile = ({name,setName, email, setEmail}) => {
    const navigate = useNavigate();
    const [profileUrl, setProfileUrl] = useState("");
    const [newEmail, setNewEmail] = useState(email);
    const [password, setPassword] = useState("");
    const [newName,setNewName] = useState(name);
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Profile updated:", { profileUrl, newName, newEmail, password });
        setEmail(newEmail)
        setName(newName);
        navigate(-1); 
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
              
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white text-xl mr-2"
                    >
                        ←
                    </button>
                    <h2 className="text-2xl font-semibold text-white">
                        Edit Profile
                    </h2>
                </div>

                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-4xl text-white">
                        👤
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1">
                            Profile URL
                        </label>
                        <input
                            type="text"
                            value={profileUrl}
                            onChange={(e) => setProfileUrl(e.target.value)}
                            placeholder="<Image URL>"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">Name</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={newEmail}

                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <button

                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                    >
                        <span>✓</span>
                        <span>Submit</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
