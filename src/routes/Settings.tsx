import { useRef, useState } from 'react';
import { Download, Upload, AlertTriangle } from 'lucide-react';
import { useStore } from '../store';

export default function Settings() {
  const userData = useStore((s) => s.userData);
  const importData = useStore((s) => s.importData);
  const resetAll = useStore((s) => s.resetAll);
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `higher-proof-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Invalid JSON shape');
      }
      if (!confirm('Replace all your current data with the imported file?')) return;
      importData(parsed);
      setStatus('Imported successfully.');
    } catch (err) {
      setStatus(`Import failed: ${err instanceof Error ? err.message : 'unknown error'}`);
    }
  };

  return (
    <div className="px-4 py-4 space-y-6">
      <h2 className="font-display text-2xl text-cream-50">Settings</h2>

      <section className="space-y-3">
        <h3 className="font-sans text-[10px] uppercase tracking-widest text-cream-600">
          Backup
        </h3>
        <p className="font-sans text-xs text-cream-400 leading-relaxed">
          All your data lives in this browser. Export regularly — especially before clearing site
          data or switching devices.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportJson}
            className="flex items-center gap-2 px-3 py-2 border border-amber/40 bg-amber/5 rounded-sm font-sans text-xs uppercase tracking-widest text-amber hover:bg-amber/10"
          >
            <Download size={14} /> Export JSON
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 border border-ink-600 rounded-sm font-sans text-xs uppercase tracking-widest text-cream-200 hover:border-ink-500"
          >
            <Upload size={14} /> Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImport(file);
              e.target.value = '';
            }}
          />
        </div>
        {status && <p className="font-sans text-xs text-cream-400 italic">{status}</p>}
      </section>

      <section className="space-y-3 pt-4 border-t border-ink-600">
        <h3 className="font-sans text-[10px] uppercase tracking-widest text-bitters">
          Danger zone
        </h3>
        <button
          onClick={() => {
            if (
              confirm(
                'This will erase all your ratings, visits, drinks, and notes. This cannot be undone. Continue?',
              )
            ) {
              resetAll();
              setStatus('All data cleared.');
            }
          }}
          className="flex items-center gap-2 px-3 py-2 border border-bitters/40 bg-bitters/5 rounded-sm font-sans text-xs uppercase tracking-widest text-bitters hover:bg-bitters/10"
        >
          <AlertTriangle size={14} /> Reset all data
        </button>
      </section>

      <section className="space-y-2 pt-4 border-t border-ink-600">
        <h3 className="font-sans text-[10px] uppercase tracking-widest text-cream-600">
          About
        </h3>
        <p className="font-sans text-xs text-cream-400 leading-relaxed">
          Higher Proof — a personal bar journal for tracking and rating bars on the World's 50 Best
          and North America's 50 Best lists. Built for the kind of person who remembers the
          clarified piña colada three months later.
        </p>
      </section>
    </div>
  );
}
