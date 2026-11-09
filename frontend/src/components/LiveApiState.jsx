import { AlertTriangle, Wifi } from 'lucide-react';

export default function LiveApiState({ title = 'Live API mode is ready', message = 'Connect the CampusLink backend to load live records. Demo records are intentionally not shown in this mode.' }) {
  return (
    <div className="live-api-state">
      <div className="live-api-icon"><Wifi size={21} /></div>
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
        <span><AlertTriangle size={13} /> No demonstration data has been substituted.</span>
      </div>
    </div>
  );
}
