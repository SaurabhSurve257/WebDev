// MutualFundsIndia API - 100% FREE, NO API KEY NEEDED
const API_BASE_URL = 'https://api.mfapi.in/mf';

// Fetch all mutual funds
async function getAllFunds() {
    try {
        const response = await fetch(API_BASE_URL);
        const funds = await response.json();
        console.log('Fetched funds:', funds);
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

// Handle search form submission
async function handleSearch(event) {
    event.preventDefault();
    const fundName = document.getElementById('fundName').value.toLowerCase().trim();
    const resultDiv = document.getElementById('fundResult');

    if (!fundName) {
        resultDiv.innerHTML = '<p class="error">Please enter a fund name</p>';
        return;
    }

    resultDiv.innerHTML = '<p class="loading">⏳ Loading mutual funds...</p>';

    try {
        const allFunds = await getAllFunds();
        
        // Check if allFunds is an array
        if (!Array.isArray(allFunds)) {
            resultDiv.innerHTML = '<p class="error">❌ API data format issue. Check console for details.</p>';
            console.log('Response type:', typeof allFunds, 'Content:', allFunds);
            return;
        }

        // Filter funds by name - using correct property name
        const filteredFunds = allFunds.filter(fund => {
            if (!fund || !fund.schemeName) return false;
            return fund.schemeName.toLowerCase().includes(fundName);
        });

        if (filteredFunds.length === 0) {
            resultDiv.innerHTML = `<p class="error">❌ No funds found for "${fundName}". Try "HDFC", "SBI", or "Axis"</p>`;
            return;
        }

        // Get NAV data for each filtered fund
        let html = `<h2>✅ Found ${filteredFunds.length} Mutual Fund(s)</h2>`;
        
        for (const fund of filteredFunds.slice(0, 10)) { // Show top 10 results
            const fundData = await getFundNAV(fund.schemeCode);
            
            if (fundData && fundData.data && fundData.data.length > 0) {
                const latestNAV = fundData.data[0];
                html += `
                    <div class="fund-card">
                        <h3>${fund.schemeName || 'N/A'}</h3>
                        <p><strong>Code:</strong> ${fund.schemeCode || 'N/A'}</p>
                        <p><strong>Type:</strong> ${fund.schemeType || 'N/A'}</p>
                        <p><strong>Category:</strong> ${fund.schemeCategory || 'N/A'}</p>
                        <p><strong>Latest NAV:</strong> <span style="color: #2a5298; font-weight: bold;">₹${latestNAV.nav || 'N/A'}</span></p>
                        <p><strong>NAV Date:</strong> ${latestNAV.date || 'N/A'}</p>
                    </div>
                `;
            }
        }

        resultDiv.innerHTML = html;
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">❌ Error: ${error.message}</p>`;
        console.error('Full error:', error);
    }
}