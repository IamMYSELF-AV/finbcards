import React, { useState, useEffect } from 'react';

const StockMarketDisclaimer = () => {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        localStorage.setItem('stockMarketDisclaimerAccepted', 'true');
        setAccepted(true);
    };

    useEffect(() => {
        const isAccepted = localStorage.getItem('stockMarketDisclaimerAccepted');
        if (isAccepted) {
            setAccepted(true);
        }
    }, []);

    if (accepted) return null;  // If accepted, do not show the modal

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Stock Market Disclaimer</h2>
                <p>Fair Play Notice: Please be informed that the stock market operates under specific regulations designed to ensure fair play.</p>
                <p>Price Volatility Warning: Prices can fluctuate significantly in short periods, and past performance is not indicative of future results.</p>
                <p>24-31 Day Reset Period Notice: Understand that there may be a reset period of 24 to 31 days for certain investment strategies.</p>
                <p>Loss Warning: Be aware that unsold stocks may incur losses, and it's essential to make informed decisions.</p>
                <button onClick={handleAccept}>I Accept</button>
            </div>
        </div>
    );
};

export default StockMarketDisclaimer;