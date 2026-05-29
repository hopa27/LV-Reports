import Header from "./components/Header";
import Footer from "./components/Footer";
import ReportingSystemPanel from "./components/ReportingSystemPanel";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
      <Header />
      <main className="flex-1 px-[142px] py-8 flex items-start justify-center">
        <ReportingSystemPanel />
      </main>
      <Footer />
    </div>
  );
}

export default App;
