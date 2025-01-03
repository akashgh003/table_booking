"use client";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useUser } from '../context/UserContext';

export function ThreeDCardDemo() {
  const navigate = useNavigate();
  const { setUsername } = useUser();
  const [inputUsername, setInputUsername] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!inputUsername.trim()) {
      setError('Please enter your username');
      return;
    }
    setUsername(inputUsername);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgb(30, 30, 30) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(30, 30, 30) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: 'center center'
      }} />
      
      {/* Card Container */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="w-[400px]">
          <CardContainer className="inter-var">
            <CardBody className="bg-black relative group/card border-white/[0.08] rounded-3xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white flex items-center justify-center"
              >
                Welcome to Table booking!
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-300 text-base mt-2 text-center"
              >
                Please enter your username to continue
              </CardItem>

              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-150 w-full object-cover rounded-xl"
                  alt="thumbnail"
                />
              </CardItem>

              <CardItem 
                translateZ={40} 
                className="w-full mt-4"
              >
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => {
                    setInputUsername(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none placeholder-white/50"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </CardItem>

              <div className="mt-6">
                <CardItem
                  translateZ={20}
                  as="button"
                  onClick={handleContinue}
                  className="w-full px-4 py-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Continue for table booking
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}