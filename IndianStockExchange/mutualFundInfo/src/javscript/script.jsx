import React, { useState } from 'react'
import './script.css';

// MutualFundsIndia API - 100% FREE, NO API KEY NEEDED
const API_BASE_URL = 'https://api.mfapi.in/mf';
const BATCH_SIZE = 20; // number of funds to load per batch

// Fetch all mutual funds
async function getAllFunds() {
        try {
                const response = await fetch(API_BASE_URL);
                const funds = await response.json();
                return funds;
        } catch (error) {
                console.error('Error fetching funds:', error);
                return [];
        }
}

// Get NAV data for specific fund
async function getFundNAV(fundCode) {
        try {
                const response = await fetch(`${API_BASE_URL}/${fundCode}`);
                const fundData = await response.json();
                return fundData;
        } catch (error) {
                console.error('Error fetching fund NAV:', error);
                return null;
        }
}

export default function Script() {
    const [query, setQuery] = useState('')
    const [filteredFunds, setFilteredFunds] = useState([])
    const [visibleCount, setVisibleCount] = useState(0)
    const [navMap, setNavMap] = useState({})
    const [loading, setLoading] = useState(false)
    const [statusMsg, setStatusMsg] = useState('')

    const fetchNAVsForSlice = async (fundsSlice) => {
        const promises = fundsSlice.map(async (fund) => {
            const data = await getFundNAV(fund.schemeCode)
            return { code: fund.schemeCode, data }
        })
        const results = await Promise.all(promises)
        setNavMap(prev => {
            const next = { ...prev }
            for (const r of results) next[r.code] = r.data
            return next
        })
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        const q = query.toLowerCase().trim()
        if (!q) {
            setStatusMsg('Please enter a fund name')
            return
        }

        setLoading(true)
        setStatusMsg('⏳ Loading mutual funds...')
        try {
            const allFunds = await getAllFunds()
            if (!Array.isArray(allFunds)) {
                setStatusMsg('❌ API data format issue. Check console for details.')
                console.log('Response type:', typeof allFunds, 'Content:', allFunds)
                setLoading(false)
                return
            }

            // substring match on schemeName (case-insensitive)
            const matched = allFunds.filter(f => f && f.schemeName && f.schemeName.toLowerCase().includes(q))
            setFilteredFunds(matched)
            setVisibleCount(Math.min(BATCH_SIZE, matched.length))
            setNavMap({})
            setStatusMsg(`✅ Found ${matched.length} Mutual Fund(s)`)

            // fetch NAVs for initial batch only
            const initialSlice = matched.slice(0, Math.min(BATCH_SIZE, matched.length))
            await fetchNAVsForSlice(initialSlice)
        } catch (err) {
            setStatusMsg(`❌ Error: ${err.message}`)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const loadMore = async () => {
        const nextCount = Math.min(filteredFunds.length, visibleCount + BATCH_SIZE)
        const newSlice = filteredFunds.slice(visibleCount, nextCount)
        setVisibleCount(nextCount)
        if (newSlice.length > 0) await fetchNAVsForSlice(newSlice)
    }

    return (
        <>
            <form className='search-form' onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search mutual funds..."
                    required
                />
                <button type="submit" className='search-btn'>Search</button>
            </form>
            <p className="api-info"></p>

            <div id="fundResult" className='results-section'>
                {statusMsg && <h2>{statusMsg}</h2>}
                {loading && <p className="loading">⏳ Loading...</p>}

                {filteredFunds.slice(0, visibleCount).map(fund => {
                    const fundData = navMap[fund.schemeCode]
                    const latest = fundData && fundData.data && fundData.data.length > 0 ? fundData.data[0] : null

                    return (
                        <div className="fund-card" key={fund.schemeCode}>
                            <h3>{fund.schemeName || 'N/A'}</h3>
                            <p><strong>Code:</strong> {fund.schemeCode || 'N/A'}</p>
                            <p><strong>Type:</strong> {fund.schemeType || 'N/A'}</p>
                            <p><strong>Category:</strong> {fund.schemeCategory || 'N/A'}</p>
                            <p><strong>Latest NAV:</strong> <span style={{color: '#2a5298', fontWeight: 'bold'}}>
                                {latest ? `₹${latest.nav || 'N/A'}` : (fundData ? 'N/A' : 'Loading...')}
                            </span></p>
                            <p><strong>NAV Date:</strong> {latest ? latest.date : ''}</p>
                        </div>
                    )
                })}

                {visibleCount < filteredFunds.length && (
                    <div style={{textAlign: 'center', marginTop: 12}}>
                        <button className='load-more-btn' onClick={loadMore}>Load more</button>
                    </div>
                )}
            </div>
        </>
    )
}