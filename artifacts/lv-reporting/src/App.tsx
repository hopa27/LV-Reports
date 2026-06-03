import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReportingSystemPanel from "./components/ReportingSystemPanel";
import { DEFAULT_SYSTEM } from "./data/reports";

function App() {
  const [systemName, setSystemName] = useState<string>(DEFAULT_SYSTEM);

  return (
    <div className="h-[125vh] overflow-hidden flex flex-col bg-[#f0f0f0]">
      <Header title={`${systemName} Reporting System`} />
      <main className="flex-1 min-h-0 px-[142px] py-8 flex items-stretch justify-center">
        <ReportingSystemPanel
          systemName={systemName}
          onSystemNameChange={setSystemName}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
