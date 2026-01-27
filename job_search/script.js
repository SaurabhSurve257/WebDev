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
        res.innerHTML = '<p style="text-align: center; color: white;">Loading jobs...</p>';

        const response = await fetch(url, options);
        const result = await response.json();
        const jobdata = result.data;

        if (!jobdata || jobdata.length === 0) {
            res.innerHTML = '<p style="text-align: center; color: white; padding: 40px;">No jobs found. Try different search terms.</p>';
            return;
        }

        let resultString = "";
        jobdata.forEach((job) => {
            const jobDate = new Date(job.job_posted_at_datetime_utc).toLocaleDateString();
            resultString += `
                <div class="job-card">
                    <h3>${job.job_title}</h3>
                    <p><strong>Company:</strong> ${job.employer_name}</p>
                    <p><strong>Location:</strong> ${job.job_city}, ${job.job_country}</p>
                    <p><strong>Posted:</strong> ${jobDate}</p>
                    <p><strong>Description:</strong> ${job.job_description.substring(0, 300)}...</p>
                    <a href="${job.job_apply_link}" target="_blank">Apply Now</a>
                </div>
            `;
        });

        res.innerHTML = resultString;
        console.log(result);
    } catch (error) {
        document.getElementById('jobResults').innerHTML = '<p style="text-align: center; color: white;">Error fetching jobs. Please try again.</p>';
        console.error(error);
    }
}
