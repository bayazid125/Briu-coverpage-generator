import React, { useRef, useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { InputForm } from './components/InputForm';
import { CoverPageTemplate } from './components/CoverPageTemplate';
import { Button } from './components/ui/Button';
import { Download, Printer, RefreshCw, Moon, Sun, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const MainApp = () => {
  const { data, resetData, theme, toggleTheme } = useAppContext();
  const printRef = useRef<HTMLDivElement>(null);
  const pdfPrintRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [scale, setScale] = useState(1);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        // The intrinsic width of the A4 page is 794px
        const containerWidth = previewContainerRef.current.clientWidth;
        if (containerWidth === 0) return; // Prevent 0 scale when hidden
        const padding = 32; // 16px padding on each side
        const availableWidth = containerWidth - padding;
        const newScale = Math.min(1, availableWidth / 794);
        setScale(newScale);
      }
    };

    updateScale();
    const timeout = setTimeout(updateScale, 50); // Re-calculate after flex layout
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timeout);
    };
  }, [mobileTab]);

  const handlePrint = () => {
    window.print();
  };

  const generatePDF = async () => {
    if (!pdfPrintRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(pdfPrintRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Cover_Page_${data.courseCode}.pdf`);
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderActionButtons = (isMobile: boolean) => (
    <>
      <Button onClick={generatePDF} className={`flex-1 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all ${isMobile ? 'py-3 h-14' : 'py-3 h-14'}`} size="lg" disabled={isGenerating}>
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" /> Generating...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Download className="w-5 h-5" /> Download PDF
          </span>
        )}
      </Button>
      <Button onClick={handlePrint} variant="ghost" className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border border-white/60 dark:border-white/10 active:bg-slate-50 dark:active:bg-white/10 transition-colors p-0 ${isMobile ? 'bg-white/80 dark:bg-black/80 backdrop-blur text-slate-600 dark:text-slate-300' : 'bg-white/80 dark:bg-black/80 backdrop-blur text-slate-600 dark:text-slate-300'}`}>
        <Printer className="w-5 h-5" />
      </Button>
      <Button onClick={resetData} variant="ghost" className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border border-white/60 dark:border-white/10 active:bg-red-50 dark:active:bg-red-500/10 transition-colors p-0 text-red-500 ${isMobile ? 'bg-white/80 dark:bg-black/80 backdrop-blur' : 'bg-white/80 dark:bg-black/80 backdrop-blur'}`}>
        <RefreshCw className="w-5 h-5" />
      </Button>
    </>
  );

  return (
    <div 
      className="h-screen w-screen overflow-hidden flex flex-col font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300 relative bg-background"
      style={theme === 'light' ? { background: 'radial-gradient(circle at top left, #e0f2fe 0%, #f1f5f9 50%, #dcfce7 100%)', backgroundColor: '#f1f5f9' } : {}}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 md:bottom-6 right-6 z-50 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 font-medium"
          >
            <CheckCircle2 className="w-5 h-5" />
            PDF Generated Successfully
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md z-20 shrink-0 print:hidden">
        <div className="flex items-center gap-3">
          <img src="https://i.postimg.cc/1XV2FJ1w/image.png" alt="BRIU Logo" className="h-8 w-auto" crossOrigin="anonymous"/>
          <h1 className="text-lg font-semibold tracking-tight text-blue-900 dark:text-blue-200">BRIU Cover Gen</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-white/60 dark:hover:bg-black/60 rounded-full transition-colors text-slate-600 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 sm:p-6 gap-4 md:gap-6 relative pb-28 md:pb-6">
        
        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden bg-white/50 dark:bg-black/50 p-1 rounded-2xl border border-white/60 dark:border-white/10 shrink-0 z-10 shadow-sm">
          <button 
            onClick={() => setMobileTab('form')}
            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${mobileTab === 'form' ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Edit Details
          </button>
          <button 
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${mobileTab === 'preview' ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Live Preview
          </button>
        </div>

        {/* Left Panel: Form */}
        <aside className={`w-full md:w-[400px] xl:w-[450px] flex-col gap-4 shrink-0 print:hidden overflow-hidden ${mobileTab === 'form' ? 'flex flex-1 md:flex-none' : 'hidden md:flex md:flex-none'}`}>
          <div className="flex-1 bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-5 shadow-xl overflow-hidden flex flex-col">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 shrink-0">Assignment Details</h2>
            <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
              <InputForm />
            </div>
          </div>
          
          <div className="hidden md:flex gap-3 shrink-0">
            {renderActionButtons(false)}
          </div>
        </aside>

        {/* Right Panel: Live Preview */}
        <section 
          className={`flex-1 bg-transparent relative overflow-y-auto overflow-x-hidden items-start justify-center p-0 md:p-2 sm:p-4 print:p-0 print:overflow-visible custom-scrollbar ${mobileTab === 'preview' ? 'flex' : 'hidden md:flex'}`}
          ref={previewContainerRef}
        >
          <div className="w-full flex justify-center origin-top h-max" style={{ height: `${1123 * scale}px` }}>
            <div className="shadow-2xl rounded-sm print:shadow-none bg-white transition-all duration-300 ease-out origin-top border border-black/5" style={{ transform: `scale(${scale})` }}>
              <CoverPageTemplate ref={printRef} data={data} />
            </div>
          </div>
        </section>

        {/* Mobile Fixed Actions */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 flex gap-3 shrink-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl p-3 rounded-3xl shadow-2xl border border-white/40 dark:border-white/10">
          {renderActionButtons(true)}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 px-6 flex items-center justify-between bg-white/20 dark:bg-black/20 backdrop-blur-sm border-t border-white/20 dark:border-white/10 shrink-0 print:hidden hidden md:flex">
        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">© {new Date().getFullYear()} Brahmaputra International University • Official Document System</p>
      </footer>

      {/* Hidden container for unscaled PDF generation */}
      <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none" aria-hidden="true">
        <CoverPageTemplate ref={pdfPrintRef} data={data} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
