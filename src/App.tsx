import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PyrolysisSection } from "./components/PyrolysisSection";
import { AIPredictionSection } from "./components/AIPredictionSection";

import { EducationSection } from "./components/EducationSection";
import { ProductsSection } from "./components/ProductsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { CitizenDashboard } from "./components/CitizenDashboard";
import { OperatorDashboard } from "./components/OperatorDashboard";
import { Toaster } from "./components/ui/sonner";

type UserType = 'citizen' | 'operator' | null;

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [userData, setUserData] = useState<any>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = (userType: UserType, data: any) => {
    setCurrentUser(userType);
    setUserData(data);
    setShowLanding(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserData(null);
    setShowLanding(true);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleBackToLogin = () => {
    setShowRegistration(false);
  };

  const handleRegister = (newUserData: any) => {
    // Simulate successful registration
    setCurrentUser('citizen');
    setUserData(newUserData);
    setShowRegistration(false);
    setShowLanding(false);
  };

  // Show landing page
  if (showLanding && !currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Header onLoginClick={handleGetStarted} />
        <main>
          <HeroSection />
          <PyrolysisSection />
          <EducationSection />
          <ProductsSection />
          <AIPredictionSection />
          <CTASection onGetStarted={handleGetStarted} />
        </main>
        <Footer />
      </div>
    );
  }

  // Show registration page
  if (showRegistration) {
    return (
      <RegistrationPage 
        onBackToLogin={handleBackToLogin}
        onRegister={handleRegister}
      />
    );
  }

  // Show login page
  if (!currentUser) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onShowRegistration={handleShowRegistration}
      />
    );
  }

  // Show appropriate dashboard
  if (currentUser === 'citizen') {
    return (
      <>
        <CitizenDashboard user={userData} onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  if (currentUser === 'operator') {
    return (
      <>
        <OperatorDashboard user={userData} onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  return null;
}