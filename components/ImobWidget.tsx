import React, { useEffect, useRef, memo } from 'react';

export const ImobWidget: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpa o container antes de adicionar para evitar duplicatas
    containerRef.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": "BMFBOVESPA:IMOB",
      "width": "100%",
      "colorTheme": "dark",
      "isTransparent": false,
      "locale": "br"
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden shadow-lg border border-slate-600">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});