async function getJobDetails() {
    const jobTitle = document.getElementById('jobTitle').value;
    const location = document.getElementById('location').value;
    
    if (!jobTitle.trim() || !location.trim()) {
        alert('Please enter both job title and location');
        return;
    }

    const url = `https://jsearch.p.rapidapi.com/search?query=${jobTitle}%20jobs%20in%20${location}&page=1&num_pages=1&country=IN&date_posted=all`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '964ab9bfbemshf7c3a95fc2524cep1f15dbjsnbed1d3d53735',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const res = document.getElementById('jobResults');
        res.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Searching for amazing opportunities...</p>
            </div>
        `;

        const response = await fetch(url, options);
        const result = await response.json();
        const jobdata = result.data;

        if (!jobdata || jobdata.length === 0) {
            res.innerHTML = `
                <div class="empty-state">
                    <p>😢 No jobs found for "<strong>${jobTitle}</strong>" in <strong>${location}</strong></p>
                    <p style="margin-top: 10px; font-size: 0.9em;">Try different search terms or check your spelling</p>
                </div>
            `;
            return;
        }

        let resultString = "";
        jobdata.forEach((job, index) => {
            const jobDate = new Date(job.job_posted_at_datetime_utc).toLocaleDateString();
            resultString += `
                <div class="job-card" style="animation-delay: ${index * 0.1}s;">
                    <h3>${job.job_title}</h3>
                    <p><strong>🏢 Company:</strong> ${job.employer_name}</p>
                    <p><strong>📍 Location:</strong> ${job.job_city}, ${job.job_country}</p>
                    <p><strong>📅 Posted:</strong> ${jobDate}</p>
                    <p><strong>📝 Description:</strong> ${job.job_description.substring(0, 300)}...</p>
                    <a href="${job.job_apply_link}" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Apply Now</span>
                    </a>
                </div>
            `;
        });

        res.innerHTML = resultString;
        console.log(result);
    } catch (error) {
        document.getElementById('jobResults').innerHTML = `
            <div class="empty-state">
                <p>⚠️ Error fetching jobs. Please try again.</p>
            </div>
        `;
        console.error(error);
    }
}
