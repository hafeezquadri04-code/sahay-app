import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">
            <AppRoutes />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
