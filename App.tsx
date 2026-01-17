import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { PricingPage } from "./components/PricingPage";
import { AboutPage } from "./components/AboutPage";
import { StartProjectPage } from "./components/StartProjectPage";
import { PortfolioPage } from "./components/PortfolioPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { CRM } from "./components/CRM";
import { EventOSDemo } from "./components/EventOSDemo";
import { PremiumLOAService } from "./components/PremiumLOAService";
import { LOACommandCenter } from "./components/LOACommandCenter";
import { AIServicesPortal } from "./components/AIServicesPortal";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState<
    string | undefined
  >(undefined);

  const handleNavigate = (page: string, plan?: string) => {
    setCurrentPage(page);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "services":
        return <ServicesPage onNavigate={handleNavigate} />;
      case "pricing":
        return <PricingPage onNavigate={handleNavigate} />;
      case "portfolio":
        return <PortfolioPage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "start-project":
        return (
          <StartProjectPage
            selectedPlan={selectedPlan}
            onNavigate={handleNavigate}
          />
        );
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} />;
      case "crm":
        return <CRM onNavigate={handleNavigate} />;
      case "client-portal":
        return <ClientPortal onNavigate={handleNavigate} />;
      case "event-os-demo":
        return <EventOSDemo onNavigate={handleNavigate} />;
      case "premium-loa":
        return <PremiumLOAService onNavigate={handleNavigate} />;
      case "loa-command":
        return <LOACommandCenter onNavigate={handleNavigate} />;
      case "ai-services":
        return <AIServicesPortal onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isStandalonePage = [
    "admin",
    "crm",
    "client-portal",
    "event-os-demo",
    "premium-loa",
    "loa-command",
    "ai-services",
  ].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {!isStandalonePage && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}
      <main>{renderPage()}</main>
      {!isStandalonePage && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}