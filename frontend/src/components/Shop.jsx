import React, { useEffect, useState } from 'react';
import './Shop.css';

const Shop = () => {
    const [items, setItems] = useState([]);
    const [gameActive, setGameActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [usedCodes, setUsedCodes] = useState(new Set());

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const db = window.firebaseApp.firestore();
                const shopDoc = await db.collection('FINB_shop').doc('game').get();
                if (shopDoc.exists) {
                    setGameActive(shopDoc.data().game !== false);
                }
                const itemsSnapshot = await db.collection('FINB_shop_items').get();
                const shopItems = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(shopItems);
            } catch (error) {
                console.error('Error fetching shop data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchShopData();
    }, []);

    const generateUniqueCode = (item) => {
        let code;
        let attempts = 0;
        const maxAttempts = 50;
        while (attempts < maxAttempts) {
            code = 'FINB' + Math.random().toString(36).substr(2, 12).toUpperCase();
            if (!usedCodes.has(code)) {
                return code;
            }
            attempts++;
        }
        throw new Error('Failed to generate unique code');
    };

    const handlePurchase = async (item) => {
        setPurchasing(true);
        try {
            const code = generateUniqueCode(item);
            const db = window.firebaseApp.firestore();
            await db.collection('FINB_shop_items').doc(item.id).collection('used_codes').doc(code).set({ usedAt: new Date(), redeemed: false });
            const newUsedCodes = new Set(usedCodes);
            newUsedCodes.add(code);
            setUsedCodes(newUsedCodes);
            setSuccessMsg(`Purchase successful! Your reward code: ${code}`);
            setTimeout(() => setSuccessMsg(null), 5000);
        } catch (error) {
            console.error('Purchase error:', error);
            alert('Purchase failed: ' + error.message);
        } finally {
            setPurchasing(false);
        }
    };

    if (loading) {
        return <div className="shop-loading">Loading shop items...</div>;
    }
    if (!gameActive) {
        return <div className="shop-disabled">The shop is currently closed.</div>;
    }

    return (
        <div className="shop-container">
            <h2>FINB Shop</h2>
            <div className="shop-grid">
                {items.filter(item => item.game !== false).map(item => (
                    <div key={item.id} className="shop-item">
                        <h3>{item.itemname || item.name}</h3>
                        <p className="price">${item.value || item.price}</p>
                        {item.description && <p className="desc">{item.description}</p>}
                        <button onClick={() => handlePurchase(item)} disabled={purchasing} className="buy-btn">
                            {purchasing ? 'Processing...' : 'Purchase'}
                        </button>
                    </div>
                ))}
            </div>
            {successMsg && <div className="success-alert">{successMsg}</div>}
        </div>
    );
};

export default Shop;